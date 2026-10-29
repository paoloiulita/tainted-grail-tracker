import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CampaignSelector from './components/CampaignSelector';
import Header from './components/Header';
import FallOfAvalonCampaign from './campaigns/fallOfAvalon/FallOfAvalonCampaign';
import { useAppState } from './hooks/useAppState';
import SnapshotManager from './components/SnapshotManager';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    campaigns,
    currentCampaign,
    setCurrentCampaign,
    snapshots,
    addSnapshot,
    restoreSnapshot,
    deleteSnapshot
  } = useAppState();

  const [isLoading, setIsLoading] = useState(false);
  const [showSnapshotManager, setShowSnapshotManager] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  // Campaign selection handler
  const handleCampaignSelect = useCallback((campaignId) => {
    setIsLoading(true);
    setCurrentCampaign(campaignId);
    navigate(`/campaign/${campaignId}`);
    setTimeout(() => setIsLoading(false), 300);
  }, [setCurrentCampaign, navigate]);

  // Language change handler
  const handleLanguageChange = useCallback((lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('preferred-language', lang);
    setLanguageMenuOpen(false);
  }, [i18n]);

  // Get current campaign component
  const getCurrentCampaignComponent = useCallback(() => {
    const campaign = campaigns.find(c => c.id === currentCampaign);
    if (!campaign) return null;

    switch (campaign.id) {
      case 'fallOfAvalon':
        return <FallOfAvalonCampaign />;
      default:
        // Return placeholder for unimplemented campaigns
        return (
          <div className="campaign-placeholder">
            <h2>{campaign.name}</h2>
            <p>{t('campaigns.placeholder') || 'This campaign is under development.'}</p>
            <p>{t('campaigns.comingSoon') || 'Coming soon!'}</p>
          </div>
        );
    }
  }, [currentCampaign, campaigns, t]);

  return (
    <ErrorBoundary>
      <div className="app-container">
        <Header
          currentCampaign={currentCampaign}
          onCampaignSelect={handleCampaignSelect}
          language={i18n.language}
          onLanguageChange={handleLanguageChange}
          languageMenuOpen={languageMenuOpen}
          setLanguageMenuOpen={setLanguageMenuOpen}
          campaigns={campaigns}
          snapshots={snapshots}
          onToggleSnapshotManager={() => setShowSnapshotManager(!showSnapshotManager)}
        />

        {isLoading && <LoadingSpinner />}

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <CampaignSelector
                  campaigns={campaigns}
                  onSelect={handleCampaignSelect}
                />
              }
            />
            <Route
              path="/campaign/:campaignId"
              element={getCurrentCampaignComponent()}
            />
          </Routes>
        </main>

        {showSnapshotManager && (
          <SnapshotManager
            snapshots={snapshots[currentCampaign] || []}
            onSave={addSnapshot}
            onRestore={restoreSnapshot}
            onDelete={deleteSnapshot}
            onClose={() => setShowSnapshotManager(false)}
            campaignId={currentCampaign}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;