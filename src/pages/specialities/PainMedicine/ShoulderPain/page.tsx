import React from 'react';
import ConditionDetailPage from '../../ConditionDetailPage';

const ShoulderPainPage: React.FC = () => {
  return (
    <ConditionDetailPage
      title="Shoulder pain"
      areaLabel="shoulder pain"
      variant="pain-specialty-clone"
      heroEyebrow="Pain medicine speciality"
      heroSubtitle="Shoulder pain can make simple tasks like dressing or reaching overhead feel difficult."
    />
  );
};

export default ShoulderPainPage;
