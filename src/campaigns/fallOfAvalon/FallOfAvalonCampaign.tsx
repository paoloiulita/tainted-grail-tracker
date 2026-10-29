import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Card, CardContent, Typography, TextField, Button, Box, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Slider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppState } from '../../hooks/useAppState';
import { useCampaign } from '../../contexts/CampaignContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import CharacterNotesEditor from '../../components/CharacterNotesEditor';
import type {
  CampaignState,
  Guardian,
  Menhir,
  Character,
  CharacterAttribute,
  RemovedLocation
} from '../../types';

function isCampaignState(value: unknown): value is CampaignState {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<CampaignState>;
  return typeof candidate.campaign === 'object'
    && candidate.campaign !== null
    && Array.isArray(candidate.menhirs)
    && Array.isArray(candidate.questDials)
    && Array.isArray(candidate.guardians)
    && Array.isArray(candidate.characters)
    && typeof candidate.statuses === 'object'
    && candidate.statuses !== null
    && Array.isArray(candidate.removedLocations);
}

const sliderNumber = (value: number | number[]) =>
  Array.isArray(value) ? value[0] ?? 0 : value;

const REMOVED_LOCATION_COUNT = 16;
const MAX_CHARACTERS = 4;

const boundedCharacterStat = (value: string, maximum = 10) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isNaN(parsedValue) ? 0 : Math.min(maximum, Math.max(0, parsedValue));
};

const normalizeCharacter = (character: Character): Character => ({
  ...character,
  health: Math.min(10, Math.max(0, character.health)),
  energy: Math.min(10, Math.max(0, character.energy)),
  terror: Math.min(10, Math.max(0, character.terror)),
  experience: Math.min(10, Math.max(0, character.experience)),
  reputation: Math.min(10, Math.max(0, character.reputation)),
  magic: Math.min(10, Math.max(0, character.magic)),
  food: Math.min(10, Math.max(0, character.food)),
  wealth: Math.min(10, Math.max(0, character.wealth)),
  attributes: {
    aggression: Math.min(5, Math.max(0, character.attributes.aggression)),
    caution: Math.min(5, Math.max(0, character.attributes.caution)),
    courage: Math.min(5, Math.max(0, character.attributes.courage)),
    empathy: Math.min(5, Math.max(0, character.attributes.empathy)),
    practicality: Math.min(5, Math.max(0, character.attributes.practicality)),
    spirituality: Math.min(5, Math.max(0, character.attributes.spirituality))
  }
});

const FallOfAvalonCampaign = () => {
  const { t } = useTranslation();
  const { getCampaignState, updateCampaignState } = useAppState();
  const { setCampaign } = useCampaign();
  const [state, setState] = useState<CampaignState | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [focusedMenhirIndex, setFocusedMenhirIndex] = useState<number | null>(null);
  const [editCharacterDialog, setEditCharacterDialog] = useState<{ open: boolean; character: Character | null }>({
    open: false,
    character: null
  });
  const [characterPendingDeletion, setCharacterPendingDeletion] = useState<Character | null>(null);
  const updateState = (updater: (current: CampaignState) => CampaignState) => {
    setState((current) => current ? updater(current) : current);
  };

  // Load campaign state
  useEffect(() => {
    const loadState = () => {
      const savedState = getCampaignState('fallOfAvalon');
      if (savedState !== null) {
        if (!isCampaignState(savedState)) {
          throw new Error('Stored Fall of Avalon campaign data has an invalid shape.');
        }
        setState({
          ...savedState,
          characters: savedState.characters.map(normalizeCharacter),
          removedLocations: Array.from(
            { length: REMOVED_LOCATION_COUNT },
            (_, index) => savedState.removedLocations[index] ?? { box1: '', box2: '' }
          )
        });
        return;
      }

      // Initialize with default state
      const defaultState: CampaignState = {
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
          characterNotes: '',
          characters: [
            {
              id: 'character-1',
              name: 'Character 1',
              location: '',
              dial: 0,
              health: 10,
              energy: 10,
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
              id: 'character-2',
              name: 'Character 2',
              location: '',
              dial: 0,
              health: 10,
              energy: 10,
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
              id: 'character-3',
              name: 'Character 3',
              location: '',
              dial: 0,
              health: 10,
              energy: 10,
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
              id: 'character-4',
              name: 'Character 4',
              location: '',
              dial: 0,
              health: 10,
              energy: 10,
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
          removedLocations: Array.from({ length: REMOVED_LOCATION_COUNT }, () => ({ box1: '', box2: '' }))
      };
      setState(defaultState);
      updateCampaignState('fallOfAvalon', defaultState);
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

  if (!state) {
    return <LoadingSpinner message={t('common.loading', 'Loading...')} />;
  }

  // Update chapter and day
  const updateCampaignInfo = (field: 'chapter' | 'day', value: number) => {
    updateState(prev => ({
      ...prev,
      campaign: {
        ...prev.campaign,
        [field]: value
      }
    }));
  };

    // Menhir handlers
    const updateMenhir = <K extends keyof Menhir>(index: number, field: K, value: Menhir[K]) => {
      updateState(prev => ({
        ...prev,
        menhirs: prev.menhirs.map((menhir, i) =>
          i === index ? { ...menhir, [field]: value } : menhir
        )
      }));
    };

    // Quest dial handlers
    const updateQuestDial = <K extends keyof Menhir>(index: number, field: K, value: Menhir[K]) => {
      updateState(prev => ({
        ...prev,
        questDials: prev.questDials.map((dial, i) =>
          i === index ? { ...dial, [field]: value } : dial
        )
      }));
    };

    // Guardian handlers
    const updateGuardian = (index: number, field: keyof Guardian, value: string) => {
      updateState(prev => ({
        ...prev,
        guardians: prev.guardians.map((guardian, i) =>
          i === index ? { ...guardian, [field]: value } : guardian
        )
      }));
    };

    // Character handlers
    const updateCharacter = <K extends Exclude<keyof Character, 'id' | 'attributes'>>(
      characterId: string,
      field: K,
      value: Character[K]
    ) => {
      updateState(prev => ({
        ...prev,
        characters: prev.characters.map(character =>
          character.id === characterId ? { ...character, [field]: value } : character
        )
      }));
    };

    const updateCharacterAttribute = (characterId: string, attribute: CharacterAttribute, value: number) => {
      const boundedValue = Math.min(5, Math.max(0, value));
      updateState(prev => ({
        ...prev,
        characters: prev.characters.map(character =>
          character.id === characterId
            ? {
                ...character,
                attributes: {
                  ...character.attributes,
                  [attribute]: boundedValue
                }
              }
            : character
        )
      }));
    };

    const toggleStatusStep = (statusName: string, stepIndex: number) => {
      updateState(prev => ({
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

    const updateRemovedLocation = <K extends keyof RemovedLocation>(
      index: number,
      field: K,
      value: RemovedLocation[K]
    ) => {
      updateState(prev => ({
        ...prev,
        removedLocations: prev.removedLocations.map((location, i) =>
          i === index ? { ...location, [field]: value } : location
        )
      }));
    };

    const addCharacter = () => {
      if (state.characters.length >= MAX_CHARACTERS) {
        return;
      }

      const newCharacter = {
        id: `character-${Date.now()}`,
        name: `Character ${state.characters.length + 1}`,
        location: '',
        dial: 0,
        health: 10,
        energy: 10,
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
      updateState(prev => ({
        ...prev,
        characters: [...prev.characters, newCharacter]
      }));
    };

    const confirmDeleteCharacter = () => {
      if (!characterPendingDeletion) {
        return;
      }
      updateState(prev => ({
        ...prev,
        characters: prev.characters.filter(currentCharacter => currentCharacter.id !== characterPendingDeletion.id)
      }));
      setCharacterPendingDeletion(null);
    };

    const renderTabContent = () => {
      switch (activeTab) {
        case 0:
          return renderTrackerTab();
        case 1:
          return renderCharactersTab();
        case 2:
          return renderStatusesTab();
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
                <Grid container spacing={2} alignItems="center" key={index} className="mb-2">
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label={
                        focusedMenhirIndex === index || menhir.location
                          ? t(`fallOfAvalon.menhirs.${index}`, `Menhir ${index + 1}`)
                          : t('fallOfAvalon.menhirs.location', 'Location')
                      }
                      value={menhir.location}
                      onChange={(e) => updateMenhir(index, 'location', e.target.value)}
                      onFocus={() => setFocusedMenhirIndex(index)}
                      onBlur={() => setFocusedMenhirIndex(null)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.menhirs.dialValue', 'Dial Value')}
                      type="number"
                      value={menhir.dialValue}
                      onChange={(e) => updateMenhir(index, 'dialValue', parseInt(e.target.value) || 0)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={5} className="dial-slider-grid">
                    <Slider
                      value={menhir.dialValue}
                      onChange={(_event, value) => updateMenhir(index, 'dialValue', sliderNumber(value))}
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
                <Grid container spacing={2} alignItems="center" key={index} className="mb-2">
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label={t(`fallOfAvalon.questDials.${index}`, `Quest Dial ${index + 1}`)}
                      value={dial.location}
                      onChange={(e) => updateQuestDial(index, 'location', e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label={t('fallOfAvalon.questDials.dialValue', 'Dial Value')}
                      type="number"
                      value={dial.dialValue}
                      onChange={(e) => updateQuestDial(index, 'dialValue', parseInt(e.target.value) || 0)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={5} className="dial-slider-grid">
                    <Slider
                      value={dial.dialValue}
                      onChange={(_event, value) => updateQuestDial(index, 'dialValue', sliderNumber(value))}
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
                  label={t(`fallOfAvalon.guardians.${index}`, `Guardian ${index + 1}`)}
                  value={guardian.location}
                  onChange={(e) => updateGuardian(index, 'location', e.target.value)}
                  className="mb-2"
                  size="small"
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {renderRemovedLocationsPanel()}
        </Grid>
        <Grid item xs={12}>
          {renderCharacterNotesPanel()}
        </Grid>
      </Grid>
    );

    const renderCharactersTab = () => (
      <Box>
        <Box className="character-controls mb-4">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addCharacter}
            disabled={state.characters.length >= MAX_CHARACTERS}
            className="btn btn-primary"
          >
            {t('fallOfAvalon.characters.addCharacter', 'Add Character')}
          </Button>
          {state.characters.length >= MAX_CHARACTERS && (
            <Typography variant="body2" color="text.secondary" className="character-limit-message">
              {t('fallOfAvalon.characters.maximumCharacters', 'Maximum 4 characters')}
            </Typography>
          )}
        </Box>

        <Grid container spacing={3}>
          {state.characters.map((character) => (
            <Grid item xs={12} md={6} lg={4} key={character.id}>
              <Card className="card character-card">
                <CardContent className="character-card-content">
                  <Box className="character-card-header">
                    <Typography variant="h6" className="text-gold">
                      {character.name}
                    </Typography>
                    <Box className="character-actions">
                      <IconButton
                        size="small"
                        onClick={() => setEditCharacterDialog({ open: true, character })}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label={t('fallOfAvalon.characters.deleteCharacter', 'Delete Character')}
                        onClick={() => setCharacterPendingDeletion(character)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <TextField
                    fullWidth
                    label={t('fallOfAvalon.characterNotes.title', 'Name')}
                    value={character.name}
                    onChange={(e) => updateCharacter(character.id, 'name', e.target.value)}
                    size="small"
                    className="mb-2"
                  />

                  <TextField
                    fullWidth
                    label={t('fallOfAvalon.characterNotes.title', 'Location')}
                    value={character.location}
                    onChange={(e) => updateCharacter(character.id, 'location', e.target.value)}
                    size="small"
                    className="mb-2"
                  />

                  <TextField
                    fullWidth
                    label="Dial"
                    type="number"
                    value={character.dial}
                    onChange={(e) => updateCharacter(character.id, 'dial', parseInt(e.target.value) || 0)}
                    size="small"
                    className="mb-2"
                  />

                  <Grid container spacing={1} className="mb-2">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        className="character-stat-health"
                        label="Health"
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={character.health}
                        onChange={(e) => updateCharacter(character.id, 'health', boundedCharacterStat(e.target.value))}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        className="character-stat-energy"
                        label="Energy"
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={character.energy}
                        onChange={(e) => updateCharacter(character.id, 'energy', boundedCharacterStat(e.target.value))}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} className="mb-2">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        className="character-stat-terror"
                        label="Terror"
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={character.terror}
                        onChange={(e) => updateCharacter(character.id, 'terror', boundedCharacterStat(e.target.value))}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        className="character-stat-experience"
                        label="Experience"
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={character.experience}
                        onChange={(e) => updateCharacter(character.id, 'experience', boundedCharacterStat(e.target.value))}
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
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={character.reputation}
                        onChange={(e) => updateCharacter(character.id, 'reputation', boundedCharacterStat(e.target.value))}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Magic"
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={character.magic}
                        onChange={(e) => updateCharacter(character.id, 'magic', boundedCharacterStat(e.target.value))}
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
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={character.food}
                        onChange={(e) => updateCharacter(character.id, 'food', boundedCharacterStat(e.target.value))}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Wealth"
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={character.wealth}
                        onChange={(e) => updateCharacter(character.id, 'wealth', boundedCharacterStat(e.target.value))}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle2" className="mt-3 mb-2">
                    {t('fallOfAvalon.attributes.title', 'Attributes')}
                  </Typography>
                  <Box className="attribute-list">
                    {(Object.entries(character.attributes) as Array<[CharacterAttribute, number]>).map(([attr, value]) => (
                      <Box key={attr} className="attribute-row">
                        <Box className="attribute-header">
                          <Typography variant="body2">
                            <img
                              className="attribute-icon"
                              src={`${import.meta.env.BASE_URL}assets/attribute-icons/${attr}.svg`}
                              alt=""
                              aria-hidden="true"
                              onError={(event) => {
                                event.currentTarget.hidden = true;
                              }}
                            />
                            {t(`fallOfAvalon.attributes.${attr}`, attr.charAt(0).toUpperCase() + attr.slice(1))}
                          </Typography>
                          <Typography variant="body2" className="attribute-value">
                            {value}
                          </Typography>
                        </Box>
                        <Slider
                          value={value}
                          onChange={(_event, sliderValue) => updateCharacterAttribute(character.id, attr, sliderNumber(sliderValue))}
                          min={0}
                          max={5}
                          size="small"
                          marks
                          valueLabelDisplay="auto"
                          aria-label={t(`fallOfAvalon.attributes.${attr}`, attr)}
                        />
                      </Box>
                    ))}
                  </Box>
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

    const renderRemovedLocationsPanel = () => (
      <Card className="card">
        <CardContent>
          <Typography variant="h6" className="card-header">
            {t('fallOfAvalon.removedLocations.title', 'Removed Locations')}
          </Typography>
          <div className="removed-locations-grid">
            {state.removedLocations.map((location, index) => (
              <div className="removed-location-pair" key={index}>
                <TextField
                  className="removed-location-input"
                  value={location.box1}
                  onChange={(e) => updateRemovedLocation(index, 'box1', e.target.value)}
                  inputProps={{
                    'aria-label': `${t('fallOfAvalon.removedLocations.from', 'Removed location from')} ${index + 1}`
                  }}
                  size="small"
                />
                <ArrowForwardIcon fontSize="small" aria-hidden="true" />
                <TextField
                  className="removed-location-input"
                  value={location.box2}
                  onChange={(e) => updateRemovedLocation(index, 'box2', e.target.value)}
                  inputProps={{
                    'aria-label': `${t('fallOfAvalon.removedLocations.to', 'Removed location to')} ${index + 1}`
                  }}
                  size="small"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );

    const renderCharacterNotesPanel = () => (
      <Card className="card">
        <CardContent>
          <Typography variant="h6" className="card-header">
            {t('fallOfAvalon.characterNotes.title', 'Character Notes')}
          </Typography>
          <CharacterNotesEditor
            value={state.characterNotes}
            onChange={(characterNotes) => updateState(prev => ({ ...prev, characterNotes }))}
            placeholder={t('fallOfAvalon.characterNotes.placeholder', 'Enter notes about your campaign...')}
          />
        </CardContent>
      </Card>
    );

    const renderEditCharacterDialog = () => (
      <Dialog
        open={editCharacterDialog.open}
        onClose={() => setEditCharacterDialog({ open: false, character: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {t('fallOfAvalon.characters.editCharacter', 'Edit Character')}
        </DialogTitle>
        <DialogContent>
          {editCharacterDialog.character && (
            <Grid container spacing={2} className="mt-1">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('fallOfAvalon.characterNotes.title', 'Name')}
                  value={editCharacterDialog.character.name}
                  onChange={(e) => setEditCharacterDialog(prev => prev.character
                    ? { ...prev, character: { ...prev.character, name: e.target.value } }
                    : prev
                  )}
                />
              </Grid>
              {/* Add more fields as needed */}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCharacterDialog({ open: false, character: null })}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button
            onClick={() => {
              if (editCharacterDialog.character) {
                const updatedCharacter = editCharacterDialog.character;
                updateState(prev => ({
                  ...prev,
                  characters: prev.characters.map(p =>
                    p.id === updatedCharacter.id ? updatedCharacter : p
                  )
                }));
              }
              setEditCharacterDialog({ open: false, character: null });
            }}
            className="btn btn-primary"
          >
            {t('common.save', 'Save')}
          </Button>
        </DialogActions>
      </Dialog>
    );

    const renderDeleteCharacterDialog = () => (
      <Dialog
        open={characterPendingDeletion !== null}
        onClose={() => setCharacterPendingDeletion(null)}
        aria-labelledby="delete-character-dialog-title"
        aria-describedby="delete-character-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="delete-character-dialog-title">
          {t('fallOfAvalon.characters.confirmDeleteTitle', 'Delete character?')}
        </DialogTitle>
        <DialogContent>
          <Typography id="delete-character-dialog-description" color="text.secondary">
            {t('fallOfAvalon.characters.confirmDelete', {
              name: characterPendingDeletion?.name ?? '',
              defaultValue: `Are you sure you want to delete ${characterPendingDeletion?.name ?? 'this character'}? This action cannot be undone.`
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCharacterPendingDeletion(null)}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button onClick={confirmDeleteCharacter} color="error" variant="contained">
            {t('fallOfAvalon.characters.deleteCharacter', 'Delete Character')}
          </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <div className="campaign-container">
        <Box className="campaign-header">
          <Typography variant="h4" className="campaign-title">
            {t('campaigns.fallOfAvalon.name', 'Fall of Avalon')}
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          className="campaign-tabs"
          variant="fullWidth"
        >
          <Tab label={t('fallOfAvalon.tracker.title', 'Tracker')} />
          <Tab label={t('fallOfAvalon.characters.title', 'Characters')} />
          <Tab label={t('fallOfAvalon.statuses.title', 'Statuses')} />
        </Tabs>

        <Box className="tab-content">
          {renderTabContent()}
        </Box>

        {renderEditCharacterDialog()}
        {renderDeleteCharacterDialog()}
      </div>
    );
  };

export default FallOfAvalonCampaign;