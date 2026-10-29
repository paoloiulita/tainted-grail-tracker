import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CampaignProvider, useCampaign } from './CampaignContext';

describe('CampaignContext', () => {
  it('updates campaign details and campaign data', () => {
    const { result } = renderHook(() => useCampaign(), {
      wrapper: ({ children }) => <CampaignProvider>{children}</CampaignProvider>
    });

    act(() => {
      result.current.setCampaign({ id: 'fallOfAvalon', name: 'Fall of Avalon' });
      result.current.updateCampaignData({ chapter: 2, day: 5 });
    });

    expect(result.current.campaign).toEqual({
      id: 'fallOfAvalon',
      name: 'Fall of Avalon',
      chapter: 2,
      day: 5
    });
  });

  it('resets campaign data to the initial state', () => {
    const { result } = renderHook(() => useCampaign(), {
      wrapper: ({ children }) => <CampaignProvider>{children}</CampaignProvider>
    });

    act(() => {
      result.current.updateCampaignData({ chapter: 4, day: 12 });
      result.current.resetCampaign();
    });

    expect(result.current.campaign).toEqual({
      id: '',
      name: '',
      chapter: 1,
      day: 1
    });
  });
});
