import React from 'react';
import ConditionDetailPage from '../../ConditionDetailPage';

const PreventionPage: React.FC = () => {
  return (
    <ConditionDetailPage
      title="Injury prevention"
      areaLabel="injury prevention"
      variant="pain-specialty-clone"
      heroEyebrow="Sports medicine speciality"
      heroSubtitle="Proactive assessment and training can reduce the risk of sports injuries over time."
    />
  );
};

export default PreventionPage;
