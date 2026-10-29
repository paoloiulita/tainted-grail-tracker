import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Backdrop open={true} sx={{ zIndex: 9999, color: '#fff' }}>
      <div className="loading-content">
        <CircularProgress color="inherit" size={60} thickness={4} />
        <Typography variant="h6" className="mt-4">
          {message}
        </Typography>
      </div>
    </Backdrop>
  );
};

export default LoadingSpinner;