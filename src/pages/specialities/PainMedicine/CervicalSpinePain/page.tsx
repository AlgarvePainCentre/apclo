import React from 'react';
import ConditionDetailPage from '../../ConditionDetailPage';

const CervicalSpinePainPage: React.FC = () => {
  return (
    <ConditionDetailPage
      title="Cervical spine pain"
      areaLabel="cervical spine pain"
      mainClassName="cervical-spine-pain-main"
      variant="pain-specialty-clone"
      heroEyebrow="Pain medicine speciality"
      heroSubtitle="Neck pain can cause stiffness, headaches and difficulty with everyday activities."
    />
  );
};

export default CervicalSpinePainPage;
