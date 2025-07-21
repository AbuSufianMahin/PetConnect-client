import React from 'react';
import AboutUs from './AboutUs/AboutUs';
import CallToAction from './CallToAction/CallToAction';

import Header from './Header/Header';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            
        </div>
    );
};

export default Home;