import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSelector = ({ language, onChange, open, onOpenChange }) => {
  const { t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="language-selector">
      <Button
        onClick={() => onOpenChange(!open)}
        className="btn btn-secondary"
        startIcon={<LanguageIcon />}
      >
        <span className="mr-2">{currentLanguage?.flag}</span>
        <Typography variant="body2" className="hidden md:inline">
          {currentLanguage?.name}
        </Typography>
      </Button>

      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={() => onOpenChange(false)}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => onChange(lang.code)}
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