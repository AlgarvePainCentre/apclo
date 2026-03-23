import React from 'react';
import ConditionDetailPage from '../../ConditionDetailPage';

const KneePainPage: React.FC = () => {
  return (
    <ConditionDetailPage
      title="Knee pain"
      areaLabel="knee pain"
      variant="pain-specialty-clone"
      heroEyebrow="Pain medicine speciality"
      heroSubtitle="Knee pain can make stairs, sport and even short walks feel demanding."
    />
  );
};

export default KneePainPage;
