import { Button, Badge } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
import { useTranslation } from 'react-i18next';

interface SnapshotManagerButtonProps {
  onClick: () => void;
  snapshotCount: number;
}

const SnapshotManagerButton = ({ onClick, snapshotCount }: SnapshotManagerButtonProps) => {
  const { t } = useTranslation();
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
        <span>{t('snapshots.title', 'Save History')}</span>
      </Button>
    </div>
  );
};

export default SnapshotManagerButton;