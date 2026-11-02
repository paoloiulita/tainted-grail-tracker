import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import en from '../locales/en.json';
import CampaignSelector from '../components/CampaignSelector';
import { CampaignProvider } from '../contexts/CampaignContext';
import { CAMPAIGN_REGISTRY } from '../hooks/useAppState';
import CampaignTracker from './CampaignTracker';

const createTestI18n = async () => {
  const i18n = createInstance();
  await i18n.init({
    resources: { en: { translation: en } },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
  return i18n;
};

const getCampaignSummaries = () => Object.values(CAMPAIGN_REGISTRY).map(({ id, name }) => ({ id, name }));

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('campaign tracker', () => {
  it('keeps Fall of Avalon Menhir dials and omits the Enemy Army section', async () => {
    const i18n = await createTestI18n();
    render(
      <I18nextProvider i18n={i18n}>
        <CampaignProvider>
          <CampaignTracker campaignId="fallOfAvalon" />
        </CampaignProvider>
      </I18nextProvider>
    );

    const menhirsCard = screen.getByRole('heading', { name: 'Menhirs' }).closest('.MuiCard-root');
    expect(menhirsCard).not.toBeNull();
    expect(within(menhirsCard as HTMLElement).getAllByLabelText('Dial Value')).toHaveLength(3);
    expect(screen.queryByRole('heading', { name: 'Enemy Army' })).toBeNull();
  }, 20000);

  it('renders free-text Menhir and Enemy Army fields and persists campaign data separately', async () => {
    const i18n = await createTestI18n();
    render(
      <I18nextProvider i18n={i18n}>
        <CampaignProvider>
          <CampaignTracker campaignId="ageOfLegends" />
        </CampaignProvider>
      </I18nextProvider>
    );

    const menhirsCard = screen.getByRole('heading', { name: 'Menhirs' }).closest('.MuiCard-root');
    expect(menhirsCard).not.toBeNull();
    const menhirs = within(menhirsCard as HTMLElement);
    expect(menhirs.getAllByLabelText('Location')).toHaveLength(3);
    expect(menhirs.getAllByLabelText('Markers')).toHaveLength(3);
    expect(menhirs.queryByLabelText('Dial Value')).not.toBeInTheDocument();

    const armyCard = screen.getByRole('heading', { name: 'Enemy Army' }).closest('.MuiCard-root');
    expect(armyCard).not.toBeNull();
    const army = within(armyCard as HTMLElement);
    expect(army.getByLabelText('Location')).toBeInTheDocument();
    expect(army.getByLabelText('Units')).toBeInTheDocument();

    const markersInput = menhirs.getAllByLabelText('Markers')[0];
    fireEvent.change(markersInput, { target: { value: 'North marker' } });
    await waitFor(() => {
      const savedState = JSON.parse(localStorage.getItem('campaign-state-ageOfLegends') || 'null');
      expect(savedState.menhirs[0]).toEqual({ location: '', markers: 'North marker' });
    });

    expect(localStorage.getItem('campaign-state-fallOfAvalon')).toBeNull();
  });

  it('renders the PDF status table and its only caption', async () => {
    const i18n = await createTestI18n();
    render(
      <I18nextProvider i18n={i18n}>
        <CampaignProvider>
          <CampaignTracker campaignId="ageOfLegends" />
        </CampaignProvider>
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Statuses' }));
    expect(screen.getAllByRole('row')).toHaveLength(60);
    expect(screen.getAllByRole('button', { name: 'Status information' })).toHaveLength(1);
    expect(screen.getByText('Odds and Ends')).toBeInTheDocument();
  }, 20000);

  it('renders the Last Knight PDF statuses and its single caption', async () => {
    const i18n = await createTestI18n();
    render(
      <I18nextProvider i18n={i18n}>
        <CampaignProvider>
          <CampaignTracker campaignId="lastKnight" />
        </CampaignProvider>
      </I18nextProvider>
    );

    expect(screen.getAllByLabelText(/^Removed location from/)).toHaveLength(20);
    fireEvent.click(screen.getByRole('tab', { name: 'Statuses' }));
    expect(screen.getAllByRole('row')).toHaveLength(42);
    expect(screen.getAllByRole('button', { name: 'Status information' })).toHaveLength(1);
    expect(screen.getByText('Dismay')).toBeInTheDocument();
  }, 20000);

  it('makes implemented campaigns selectable while leaving other unfinished campaigns unavailable', async () => {
    const i18n = await createTestI18n();
    const onSelect = vi.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <CampaignSelector campaigns={getCampaignSummaries()} onSelect={onSelect} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Age of Legends' }));
    expect(onSelect).toHaveBeenCalledWith('ageOfLegends');
    fireEvent.click(screen.getByRole('button', { name: 'Last Knight' }));
    expect(onSelect).toHaveBeenLastCalledWith('lastKnight');
    expect(screen.getByRole('button', { name: 'Red Death' })).toBeDisabled();
  });
});
