import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  CampaignDefinition,
  CampaignId,
  CampaignSaveState,
  CampaignSummary,
  Snapshot
} from '../types';

// Campaign registry with status definitions
export const CAMPAIGN_REGISTRY = {
  fallOfAvalon: {
    id: 'fallOfAvalon',
    name: 'Fall of Avalon',
    version: '1.0',
    description: 'The first campaign in the Tainted Grail series, following the quest for the Holy Grail in medieval England',
    status: 'implemented',
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
      characters: [
        {
          id: 'character-1',
          name: 'Character 1',
          location: '',
          dial: 0,
          health: 10,
          energy: 10,
          terror: 0,
          experience: 0,
          reputation: 0,
          magic: 0,
          food: 0,
          wealth: 0,
          attributes: {
            aggression: 0,
            caution: 0,
            courage: 0,
            empathy: 0,
            practicality: 0,
            spirituality: 0
          }
        },
        {
          id: 'character-2',
          name: 'Character 2',
          location: '',
          dial: 0,
          health: 10,
          energy: 10,
          terror: 0,
          experience: 0,
          reputation: 0,
          magic: 0,
          food: 0,
          wealth: 0,
          attributes: {
            aggression: 0,
            caution: 0,
            courage: 0,
            empathy: 0,
            practicality: 0,
            spirituality: 0
          }
        },
        {
          id: 'character-3',
          name: 'Character 3',
          location: '',
          dial: 0,
          health: 10,
          energy: 10,
          terror: 0,
          experience: 0,
          reputation: 0,
          magic: 0,
          food: 0,
          wealth: 0,
          attributes: {
            aggression: 0,
            caution: 0,
            courage: 0,
            empathy: 0,
            practicality: 0,
            spirituality: 0
          }
        },
        {
          id: 'character-4',
          name: 'Character 4',
          location: '',
          dial: 0,
          health: 10,
          energy: 10,
          terror: 0,
          experience: 0,
          reputation: 0,
          magic: 0,
          food: 0,
          wealth: 0,
          attributes: {
            aggression: 0,
            caution: 0,
            courage: 0,
            empathy: 0,
            practicality: 0,
            spirituality: 0
          }
        }
      ],
      statuses: {
        // All 88 statuses with their step configurations
        'Allies of Avalon': { steps: 5, completed: [], caption: '' },
        'Black Cauldron': { steps: 3, completed: [], caption: '' },
        'Burning Mystery': { steps: 8, completed: [], caption: '' },
        'Call from Beyond': { steps: 1, completed: [], caption: '' },
        'Charred Knowledge': { steps: 1, completed: [], caption: '' },
        'Cherished Belongings': { steps: 1, completed: [], caption: '' },
        'Cold Pyre': { steps: 1, completed: [], caption: '' },
        'Cosuil': { steps: 5, completed: [], caption: '' },
        'Deal Breaker': { steps: 1, completed: [], caption: '' },
        'Deep Secret': { steps: 1, completed: [], caption: '' },
        'Diplomat': { steps: 3, completed: [], caption: '' },
        'Diplomatic Mission': { steps: 6, completed: [], caption: '' },
        'Disturbing Information': { steps: 3, completed: [], caption: '' },
        'Dreams and Prophecies': { steps: 8, completed: [], caption: '' },
        'Enemies of Avalon': { steps: 3, completed: [], caption: '' },
        'Escalation': { steps: 3, completed: [], caption: '' },
        "Fael's Legacy": { steps: 1, completed: [], caption: '' },
        'Fall of Chivalry': { steps: 8, completed: [], caption: 'When you have any six parts of this status, go to BoS, Verse 525' },
        'Farpoint Clues': { steps: 5, completed: [], caption: '' },
        'Fate of the Expedition': { steps: 9, completed: [], caption: 'When you have parts 1-8 of this status, go to BoS, Verse 405' },
        'Final Confrontations': { steps: 7, completed: [], caption: '' },
        'Final Lesson': { steps: 5, completed: [], caption: '' },
        'Fortunate Meetings': { steps: 5, completed: [], caption: '' },
        "Gerraint's Successor": { steps: 3, completed: [], caption: '' },
        'Glen Ritual': { steps: 2, completed: [], caption: '' },
        'Guest of Honor': { steps: 1, completed: [], caption: '' },
        'Halfway Intrigue': { steps: 3, completed: [], caption: '' },
        'Helping Hand': { steps: 6, completed: [], caption: '' },
        'Helping the Knights': { steps: 1, completed: [], caption: '' },
        'Hidden Treasures': { steps: 8, completed: [], caption: '' },
        "Hunter's Mark": { steps: 1, completed: [], caption: '' },
        "Lady's Task": { steps: 1, completed: [], caption: '' },
        'Last Haven': { steps: 5, completed: [], caption: '' },
        'Left Behind': { steps: 9, completed: [], caption: '' },
        'Lost and Fallen': { steps: 7, completed: [], caption: '' },
        "Maggot's Redemption": { steps: 1, completed: [], caption: '' },
        'Matricide': { steps: 1, completed: [], caption: '' },
        'Monastery Discovered': { steps: 1, completed: [], caption: '' },
        'Moonring Mission': { steps: 1, completed: [], caption: '' },
        "Morgaine's Task": { steps: 1, completed: [], caption: '' },
        'Mourning Song': { steps: 2, completed: [], caption: '' },
        'Mystery Solved': { steps: 1, completed: [], caption: '' },
        'Pathfinder': { steps: 8, completed: [], caption: '' },
        'Peace in Borough': { steps: 1, completed: [], caption: '' },
        "People's Champion": { steps: 1, completed: [], caption: '' },
        'Pillager': { steps: 5, completed: [], caption: '' },
        'Reclamation': { steps: 1, completed: [], caption: '' },
        'Remedy': { steps: 4, completed: [], caption: '' },
        'Remnants': { steps: 5, completed: [], caption: '' },
        'Restoring the Order': { steps: 8, completed: [], caption: 'When you have any six parts of this status, go to BoS, Verse 512' },
        'End of the Road': { steps: 1, completed: [], caption: '' },
        'Riddle of the Oldsteel': { steps: 1, completed: [], caption: '' },
        'Saved by the Goddess': { steps: 1, completed: [], caption: '' },
        'Scrounger': { steps: 1, completed: [], caption: '' },
        'Secrets of the Forest': { steps: 4, completed: [], caption: '' },
        'Shelter in the Storm': { steps: 1, completed: [], caption: '' },
        'Shrine Secure': { steps: 1, completed: [], caption: '' },
        'Something is Watching': { steps: 1, completed: [], caption: 'When you have all four parts of this status, resolve Special Event C' },
        "Stonemason's Secret": { steps: 1, completed: [], caption: '' },
        'Strange Encounters': { steps: 8, completed: [], caption: '' },
        'Supplying the Revolt': { steps: 1, completed: [], caption: '' },
        'Tangleroot Knowledge': { steps: 2, completed: [], caption: '' },
        'Traveling Menhir': { steps: 2, completed: [], caption: '' },
        'Tuathan Exploration': { steps: 5, completed: [], caption: '' },
        'Underfern': { steps: 5, completed: [], caption: '' },
        'War for Avalon': { steps: 4, completed: [], caption: '' },
        'Winds of Wyrdness': { steps: 1, completed: [], caption: '' }
      },
      removedLocations: Array.from({ length: 16 }, () => ({ box1: '', box2: '' }))
    }
  },
  // Placeholder campaigns
  lastKnight: {
    id: 'lastKnight',
    name: 'Last Knight',
    version: '0.1',
    description: 'A standalone campaign focusing on the final orders of the Round Table',
    status: 'placeholder',
    defaultState: {}
  },
  ageOfLegends: {
    id: 'ageOfLegends',
    name: 'Age of Legends',
    version: '0.1',
    description: 'An epic saga spanning the entire history of the Grail world',
    status: 'placeholder',
    defaultState: {}
  },
  redDeath: {
    id: 'redDeath',
    name: 'Red Death',
    version: '0.1',
    description: 'A dark campaign set during the height of the Plague',
    status: 'placeholder',
    defaultState: {}
  },
  kingsOfRuin: {
    id: 'kingsOfRuin',
    name: 'Kings of Ruin',
    version: '0.1',
    description: 'Post-apocalyptic adventures in a world shattered by war',
    status: 'placeholder',
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
      name: campaign.name,
      version: campaign.version,
      description: campaign.description,
      status: campaign.status
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