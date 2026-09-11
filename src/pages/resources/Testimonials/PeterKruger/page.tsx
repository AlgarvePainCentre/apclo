import React from 'react';
import TestimonialTemplate from '../TestimonialTemplate';

const PeterKrugerPage: React.FC = () => (
  <TestimonialTemplate
    title="Recovery After Spine Surgery"
    intro="Peter Kruger shares his journey of resilience and recovery after spine surgery."
    storyHeading="Patient Stories: Peter's Journey"
    story="Peter's journey is one of resilience and recovery — transforming from a state of pain and limited mobility to regaining strength and confidence through dedicated care and a personalised healing approach."
    ytId="HpG1TxTh7l4"
    heroImage="/assets/images/medical/DSC01805.webp"
    next={{ to: '/resources/testimonials/rosa-marques', title: 'Relief from Spinal Stenosis' }}
  />
);

export default PeterKrugerPage;
