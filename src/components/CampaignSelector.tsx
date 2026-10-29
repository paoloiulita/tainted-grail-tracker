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
  onSelect: (campaignId: CampaignId) => void;
}

const CampaignSelector = ({ campaigns, onSelect }: CampaignSelectorProps) => {
  const { t } = useTranslation();
  return (
    <Card className="campaign-selector-card">
      <CardContent>
        <Typography variant="h6" className="mb-4">
          {t('campaigns.selectToBegin', 'Select a campaign to begin...')}
        </Typography>
        <Grid container spacing={2}>
          {campaigns.map((campaign) => {
            const isAvailable = campaign.id === 'fallOfAvalon';

            return (
              <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                <Card
                  component="button"
                  type="button"
                  aria-label={t(`campaigns.${campaign.id}.name`, campaign.name)}
                  className={`campaign-card campaign-card-${campaign.id}${isAvailable ? '' : ' campaign-card-unavailable'}`}
                  onClick={() => {
                    if (isAvailable) onSelect(campaign.id);
                  }}
                  disabled={!isAvailable}
                  elevation={2}
                >
                  <span
                    aria-hidden="true"
                    className="campaign-card-background"
                    style={{
                      backgroundImage: `url("${import.meta.env.BASE_URL}assets/campaign-backgrounds/${campaignBackgrounds[campaign.id]}")`
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" className="campaign-card-title">
                      {t(`campaigns.${campaign.id}.name`, campaign.name)}
                    </Typography>
                    {!isAvailable && (
                      <Typography className="campaign-card-coming-soon">
                        {t('campaigns.comingSoon', 'Coming soon!')}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CampaignSelector;