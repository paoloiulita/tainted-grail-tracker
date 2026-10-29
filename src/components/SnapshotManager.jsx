import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Box, Typography, List, ListItem, ListItemText, IconButton, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

const SnapshotManager = ({ snapshots, onSave, onRestore, onDelete, onClose, campaignId }) => {
  const { t } = useTranslation();
  const [newSnapshotName, setNewSnapshotName] = useState('');
  const [filteredSnapshots, setFilteredSnapshots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = snapshots.filter(snapshot =>
      snapshot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(new Date(snapshot.timestamp), 'yyyy-MM-dd').includes(searchTerm)
    );
    setFilteredSnapshots(filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, [snapshots, searchTerm]);

  const handleSave = () => {
    const name = newSnapshotName.trim() || `Save ${format(new Date(), 'yyyy-MM-dd HH:mm')}`;
    onSave(name);
    setNewSnapshotName('');
  };

  const handleRestore = (snapshot) => {
    if (window.confirm(t('snapshots.confirmRestore', 'Are you sure you want to restore this save? This will overwrite the current game state.'))) {
      onRestore(snapshot);
    }
  };

  const handleDelete = (snapshot) => {
    if (window.confirm(t('snapshots.confirmDelete', 'Are you sure you want to delete this save? This action cannot be undone.'))) {
      onDelete(snapshot.id);
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
                        secondaryAction={
                          <Box className="snapshot-actions">
                            <IconButton
                              edge="end"
                              onClick={() => handleRestore(snapshot)}
                              color="primary"
                              size="small"
                            >
                              <RestoreIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              onClick={() => handleDelete(snapshot)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={
                            <Box className="snapshot-info">
                              <Typography variant="subtitle2" className="snapshot-name">
                                {snapshot.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {format(new Date(snapshot.timestamp), 'MMM dd, yyyy HH:mm')}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              Campaign: {campaignId}
                            </Typography>
                          }
                        />
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