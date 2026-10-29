import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import type { CampaignId, CampaignSummary } from '../types';

interface CampaignSelectorProps {
  campaigns: CampaignSummary[];
  selectedCampaign?: CampaignId;
  onSelect: (campaignId: CampaignId) => void;
}

const CampaignSelector = ({ campaigns, selectedCampaign, onSelect }: CampaignSelectorProps) => {
  const { t } = useTranslation();
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