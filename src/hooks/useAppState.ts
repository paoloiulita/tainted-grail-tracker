import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  CampaignDefinition,
  CampaignId,
  CampaignSaveState,
  CampaignSummary,
  Snapshot
} from '../types';
import {
  createInitialStatusProgress,
  FALL_OF_AVALON_REMOVED_LOCATION_COUNT
} from '../campaigns/fallOfAvalon/statusDefinitions';

// Central campaign metadata and default save states
export const CAMPAIGN_REGISTRY = {
  fallOfAvalon: {
    id: 'fallOfAvalon',
    name: 'Fall of Avalon',
    defaultState: {
      campaign: {
        id: 'fallOfAvalon',
        name: 'Fall of Avalon',
        chapter: 1,
        day: 1
      },
      menhirs: [
        { location: '', dialValue: 0 },
        { location: '', dialValue: 0 },
        { location: '', dialValue: 0 }
      ],
      questDials: [
        { location: '', dialValue: 0 },
        { location: '', dialValue: 0 }
      ],
      guardians: [
        { location: '' },
        { location: '' }
      ],
      characterNotes: '',
      characters: [],
      statuses: createInitialStatusProgress(),
      removedLocations: Array.from({ length: FALL_OF_AVALON_REMOVED_LOCATION_COUNT }, () => ({ box1: '', box2: '' }))
    }
  },
  // Placeholder campaigns
  lastKnight: {
    id: 'lastKnight',
    name: 'Last Knight',
    defaultState: {}
  },
  ageOfLegends: {
    id: 'ageOfLegends',
    name: 'Age of Legends',
    defaultState: {}
  },
  redDeath: {
    id: 'redDeath',
    name: 'Red Death',
    defaultState: {}
  },
  kingsOfRuin: {
    id: 'kingsOfRuin',
    name: 'Kings of Ruin',
    defaultState: {}
  }
} satisfies Record<CampaignId, CampaignDefinition>;

export const useAppState = () => {
  const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);
  const [currentCampaign, setCurrentCampaign] = useState<CampaignId>('fallOfAvalon');
  const [snapshots, setSnapshots] = useState<Partial<Record<CampaignId, Snapshot[]>>>({});

  // Initialize campaigns from registry
  useEffect(() => {
    const campaignList = Object.values(CAMPAIGN_REGISTRY).map(campaign => ({
      id: campaign.id,
      name: campaign.name
    }));
    setCampaigns(campaignList);

    // Load saved snapshots for each campaign
    const initialSnapshots: Partial<Record<CampaignId, Snapshot[]>> = {};
    campaignList.forEach(campaign => {
      const savedSnapshots = localStorage.getItem(`snapshots-${campaign.id}`);
      if (savedSnapshots) {
        initialSnapshots[campaign.id] = JSON.parse(savedSnapshots) as Snapshot[];
      } else {
        initialSnapshots[campaign.id] = [];
      }
    });
    setSnapshots(initialSnapshots);
  }, []);

  // Save snapshots to localStorage when they change
  useEffect(() => {
    Object.entries(snapshots).forEach(([campaignId, campaignSnapshots]) => {
      if (campaignSnapshots) {
        localStorage.setItem(`snapshots-${campaignId}`, JSON.stringify(campaignSnapshots));
      }
    });
  }, [snapshots]);

  // Get current campaign state
  const getCampaignState = useCallback((campaignId: CampaignId): CampaignSaveState | null => {
    const campaign = CAMPAIGN_REGISTRY[campaignId];
    if (!campaign) return null;

    const savedState = localStorage.getItem(`campaign-state-${campaignId}`);
    return savedState ? JSON.parse(savedState) as CampaignSaveState : campaign.defaultState;
  }, []);

  // Save current campaign state
  const updateCampaignState = useCallback((campaignId: CampaignId, state: CampaignSaveState) => {
    localStorage.setItem(`campaign-state-${campaignId}`, JSON.stringify(state));
  }, []);

  // Add a new snapshot
  const addSnapshot = useCallback((name: string) => {
    const campaignState = getCampaignState(currentCampaign);
    if (!campaignState) return;

    const snapshot = {
      id: uuidv4(),
      name,
      timestamp: new Date().toISOString(),
      state: campaignState,
      campaignId: currentCampaign
    };

    setSnapshots(prev => ({
      ...prev,
      [currentCampaign]: [snapshot, ...(prev[currentCampaign] || [])].slice(0, 50) // Keep last 50 saves
    }));
  }, [currentCampaign, getCampaignState]);

  // Restore a snapshot
  const restoreSnapshot = useCallback((snapshot: Snapshot) => {
    const campaign = CAMPAIGN_REGISTRY[snapshot.campaignId];
    if (!campaign) return;

    updateCampaignState(snapshot.campaignId, snapshot.state);

    // Also update the snapshots list
    setSnapshots(prev => ({
      ...prev,
      [snapshot.campaignId]: (prev[snapshot.campaignId] || []).map(s =>
        s.id === snapshot.id ? { ...s, restored: true } : s
      )
    }));
  }, [updateCampaignState]);

  // Delete a snapshot
  const deleteSnapshot = useCallback((snapshotId: string) => {
    setSnapshots(prev => ({
      ...prev,
      [currentCampaign]: (prev[currentCampaign] || []).filter(s => s.id !== snapshotId)
    }));
  }, [currentCampaign]);

  return {
    campaigns,
    currentCampaign,
    setCurrentCampaign,
    snapshots,
    addSnapshot,
    restoreSnapshot,
    deleteSnapshot,
    updateCampaignState,
    getCampaignState,
    CAMPAIGN_REGISTRY
  };
};