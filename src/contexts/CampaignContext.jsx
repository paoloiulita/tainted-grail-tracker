import { createContext, useContext, useReducer, useCallback } from 'react';

const CampaignContext = createContext();

const initialCampaignState = {
  id: '',
  name: '',
  chapter: 1,
  day: 1
};

function campaignReducer(state, action) {
  switch (action.type) {
    case 'SET_CAMPAIGN':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name
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

export function CampaignProvider({ children, initialCampaign = initialCampaignState }) {
  const [campaignState, dispatch] = useReducer(campaignReducer, initialCampaign);

  const setCampaign = useCallback((campaign) => {
    dispatch({ type: 'SET_CAMPAIGN', payload: campaign });
  }, []);

  const updateCampaignData = useCallback((data) => {
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