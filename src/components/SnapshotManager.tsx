import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Modal, Box, Typography, List, ListItem, ListItemText, IconButton, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { format } from 'date-fns';
import type { Snapshot } from '../types';
import {
  BackupStorageError,
  BackupValidationError,
  parseLocalStorageBackup,
  readLocalStorageBackup,
  replaceLocalStorage
} from '../localStorageBackup';

interface SnapshotManagerProps {
  snapshots: Snapshot[];
  onSave: (name: string) => void;
  onRestore: (snapshot: Snapshot) => void;
  onDelete: (snapshotId: string) => void;
  onClose: () => void;
  campaignId: string;
}

const SnapshotManager = ({ snapshots, onSave, onRestore, onDelete, onClose, campaignId }: SnapshotManagerProps) => {
  const { t } = useTranslation();
  const [newSnapshotName, setNewSnapshotName] = useState('');
  const [filteredSnapshots, setFilteredSnapshots] = useState<Snapshot[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [backupError, setBackupError] = useState<string | null>(null);
  const backupFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = snapshots.filter(snapshot =>
      snapshot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(new Date(snapshot.timestamp), 'yyyy-MM-dd').includes(searchTerm)
    );
    setFilteredSnapshots(filtered.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  }, [snapshots, searchTerm]);

  const handleSave = () => {
    const name = newSnapshotName.trim() || `Save ${format(new Date(), 'yyyy-MM-dd HH:mm')}`;
    onSave(name);
    setNewSnapshotName('');
  };

  const handleRestore = (snapshot: Snapshot) => {
    if (window.confirm(t('snapshots.confirmRestore', 'Are you sure you want to restore this save? This will overwrite the current game state.'))) {
      onRestore(snapshot);
    }
  };

  const handleDelete = (snapshot: Snapshot) => {
    if (window.confirm(t('snapshots.confirmDelete', 'Are you sure you want to delete this save? This action cannot be undone.'))) {
      onDelete(snapshot.id);
    }
  };

  const handleDownloadBackup = () => {
    setBackupError(null);
    try {
      const backup = readLocalStorageBackup(window.localStorage);
      const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: 'application/json;charset=utf-8'
      });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `tainted-grail-backup-${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
    } catch {
      setBackupError(t('snapshots.backupExportFailed', 'Could not create the backup file.'));
    }
  };

  const handleImportBackup = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setBackupError(null);
    try {
      let backupContent: string;
      try {
        backupContent = await file.text();
      } catch {
        setBackupError(t('snapshots.backupReadFailed', 'Could not read the selected file.'));
        return;
      }

      let backup;
      try {
        backup = parseLocalStorageBackup(backupContent);
      } catch (error) {
        const message = error instanceof BackupValidationError
          ? error.code === 'invalidJson'
            ? t('snapshots.backupInvalidJson', 'The selected file is not valid JSON. Nothing was changed.')
            : t('snapshots.backupInvalidFormat', 'The backup must be a JSON object containing only string values. Nothing was changed.')
          : t('snapshots.backupReadFailed', 'Could not read the selected file.');
        setBackupError(message);
        return;
      }

      if (!window.confirm(t(
        'snapshots.confirmImport',
        'Importing this backup replaces all localStorage data for this site in this browser. Current saves and progress may be overwritten or removed. This cannot be undone. Continue?'
      ))) {
        return;
      }

      try {
        replaceLocalStorage(window.localStorage, backup);
      } catch (error) {
        const message = error instanceof BackupStorageError
          ? error.code === 'rollbackFailed'
            ? t('snapshots.backupRollbackFailed', 'The import failed and the previous data could not be fully restored. Reload the page and check your data before continuing.')
            : error.code === 'replaceFailed'
              ? t('snapshots.backupReplaceFailed', 'The import failed. Your previous data was restored, and nothing was changed.')
              : t('snapshots.backupStorageReadFailed', 'Could not access the current browser storage. Nothing was changed.')
          : t('snapshots.backupReplaceFailed', 'The import failed. Your previous data was restored, and nothing was changed.');
        setBackupError(message);
        return;
      }

      window.location.reload();
    } finally {
      input.value = '';
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box className="snapshot-modal">
        <Card>
          <CardContent>
            <Box className="modal-header">
              <Typography variant="h5" component="h2">
                {t('snapshots.title', 'Save History')}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box className="modal-content">
              <Box className="save-section">
                <Typography variant="h6" className="mb-2">
                  {t('snapshots.createNew', 'Create New Save')}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      value={newSnapshotName}
                      onChange={(e) => setNewSnapshotName(e.target.value)}
                      placeholder={t('snapshots.namePlaceholder', 'Enter save name...')}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleSave}
                      fullWidth
                      className="btn btn-primary"
                    >
                      {t('snapshots.save', 'Save')}
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Box className="search-section">
                <TextField
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('snapshots.searchPlaceholder', 'Search saves...')}
                  size="small"
                  className="mt-4"
                />
              </Box>

              <Box className="backup-section">
                <Typography variant="h6" className="mb-2">
                  {t('snapshots.backupTitle', 'Offline Backup')}
                </Typography>
                <Alert severity="warning" className="backup-warning">
                  {t(
                    'snapshots.backupWarning',
                    'Importing a backup replaces all localStorage data for this site in this browser. Current saves and progress may be overwritten or removed.'
                  )}
                </Alert>
                {backupError && (
                  <Alert severity="error" role="alert" className="backup-error">
                    {backupError}
                  </Alert>
                )}
                <Box className="backup-actions">
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadBackup}
                  >
                    {t('snapshots.downloadBackup', 'Download JSON backup')}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    onClick={() => backupFileInput.current?.click()}
                  >
                    {t('snapshots.importBackup', 'Import JSON backup')}
                  </Button>
                  <input
                    ref={backupFileInput}
                    className="backup-file-input"
                    type="file"
                    accept=".json,application/json"
                    aria-label={t('snapshots.importBackup', 'Import JSON backup')}
                    onChange={handleImportBackup}
                  />
                </Box>
              </Box>

              <Box className="snapshots-list">
                <Typography variant="h6" className="mb-2">
                  {t('snapshots.list', 'Save Files')} ({filteredSnapshots.length})
                </Typography>
                {filteredSnapshots.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" className="empty-state">
                    {t('snapshots.empty', 'No save files found.')}
                  </Typography>
                ) : (
                  <List>
                    {filteredSnapshots.map((snapshot) => (
                      <ListItem
                        key={snapshot.id}
                        className="snapshot-item"
                      >
                        <ListItemText
                          primary={
                            <Box className="snapshot-info">
                              <Typography variant="subtitle2" className="snapshot-name">
                                {snapshot.name}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {t('header.campaign', 'Campaign')}: {t(`campaigns.${campaignId}.name`, campaignId)}
                            </Typography>
                          }
                        />
                        <Box className="snapshot-actions">
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            className="snapshot-timestamp"
                          >
                            {format(new Date(snapshot.timestamp), 'dd MMM yyyy HH:mm')}
                          </Typography>
                          <Box className="snapshot-action-buttons">
                            <IconButton
                              onClick={() => handleRestore(snapshot)}
                              color="primary"
                              size="small"
                            >
                              <RestoreIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(snapshot)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default SnapshotManager;