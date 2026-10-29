import React from 'react';
import { Button, Badge } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';

const SnapshotManagerButton = ({ onClick, snapshotCount }) => {
  return (
    <div className="snapshot-manager-button">
      <Button
        onClick={onClick}
        className="btn btn-secondary"
        startIcon={<HistoryIcon />}
      >
        <Badge badgeContent={snapshotCount} color="primary" sx={{ ml: 1 }}>
          {snapshotCount > 0 && <SaveIcon sx={{ fontSize: 16, mr: 1 }} />}
        </Badge>
        <span>Save History</span>
      </Button>
    </div>
  );
};

export default SnapshotManagerButton;