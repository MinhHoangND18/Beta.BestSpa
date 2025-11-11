'use client';

import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Language } from '@mui/icons-material';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [aboutHovered, setAboutHovered] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangAnchor(null);
  };

  const getCurrentLanguageFlag = () => {
    switch (i18n.language) {
      case 'en':
        return '🇺🇸';
      case 'ja':
        return '🇯🇵';
      case 'ko':
        return '🇰🇷';
      default:
        return '🇺🇸';
    }
  };

  return (
    <Box>
      <IconButton
        onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
          setLangAnchor(e.currentTarget);
          setAboutHovered(true);
        }}
        onMouseLeave={() => {
          setAboutHovered(false);
        }}
        sx={{
          color: '#9b165d',
          fontWeight: 500,
          borderBottom: aboutHovered
            ? '2px solid #9b165d'
            : '2px solid transparent',
          borderRadius: 0,
          textTransform: 'none',
          fontFamily: "'Open Sans', sans-serif",
          fontSize: '14px',
          letterSpacing: '0.05em',
          paddingBottom: '5px',
          '&:hover': {
            color: '#9b165d',
            backgroundColor: 'transparent',
          },
          transition: 'color 0.15s, border-bottom 0.15s',
        }}
      >
        <Language />
        <Typography sx={{ ml: 0.5, fontSize: '14px' }}>
          {getCurrentLanguageFlag()}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={langAnchor}
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
        MenuListProps={{
          onMouseLeave: () => setLangAnchor(null),
        }}
        sx={{ mt: 1 }}
      >
        <MenuItem
          onClick={() => changeLanguage('en')}
          sx={{
            color: i18n.language === 'en' ? '#9b165d' : 'inherit',
            fontWeight: i18n.language === 'en' ? 600 : 400,
          }}
        >
          🇺🇸 English
        </MenuItem>
        <MenuItem
          onClick={() => changeLanguage('ja')}
          sx={{
            color: i18n.language === 'ja' ? '#9b165d' : 'inherit',
            fontWeight: i18n.language === 'ja' ? 600 : 400,
          }}
        >
          🇯🇵 日本語
        </MenuItem>
        <MenuItem
          onClick={() => changeLanguage('ko')}
          sx={{
            color: i18n.language === 'ko' ? '#9b165d' : 'inherit',
            fontWeight: i18n.language === 'ko' ? 600 : 400,
          }}
        >
          🇰🇷 한국어
        </MenuItem>
      </Menu>
    </Box>
  );
}