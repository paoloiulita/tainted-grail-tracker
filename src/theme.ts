import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c6a45a',
      light: '#e4cb8a',
      dark: '#8e7134',
      contrastText: '#171a1d'
    },
    secondary: {
      main: '#78a7a0',
      light: '#a4c8c0',
      dark: '#4c7771'
    },
    error: {
      main: '#df7770'
    },
    success: {
      main: '#8dbb91'
    },
    background: {
      default: '#111820',
      paper: '#1b242d'
    },
    text: {
      primary: '#f2eee5',
      secondary: '#bac2c8',
      disabled: '#858e95'
    },
    divider: 'rgba(221, 207, 176, 0.16)'
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    button: { fontWeight: 600, textTransform: 'none' }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#111820'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1b242d',
          border: '1px solid rgba(221, 207, 176, 0.14)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 16,
          minHeight: 40
        },
        containedPrimary: {
          boxShadow: '0 4px 14px rgba(198, 164, 90, 0.18)'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(8, 13, 18, 0.42)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(221, 207, 176, 0.2)'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(198, 164, 90, 0.65)'
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          fontWeight: 600
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(221, 207, 176, 0.12)'
        },
        head: {
          color: '#e4cb8a',
          fontWeight: 700
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600
        }
      }
    }
  }
});

export default theme;
