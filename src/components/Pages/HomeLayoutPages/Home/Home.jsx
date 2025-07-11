import React from 'react';
import AboutUs from './AboutUs/AboutUs';
import CallToAction from './CallToAction/CallToAction';
import PetCategories from './PetCategories/PetCategories';

const Home = () => {
    return (
        <div>
            <PetCategories></PetCategories>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            
        </div>
    );
};

export default Home;