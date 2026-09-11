import React from 'react';
import TestimonialTemplate from '../TestimonialTemplate';

const BernardSchackPage: React.FC = () => (
  <TestimonialTemplate
    title="Walking Again After Chronic Pain"
    intro="Bernard Schack shares how targeted treatment took him from being unable to walk to moving freely again."
    storyHeading="Patient Stories: Bernard's Journey"
    story="Bernard's recovery demonstrates the effectiveness of advanced treatments like dry needling, manual therapy and postural correction, which directly addressed the underlying causes of his pain."
    ytId="If0qu-Ej8dA"
    heroImage="/assets/images/medical/DSC01686.webp"
    next={{ to: '/resources/testimonials/charlotte-klockare', title: 'Reclaiming Freedom of Movement' }}
  />
);

export default BernardSchackPage;
