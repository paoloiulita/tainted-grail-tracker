import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import type { CampaignId, CampaignSummary } from '../types';

const campaignBackgrounds: Record<CampaignId, string> = {
  fallOfAvalon: 'fall-of-avalon-cover.webp',
  lastKnight: 'last-knight-cover.webp',
  ageOfLegends: 'age-of-legends-cover.webp',
  redDeath: 'red-death-cover.webp',
  kingsOfRuin: 'kings-of-ruin-cover.webp'
};

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
                component="button"
                type="button"
                aria-label={campaign.name}
                className={`campaign-card campaign-card-${campaign.id} ${campaign.id === selectedCampaign ? 'selected' : ''}`}
                onClick={() => onSelect(campaign.id)}
                elevation={campaign.id === selectedCampaign ? 8 : 2}
                style={{
                  backgroundImage: `url("${import.meta.env.BASE_URL}assets/campaign-backgrounds/${campaignBackgrounds[campaign.id]}")`
                }}
              >
                <CardContent>
                  <Typography variant="h6" className="campaign-card-title">
                    {campaign.name}
                  </Typography>
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