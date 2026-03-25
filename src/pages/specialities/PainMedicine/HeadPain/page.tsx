import React from 'react';
import ConditionDetailPage from '../../ConditionDetailPage';

const HeadPainPage: React.FC = () => {
  return (
    <ConditionDetailPage
      title="Head pain"
      areaLabel="head pain"
      variant="pain-specialty-clone"
      heroEyebrow="Pain medicine speciality"
      heroSubtitle="Headache and facial pain syndromes can be disabling, but many respond to targeted diagnosis and treatment."
    />
  );
};

export default HeadPainPage;
