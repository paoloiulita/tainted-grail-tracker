import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Card, CardContent, Typography, TextField, Button, Box, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Slider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppState } from '../../hooks/useAppState';
import { useCampaign } from '../../contexts/CampaignContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const FallOfAvalonCampaign = () => {
  const { t } = useTranslation();
  const { getCampaignState, updateCampaignState } = useAppState();
  const { setCampaign } = useCampaign();
  const [state, setState] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [editPlayerDialog, setEditPlayerDialog] = useState({ open: false, player: null });

  // Load campaign state
  useEffect(() => {
    const loadState = () => {
      const savedState = getCampaignState('fallOfAvalon');
      if (savedState) {
        setState(savedState);
      } else {
        // Initialize with default state
        const defaultState = {
          campaign: {
            id: 'fallOfAvalon',
            name: 'Fall of Avalon',
            chapter: 1,
            day: 1
          },
          menhirs: [
            { location: '', dialValue: 0 },
            { location: '', dialValue: 0 },
            { location: '', dialValue: 0 }
          ],
          questDials: [
            { location: '', dialValue: 0 },
            { location: '', dialValue: 0 }
          ],
          guardians: [
            { location: '' },
            { location: '' }
          ],
          playerNotes: '',
          players: [
            {
              id: 'player-1',
              name: 'Player 1',
              location: '',
              dial: 0,
              health: 100,
              energy: 100,
              terror: 0,
              experience: 0,
              reputation: 0,
              magic: 0,
              food: 0,
              wealth: 0,
              attributes: {
                aggression: 0,
                caution: 0,
                courage: 0,
                empathy: 0,
                practicality: 0,
                spirituality: 0
              }
            },
            {
              id: 'player-2',
              name: 'Player 2',
              location: '',
              dial: 0,
              health: 100,
              energy: 100,
              terror: 0,
              experience: 0,
              reputation: 0,
              magic: 0,
              food: 0,
              wealth: 0,
              attributes: {
                aggression: 0,
                caution: 0,
                courage: 0,
                empathy: 0,
                practicality: 0,
                spirituality: 0
              }
            },
            {
              id: 'player-3',
              name: 'Player 3',
              location: '',
              dial: 0,
              health: 100,
              energy: 100,
              terror: 0,
              experience: 0,
              reputation: 0,
              magic: 0,
              food: 0,
              wealth: 0,
              attributes: {
                aggression: 0,
                caution: 0,
                courage: 0,
                empathy: 0,
                practicality: 0,
                spirituality: 0
              }
            },
            {
              id: 'player-4',
              name: 'Player 4',
              location: '',
              dial: 0,
              health: 100,
              energy: 100,
              terror: 0,
              experience: 0,
              reputation: 0,
              magic: 0,
              food: 0,
              wealth: 0,
              attributes: {
                aggression: 0,
                caution: 0,
                courage: 0,
                empathy: 0,
                practicality: 0,
                spirituality: 0
              }
            }
          ],
          statuses: {
            // All 88 statuses with their step configurations
            'Allies of Avalon': { steps: 5, completed: [], caption: '' },
            'Black Cauldron': { steps: 3, completed: [], caption: '' },
            'Burning Mystery': { steps: 8, completed: [], caption: '' },
            'Call from Beyond': { steps: 1, completed: [], caption: '' },
            'Charred Knowledge': { steps: 1, completed: [], caption: '' },
            'Cherished Belongings': { steps: 1, completed: [], caption: '' },
            'Cold Pyre': { steps: 1, completed: [], caption: '' },
            'Cosuil': { steps: 5, completed: [], caption: '' },
            'Deal Breaker': { steps: 1, completed: [], caption: '' },
            'Deep Secret': { steps: 1, completed: [], caption: '' },
            'Diplomat': { steps: 3, completed: [], caption: '' },
            'Diplomatic Mission': { steps: 6, completed: [], caption: '' },
            'Disturbing Information': { steps: 3, completed: [], caption: '' },
            'Dreams and Prophecies': { steps: 8, completed: [], caption: '' },
            'Enemies of Avalon': { steps: 3, completed: [], caption: '' },
            'Escalation': { steps: 3, completed: [], caption: '' },
            "Fael's Legacy": { steps: 1, completed: [], caption: '' },
            'Fall of Chivalry': { steps: 8, completed: [], caption: 'When you have any six parts of this status, go to BoS, Verse 525' },
            'Farpoint Clues': { steps: 5, completed: [], caption: '' },
            'Fate of the Expedition': { steps: 9, completed: [], caption: 'When you have parts 1-8 of this status, go to BoS, Verse 405' },
            'Final Confrontations': { steps: 7, completed: [], caption: '' },
            'Final Lesson': { steps: 5, completed: [], caption: '' },
            'Fortunate Meetings': { steps: 5, completed: [], caption: '' },
            "Gerraint's Successor": { steps: 3, completed: [], caption: '' },
            'Glen Ritual': { steps: 2, completed: [], caption: '' },
            'Guest of Honor': { steps: 1, completed: [], caption: '' },
            'Halfway Intrigue': { steps: 3, completed: [], caption: '' },
            'Helping Hand': { steps: 6, completed: [], caption: '' },
            'Helping the Knights': { steps: 1, completed: [], caption: '' },
            'Hidden Treasures': { steps: 8, completed: [], caption: '' },
            "Hunter's Mark": { steps: 1, completed: [], caption: '' },
            "Lady's Task": { steps: 1, completed: [], caption: '' },
            'Last Haven': { steps: 5, completed: [], caption: '' },
            'Left Behind': { steps: 9, completed: [], caption: '' },
            'Lost and Fallen': { steps: 7, completed: [], caption: '' },
            "Maggot's Redemption": { steps: 1, completed: [], caption: '' },
            'Matricide': { steps: 1, completed: [], caption: '' },
            'Monastery Discovered': { steps: 1, completed: [], caption: '' },
            'Moonring Mission': { steps: 1, completed: [], caption: '' },
            "Morgaine's Task": { steps: 1, completed: [], caption: '' },
            'Mourning Song': { steps: 2, completed: [], caption: '' },
            'Mystery Solved': { steps: 1, completed: [], caption: '' },
            'Pathfinder': { steps: 8, completed: [], caption: '' },
            'Peace in Borough': { steps: 1, completed: [], caption: '' },
            "People's Champion": { steps: 1, completed: [], caption: '' },
            'Pillager': { steps: 5, completed: [], caption: '' },
            'Reclamation': { steps: 1, completed: [], caption: '' },
            'Remedy': { steps: 4, completed: [], caption: '' },
            'Remnants': { steps: 5, completed: [], caption: '' },
            'Restoring the Order': { steps: 8, completed: [], caption: 'When you have any six parts of this status, go to BoS, Verse 512' },
            'End of the Road': { steps: 1, completed: [], caption: '' },
            'Riddle of the Oldsteel': { steps: 1, completed: [], caption: '' },
            'Saved by the Goddess': { steps: 1, completed: [], caption: '' },
            'Scrounger': { steps: 1, completed: [], caption: '' },
            'Secrets of the Forest': { steps: 4, completed: [], caption: '' },
            'Shelter in the Storm': { steps: 1, completed: [], caption: '' },
            'Shrine Secure': { steps: 1, completed: [], caption: '' },
            'Something is Watching': { steps: 1, completed: [], caption: 'When you have all four parts of this status, resolve Special Event C' },
            "Stonemason's Secret": { steps: 1, completed: [], caption: '' },
            'Strange Encounters': { steps: 8, completed: [], caption: '' },
            'Supplying the Revolt': { steps: 1, completed: [], caption: '' },
            'Tangleroot Knowledge': { steps: 2, completed: [], caption: '' },
            'Traveling Menhir': { steps: 2, completed: [], caption: '' },
            'Tuathan Exploration': { steps: 5, completed: [], caption: '' },
            'Underfern': { steps: 5, completed: [], caption: '' },
            'War for Avalon': { steps: 4, completed: [], caption: '' },
            'Winds of Wyrdness': { steps: 1, completed: [], caption: '' }
          },
          removedLocations: [
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' },
            { box1: '', box2: '' }
          ]
        };
        setState(defaultState);
        updateCampaignState('fallOfAvalon', defaultState);
      }
    };

    loadState();
  }, [getCampaignState, updateCampaignState]);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (state) {
      updateCampaignState('fallOfAvalon', state);
    }
  }, [state, updateCampaignState]);

  // Update campaign info when component mounts
  useEffect(() => {
    setCampaign({
      id: 'fallOfAvalon',
      name: 'Fall of Avalon',
      chapter: state?.campaign?.chapter || 1,
      day: state?.campaign?.day || 1
    });
  }, [state, setCampaign]);

  // Update chapter and day
  const updateCampaignInfo = (field, value) => {
    setState(prev => ({
      ...prev,
      campaign: {
        ...prev.campaign,
        [field]: value
      }
    }));
  };

    // Menhir handlers
    const updateMenhir = (index, field, value) => {
      setState(prev => ({
        ...prev,
        menhirs: prev.menhirs.map((menhir, i) =>
          i === index ? { ...menhir, [field]: value } : menhir
        )
      }));
    };

    // Quest dial handlers
    const updateQuestDial = (index, field, value) => {
      setState(prev => ({
        ...prev,
        questDials: prev.questDials.map((dial, i) =>
          i === index ? { ...dial, [field]: value } : dial
        )
      }));
    };

    // Guardian handlers
    const updateGuardian = (index, field, value) => {
      setState(prev => ({
        ...prev,
        guardians: prev.guardians.map((guardian, i) =>
          i === index ? { ...guardian, [field]: value } : guardian
        )
      }));
    };

    // Player handlers
    const updatePlayer = (playerId, field, value) => {
      setState(prev => ({
        ...prev,
        players: prev.players.map(player =>
          player.id === playerId ? { ...player, [field]: value } : player
        )
      }));
    };

    const updatePlayerAttribute = (playerId, attribute, value) => {
      setState(prev => ({
        ...prev,
        players: prev.players.map(player =>
          player.id === playerId
            ? {
                ...player,
                attributes: {
                  ...player.attributes,
                  [attribute]: value
                }
              }
            : player
        )
      }));
    };

    const toggleStatusStep = (statusName, stepIndex) => {
      setState(prev => ({
        ...prev,
        statuses: {
          ...prev.statuses,
          [statusName]: {
            ...prev.statuses[statusName],
            completed: prev.statuses[statusName].completed.includes(stepIndex)
              ? prev.statuses[statusName].completed.filter(i => i !== stepIndex)
              : [...prev.statuses[statusName].completed, stepIndex]
          }
        }
      }));
    };

    const updateRemovedLocation = (index, field, value) => {
      setState(prev => ({
        ...prev,
        removedLocations: prev.removedLocations.map((location, i) =>
          i === index ? { ...location, [field]: value } : location
        )
      }));
    };

    const addPlayer = () => {
      const newPlayer = {
        id: `player-${Date.now()}`,
        name: `Player ${state.players.length + 1}`,
        location: '',
        dial: 0,
        health: 100,
        energy: 100,
        terror: 0,
        experience: 0,
        reputation: 0,
        magic: 0,
        food: 0,
        wealth: 0,
        attributes: {
          aggression: 0,
          caution: 0,
          courage: 0,
          empathy: 0,
          practicality: 0,
          spirituality: 0
        }
      };
      setState(prev => ({
        ...prev,
        players: [...prev.players, newPlayer]
      }));
    };

    const deletePlayer = (playerId) => {
      setState(prev => ({
        ...prev,
        players: prev.players.filter(player => player.id !== playerId)
      }));
    };

    const renderTabContent = () => {
      switch (activeTab) {
        case 0:
          return renderTrackerTab();
        case 1:
          return renderMenhirsTab();
        case 2:
          return renderQuestDialsTab();
        case 3:
          return renderGuardiansTab();
        case 4:
          return renderPlayersTab();
        case 5:
          return renderStatusesTab();
        case 6:
          return renderRemovedLocationsTab();
        case 7:
          return renderPlayerNotesTab();
        default:
          return null;
      }
    };

    const renderTrackerTab = () => (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-header">
                {t('fallOfAvalon.tracker.campaign', 'Campaign')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={t('fallOfAvalon.tracker.chapter', 'Chapter')}
                    type="number"
                    value={state.campaign.chapter}
                    onChange={(e) => updateCampaignInfo('chapter', parseInt(e.target.value) || 1)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={t('fallOfAvalon.tracker.day', 'Day')}
                    type="number"
                    value={state.campaign.day}
                    onChange={(e) => updateCampaignInfo('day', parseInt(e.target.value) || 1)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-header">
                {t('fallOfAvalon.menhirs.title', 'Menhirs')}
              </Typography>
              {state.menhirs.map((menhir, index) => (
                <Grid container spacing={2} key={index} className="mb-2">
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.menhirs.0', `Menhir ${index + 1}`)}
                      value={menhir.location}
                      onChange={(e) => updateMenhir(index, 'location', e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.menhirs.dialValue', 'Dial Value')}
                      type="number"
                      value={menhir.dialValue}
                      onChange={(e) => updateMenhir(index, 'dialValue', parseInt(e.target.value) || 0)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Slider
                      value={menhir.dialValue}
                      onChange={(e, value) => updateMenhir(index, 'dialValue', value)}
                      min={0}
                      max={10}
                      size="small"
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-header">
                {t('fallOfAvalon.questDials.title', 'Quest Dials')}
              </Typography>
              {state.questDials.map((dial, index) => (
                <Grid container spacing={2} key={index} className="mb-2">
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.questDials.0', `Quest Dial ${index + 1}`)}
                      value={dial.location}
                      onChange={(e) => updateQuestDial(index, 'location', e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.questDials.dialValue', 'Dial Value')}
                      type="number"
                      value={dial.dialValue}
                      onChange={(e) => updateQuestDial(index, 'dialValue', parseInt(e.target.value) || 0)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Slider
                      value={dial.dialValue}
                      onChange={(e, value) => updateQuestDial(index, 'dialValue', value)}
                      min={0}
                      max={10}
                      size="small"
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="card-header">
                {t('fallOfAvalon.guardians.title', 'Guardians')}
              </Typography>
              {state.guardians.map((guardian, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={t('fallOfAvalon.guardians.0', `Guardian ${index + 1}`)}
                  value={guardian.location}
                  onChange={(e) => updateGuardian(index, 'location', e.target.value)}
                  className="mb-2"
                  size="small"
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );

    const renderMenhirsTab = () => (
      <Card className="card">
        <CardContent>
          <Typography variant="h6" className="card-header">
            {t('fallOfAvalon.menhirs.title', 'Menhirs')}
          </Typography>
          <Grid container spacing={2}>
            {state.menhirs.map((menhir, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card variant="outlined" className="menhir-card">
                  <CardContent>
                    <Typography variant="subtitle1" className="text-gold mb-2">
                      {t('fallOfAvalon.menhirs.0', `Menhir ${index + 1}`)}
                    </Typography>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.menhirs.location', 'Location')}
                      value={menhir.location}
                      onChange={(e) => updateMenhir(index, 'location', e.target.value)}
                      size="small"
                      className="mb-2"
                    />
                    <Box>
                      <Typography variant="body2" className="mb-1">
                        {t('fallOfAvalon.menhirs.dialValue', 'Dial Value')}: {menhir.dialValue}
                      </Typography>
                      <Slider
                        value={menhir.dialValue}
                        onChange={(e, value) => updateMenhir(index, 'dialValue', value)}
                        min={0}
                        max={10}
                        marks
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );

    const renderQuestDialsTab = () => (
      <Card className="card">
        <CardContent>
          <Typography variant="h6" className="card-header">
            {t('fallOfAvalon.questDials.title', 'Quest Dials')}
          </Typography>
          <Grid container spacing={2}>
            {state.questDials.map((dial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" className="text-gold mb-2">
                      {t('fallOfAvalon.questDials.0', `Quest Dial ${index + 1}`)}
                    </Typography>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.questDials.location', 'Location')}
                      value={dial.location}
                      onChange={(e) => updateQuestDial(index, 'location', e.target.value)}
                      size="small"
                      className="mb-2"
                    />
                    <Box>
                      <Typography variant="body2" className="mb-1">
                        {t('fallOfAvalon.questDials.dialValue', 'Dial Value')}: {dial.dialValue}
                      </Typography>
                      <Slider
                        value={dial.dialValue}
                        onChange={(e, value) => updateQuestDial(index, 'dialValue', value)}
                        min={0}
                        max={10}
                        marks
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );

    const renderGuardiansTab = () => (
      <Card className="card">
        <CardContent>
          <Typography variant="h6" className="card-header">
            {t('fallOfAvalon.guardians.title', 'Guardians')}
          </Typography>
          <Grid container spacing={2}>
            {state.guardians.map((guardian, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" className="text-gold mb-2">
                      {t('fallOfAvalon.guardians.0', `Guardian ${index + 1}`)}
                    </Typography>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.guardians.location', 'Location')}
                      value={guardian.location}
                      onChange={(e) => updateGuardian(index, 'location', e.target.value)}
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );

    const renderPlayersTab = () => (
      <Box>
        <Box className="mb-4">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addPlayer}
            className="btn btn-primary"
          >
            {t('fallOfAvalon.players.addPlayer', 'Add Player')}
          </Button>
        </Box>

        <Grid container spacing={3}>
          {state.players.map((player) => (
            <Grid item xs={12} md={6} lg={4} key={player.id}>
              <Card className="card player-card">
                <CardContent>
                  <Box className="player-card-header">
                    <Typography variant="h6" className="text-gold">
                      {player.name}
                    </Typography>
                    <Box className="player-actions">
                      <IconButton
                        size="small"
                        onClick={() => setEditPlayerDialog({ open: true, player })}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deletePlayer(player.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <TextField
                    fullWidth
                    label={t('fallOfAvalon.playerNotes.title', 'Name')}
                    value={player.name}
                    onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                    size="small"
                    className="mb-2"
                  />

                  <TextField
                    fullWidth
                    label={t('fallOfAvalon.playerNotes.title', 'Location')}
                    value={player.location}
                    onChange={(e) => updatePlayer(player.id, 'location', e.target.value)}
                    size="small"
                    className="mb-2"
                  />

                  <TextField
                    fullWidth
                    label="Dial"
                    type="number"
                    value={player.dial}
                    onChange={(e) => updatePlayer(player.id, 'dial', parseInt(e.target.value) || 0)}
                    size="small"
                    className="mb-2"
                  />

                  <Grid container spacing={1} className="mb-2">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Health"
                        type="number"
                        value={player.health}
                        onChange={(e) => updatePlayer(player.id, 'health', parseInt(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Energy"
                        type="number"
                        value={player.energy}
                        onChange={(e) => updatePlayer(player.id, 'energy', parseInt(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} className="mb-2">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Terror"
                        type="number"
                        value={player.terror}
                        onChange={(e) => updatePlayer(player.id, 'terror', parseInt(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Experience"
                        type="number"
                        value={player.experience}
                        onChange={(e) => updatePlayer(player.id, 'experience', parseInt(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} className="mb-2">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Reputation"
                        type="number"
                        value={player.reputation}
                        onChange={(e) => updatePlayer(player.id, 'reputation', parseInt(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Magic"
                        type="number"
                        value={player.magic}
                        onChange={(e) => updatePlayer(player.id, 'magic', parseInt(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} className="mb-2">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Food"
                        type="number"
                        value={player.food}
                        onChange={(e) => updatePlayer(player.id, 'food', parseInt(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Wealth"
                        type="number"
                        value={player.wealth}
                        onChange={(e) => updatePlayer(player.id, 'wealth', parseInt(e.target.value) || 0)}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle2" className="mt-3 mb-2">
                    {t('fallOfAvalon.attributes.title', 'Attributes')}
                  </Typography>
                  {Object.entries(player.attributes).map(([attr, value]) => (
                    <Box key={attr} className="attribute-row">
                      <Grid container alignItems="center" spacing={1} className="mb-1">
                        <Grid item xs={4}>
                          <Typography variant="body2">
                            {t(`fallOfAvalon.attributes.${attr}`, attr.charAt(0).toUpperCase() + attr.slice(1))}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Slider
                            value={value}
                            onChange={(e, val) => updatePlayerAttribute(player.id, attr, val)}
                            min={0}
                            max={10}
                            size="small"
                            marks
                            valueLabelDisplay="auto"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );

    const renderStatusesTab = () => {
      // Get all status names sorted alphabetically
      const statusNames = Object.keys(state.statuses).sort();

      return (
        <Card className="card">
          <CardContent>
            <Typography variant="h6" className="card-header">
              {t('fallOfAvalon.statuses.title', 'Statuses and Steps')}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Steps</TableCell>
                    <TableCell>Caption</TableCell>
                    <TableCell align="center">Completed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statusNames.map((statusName) => {
                    const status = state.statuses[statusName];
                    return (
                      <TableRow key={statusName} className="status-row">
                        <TableCell>
                          <Typography variant="subtitle2" className="font-semibold">
                            {statusName}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {status.steps}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {status.caption && (
                            <Typography variant="body2" color="text.secondary">
                              {status.caption}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Box className="steps-container">
                            {Array.from({ length: status.steps }, (_, i) => {
                              const stepIndex = i + 1;
                              const isCompleted = status.completed.includes(stepIndex);
                              return (
                                <IconButton
                                  key={stepIndex}
                                  size="small"
                                  onClick={() => toggleStatusStep(statusName, stepIndex)}
                                  className={`step-box ${isCompleted ? 'completed' : ''}`}
                                >
                                  <Typography variant="caption">
                                    {stepIndex}
                                  </Typography>
                                </IconButton>
                              );
                            })}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      );
    };

    const renderRemovedLocationsTab = () => (
      <Card className="card">
        <CardContent>
          <Typography variant="h6" className="card-header">
            {t('fallOfAvalon.removedLocations.title', 'Removed Locations')}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-4">
            {t('fallOfAvalon.removedLocations.subtitle', 'Track replaced/removed map locations with box pairs.')}
          </Typography>
          <Grid container spacing={2}>
            {state.removedLocations.map((location, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" className="text-gold mb-2">
                      {t('fallOfAvalon.removedLocations.boxPlaceholder', 'Box')} {index + 1}
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label={t('fallOfAvalon.removedLocations.boxPlaceholder', 'Box 1')}
                          value={location.box1}
                          onChange={(e) => updateRemovedLocation(index, 'box1', e.target.value)}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label={t('fallOfAvalon.removedLocations.boxPlaceholder', 'Box 2')}
                          value={location.box2}
                          onChange={(e) => updateRemovedLocation(index, 'box2', e.target.value)}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );

    const renderPlayerNotesTab = () => (
      <Card className="card">
        <CardContent>
          <Typography variant="h6" className="card-header">
            {t('fallOfAvalon.playerNotes.title', 'Player Notes')}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={state.playerNotes}
            onChange={(e) => setState(prev => ({ ...prev, playerNotes: e.target.value }))}
            placeholder={t('fallOfAvalon.playerNotes.placeholder', 'Enter notes about your campaign...')}
            className="notes-textarea"
          />
        </CardContent>
      </Card>
    );

    const renderEditPlayerDialog = () => (
      <Dialog
        open={editPlayerDialog.open}
        onClose={() => setEditPlayerDialog({ open: false, player: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {t('fallOfAvalon.players.editPlayer', 'Edit Player')}
        </DialogTitle>
        <DialogContent>
          {editPlayerDialog.player && (
            <Grid container spacing={2} className="mt-1">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('fallOfAvalon.playerNotes.title', 'Name')}
                  value={editPlayerDialog.player.name}
                  onChange={(e) => setEditPlayerDialog(prev => ({
                    ...prev,
                    player: { ...prev.player, name: e.target.value }
                  }))}
                />
              </Grid>
              {/* Add more fields as needed */}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPlayerDialog({ open: false, player: null })}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button
            onClick={() => {
              if (editPlayerDialog.player) {
                setState(prev => ({
                  ...prev,
                  players: prev.players.map(p =>
                    p.id === editPlayerDialog.player.id ? editPlayerDialog.player : p
                  )
                }));
              }
              setEditPlayerDialog({ open: false, player: null });
            }}
            className="btn btn-primary"
          >
            {t('common.save', 'Save')}
          </Button>
        </DialogActions>
      </Dialog>
    );

    if (!state) {
      return <LoadingSpinner message={t('common.loading', 'Loading...')} />;
    }

    return (
      <div className="campaign-container">
        <Box className="campaign-header">
          <Typography variant="h4" className="campaign-title">
            {t('campaigns.fallOfAvalon.name', 'Fall of Avalon')}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tainted Grail Board Game Save Sheet
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          className="campaign-tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={t('fallOfAvalon.tracker.title', 'Tracker')} />
          <Tab label={t('fallOfAvalon.menhirs.title', 'Menhirs')} />
          <Tab label={t('fallOfAvalon.questDials.title', 'Quest Dials')} />
          <Tab label={t('fallOfAvalon.guardians.title', 'Guardians')} />
          <Tab label={t('fallOfAvalon.players.title', 'Players')} />
          <Tab label={t('fallOfAvalon.statuses.title', 'Statuses')} />
          <Tab label={t('fallOfAvalon.removedLocations.title', 'Removed Locations')} />
          <Tab label={t('fallOfAvalon.playerNotes.title', 'Player Notes')} />
        </Tabs>

        <Box className="tab-content">
          {renderTabContent()}
        </Box>

        {renderEditPlayerDialog()}
      </div>
    );
  };

export default FallOfAvalonCampaign;