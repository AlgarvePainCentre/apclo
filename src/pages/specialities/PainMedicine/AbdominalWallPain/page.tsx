import React from 'react';
import ConditionDetailPage from '../../ConditionDetailPage';

const AbdominalWallPainPage: React.FC = () => {
  return (
    <ConditionDetailPage
      title="Abdominal wall pain"
      areaLabel="abdominal wall pain"
      variant="pain-specialty-clone"
      heroEyebrow="Pain medicine speciality"
      heroSubtitle="Localised abdominal wall pain can mimic internal problems but often has treatable causes."
    />
  );
};

export default AbdominalWallPainPage;
