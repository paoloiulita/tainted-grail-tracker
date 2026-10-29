import { useTranslation } from 'react-i18next';

const AgeOfLegendsCampaign = () => {
  const { t } = useTranslation();

  return (
    <div className="campaign-container placeholder-campaign">
      <div className="placeholder-content">
        <h2>{t('campaigns.ageOfLegends.name', 'Age of Legends')}</h2>
        <p>{t('campaigns.placeholder', 'This campaign is under development.')}</p>
        <p>{t('campaigns.comingSoon', 'Coming soon!')}</p>
      </div>
    </div>
  );
};

export default AgeOfLegendsCampaign;