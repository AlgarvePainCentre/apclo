import React from 'react';
import TestimonialTemplate from '../TestimonialTemplate';

const PadelSportsMedicinePage: React.FC = () => (
  <TestimonialTemplate
    title="Sports Medicine for Padel Athletes"
    intro="Professional padel players talk about training, competition and staying injury-free with sports medicine."
    storyHeading="Patient Stories: Padel & Sports Medicine"
    story="Professional padel doubles share the ins and outs of practice and companionship — competing while maintaining a healthy, injury-free body with the support of sports medicine."
    ytId="PzaOM_ERL0Q"
    heroImage="/assets/images/Hero/Physiotherapy.webp"
    next={{ to: '/resources/testimonials/overcoming-sciatica-pain', title: 'Overcoming Sciatica Pain' }}
  />
);

export default PadelSportsMedicinePage;
