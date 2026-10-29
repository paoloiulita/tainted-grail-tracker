import { useState } from 'react';
import { IconButton, Menu, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import SnapshotManagerButton from './SnapshotManagerButton';
import type { CampaignId, CampaignSummary, Language, Snapshot } from '../types';

interface HeaderProps {
  currentCampaign: CampaignId;
  language: Language;
  onLanguageChange: (language: Language) => void;
  campaigns: CampaignSummary[];
  snapshots: Partial<Record<CampaignId, Snapshot[]>>;
  onToggleSnapshotManager: () => void;
}

const Header = ({
  currentCampaign,
  language,
  onLanguageChange,
  campaigns,
  snapshots,
  onToggleSnapshotManager
}: HeaderProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<HTMLElement | null>(null);

  const closeMobileMenu = () => setMobileMenuAnchor(null);

  const handleLanguageChange = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage);
    setLanguageMenuOpen(false);
    closeMobileMenu();
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-section" aria-label="Tainted Grail Save Sheet Tracker home">
          <img
            className="app-logo"
            src={`${import.meta.env.BASE_URL}assets/tainted-grail-logo-large.webp`}
            alt="Tainted Grail"
          />
          <span className="app-subtitle">Save sheet tracker</span>
        </Link>

        {isMobile ? (
          <div className="mobile-menu-trigger">
            <IconButton
              aria-label="Open menu"
              aria-controls={mobileMenuAnchor ? 'mobile-navigation-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(mobileMenuAnchor)}
              onClick={(event) => setMobileMenuAnchor(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-navigation-menu"
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={closeMobileMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <div className="mobile-menu-actions">
                <LanguageSelector
                  language={language}
                  onChange={handleLanguageChange}
                  open={languageMenuOpen}
                  onOpenChange={setLanguageMenuOpen}
                />
                <SnapshotManagerButton
                  onClick={() => {
                    onToggleSnapshotManager();
                    closeMobileMenu();
                  }}
                  snapshotCount={(snapshots[currentCampaign] || []).length}
                />
              </div>
            </Menu>
          </div>
        ) : (
          <div className="header-right">
            <LanguageSelector
              language={language}
              onChange={handleLanguageChange}
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
        )}
      </div>
    </header>
  );
};

export default Header;