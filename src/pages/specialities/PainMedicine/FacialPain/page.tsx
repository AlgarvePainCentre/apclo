import React from 'react';
import ConditionDetailPage from '../../ConditionDetailPage';

const FacialPainPage: React.FC = () => {
  return (
    <ConditionDetailPage
      title="Facial pain"
      areaLabel="facial pain"
      variant="pain-specialty-clone"
      heroEyebrow="Pain medicine speciality"
      heroSubtitle="Facial pain and neuralgia can be intense and distressing, but often respond to targeted care."
    />
  );
};

export default FacialPainPage;
