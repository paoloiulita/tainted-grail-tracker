import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SelectChangeEvent } from '@mui/material';
import type { CampaignId, CampaignSummary } from '../types';

interface CampaignSelectorProps {
  campaigns: CampaignSummary[];
  selectedCampaign?: CampaignId;
  onSelect: (campaignId: CampaignId) => void;
  compact?: boolean;
}

const CampaignSelector = ({ campaigns, selectedCampaign, onSelect, compact = false }: CampaignSelectorProps) => {
  const { t } = useTranslation();
  const handleSelect = (event: SelectChangeEvent<CampaignId>) => {
    const campaign = campaigns.find(({ id }) => id === event.target.value);
    if (campaign) {
      onSelect(campaign.id);
    }
  };

  if (compact) {
    return (
      <FormControl size="small" className="campaign-select-compact">
        <Select
          value={selectedCampaign ?? ''}
          onChange={handleSelect}
          displayEmpty
          IconComponent={ExpandMoreIcon}
          className="campaign-select"
        >
          <MenuItem value="">
            <em>{t('campaigns.select', 'Select Campaign...')}</em>
          </MenuItem>
          {campaigns.map((campaign) => (
            <MenuItem key={campaign.id} value={campaign.id}>
              <div className="campaign-select-item">
                <Typography variant="body2" className="campaign-name">{campaign.name}</Typography>
                <Chip
                  label={campaign.status}
                  size="small"
                  className={`campaign-status status-${campaign.status}`}
                  sx={{ ml: 1 }}
                />
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  // Full campaign selector
  return (
    <Card className="campaign-selector-card">
      <CardContent>
        <Typography variant="h6" className="mb-4">
          {t('campaigns.selectToBegin', 'Select a campaign to begin...')}
        </Typography>
        <Grid container spacing={2}>
          {campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={campaign.id}>
              <Card
                className={`campaign-card ${campaign.id === selectedCampaign ? 'selected' : ''}`}
                onClick={() => onSelect(campaign.id)}
                elevation={campaign.id === selectedCampaign ? 8 : 2}
              >
                <CardContent>
                  <Typography variant="h6" className="campaign-card-title">
                    {campaign.name}
                  </Typography>
                  <Typography variant="body2" className="campaign-description">
                    {campaign.description}
                  </Typography>
                  <Chip
                    label={campaign.status}
                    size="small"
                    className={`campaign-status status-${campaign.status}`}
                    sx={{ mt: 1 }}
                  />
                  {campaign.id === selectedCampaign && (
                    <Chip
                      label={t('campaigns.selected', 'Selected')}
                      color="primary"
                      size="small"
                      sx={{ ml: 1, mt: 1 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CampaignSelector;