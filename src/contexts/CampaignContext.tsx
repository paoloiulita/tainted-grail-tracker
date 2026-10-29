import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { CampaignIdentity, CampaignInfo } from '../types';

interface CampaignContextValue {
  campaign: CampaignInfo;
  setCampaign: (campaign: CampaignIdentity) => void;
  updateCampaignData: (data: Partial<CampaignInfo>) => void;
  resetCampaign: () => void;
}

type CampaignAction =
  | { type: 'SET_CAMPAIGN'; payload: CampaignIdentity }
  | { type: 'UPDATE_CAMPAIGN_DATA'; payload: Partial<CampaignInfo> }
  | { type: 'RESET_CAMPAIGN' };

const CampaignContext = createContext<CampaignContextValue | undefined>(undefined);

const initialCampaignState: CampaignInfo = {
  id: '',
  name: '',
  chapter: 1,
  day: 1
};

function campaignReducer(state: CampaignInfo, action: CampaignAction): CampaignInfo {
  switch (action.type) {
    case 'SET_CAMPAIGN':
      return {
        ...state,
        ...action.payload
      };
    case 'UPDATE_CAMPAIGN_DATA':
      return {
        ...state,
        ...action.payload
      };
    case 'RESET_CAMPAIGN':
      return initialCampaignState;
    default:
      return state;
  }
}

interface CampaignProviderProps {
  children: ReactNode;
  initialCampaign?: CampaignInfo;
}

export function CampaignProvider({ children, initialCampaign = initialCampaignState }: CampaignProviderProps) {
  const [campaignState, dispatch] = useReducer(campaignReducer, initialCampaign);

  const setCampaign = useCallback((campaign: CampaignIdentity) => {
    dispatch({ type: 'SET_CAMPAIGN', payload: campaign });
  }, []);

  const updateCampaignData = useCallback((data: Partial<CampaignInfo>) => {
    dispatch({ type: 'UPDATE_CAMPAIGN_DATA', payload: data });
  }, []);

  const resetCampaign = useCallback(() => {
    dispatch({ type: 'RESET_CAMPAIGN' });
  }, []);

  const value = {
    campaign: campaignState,
    setCampaign,
    updateCampaignData,
    resetCampaign
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}