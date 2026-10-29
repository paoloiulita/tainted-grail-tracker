import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import CampaignSelector from './CampaignSelector';
import SnapshotManagerButton from './SnapshotManagerButton';

const Header = ({
  currentCampaign,
  onCampaignSelect,
  language,
  onLanguageChange,
  languageMenuOpen,
  setLanguageMenuOpen,
  campaigns,
  snapshots,
  onToggleSnapshotManager
}) => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="app-title">Tainted Grail</h1>
          <span className="app-subtitle">Save Sheet Tracker</span>
        </div>

        <div className="header-middle">
          {campaigns.length > 0 && (
            <CampaignSelector
              campaigns={campaigns}
              selectedCampaign={currentCampaign}
              onSelect={onCampaignSelect}
              compact={true}
            />
          )}
        </div>

        <div className="header-right">
          <LanguageSelector
            language={language}
            onChange={onLanguageChange}
            open={languageMenuOpen}
            onOpenChange={setLanguageMenuOpen}
          />

          <SnapshotManagerButton
            onClick={onToggleSnapshotManager}
            snapshotCount={(snapshots[currentCampaign] || []).length}
          />

          <div className="current-campaign-info">
            <span className="campaign-label">Campaign:</span>
            <span className="campaign-name">
              {campaigns.find(c => c.id === currentCampaign)?.name || t('common.selectCampaign')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;