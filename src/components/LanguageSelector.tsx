import { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import type { Language } from '../types';

interface LanguageSelectorProps {
  language: Language;
  onChange: (language: Language) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LanguageSelector = ({ language, onChange, open, onOpenChange }: LanguageSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'it' as const, name: 'Italian', flag: '🇮🇹' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="language-selector">
      <Button
        onClick={(event) => {
          if (open) {
            setAnchorEl(null);
            onOpenChange(false);
          } else {
            setAnchorEl(event.currentTarget);
            onOpenChange(true);
          }
        }}
        className="btn btn-secondary"
        startIcon={<LanguageIcon />}
      >
        <span className="mr-2">{currentLanguage?.flag}</span>
        <Typography variant="body2" className="hidden md:inline">
          {currentLanguage?.name}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={() => {
          setAnchorEl(null);
          onOpenChange(false);
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => {
              onChange(lang.code);
              setAnchorEl(null);
            }}
            selected={lang.code === language}
          >
            <ListItemIcon>{lang.flag}</ListItemIcon>
            <Typography variant="body2">{lang.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;