import React from 'react';
import ConditionDetailPage from '../../ConditionDetailPage';

const InjuriesPage: React.FC = () => {
  return (
    <ConditionDetailPage
      title="Sports injuries"
      areaLabel="sports injuries"
      variant="pain-specialty-clone"
      heroEyebrow="Sports medicine speciality"
      heroSubtitle="From sprains to tendon tears, we help athletes return to activity safely."
    />
  );
};

export default InjuriesPage;
