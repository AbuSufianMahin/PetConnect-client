import React from 'react';
import AboutUs from './AboutUs/AboutUs';
import CallToAction from './CallToAction/CallToAction';

import Header from './Header/Header';
import TopContributors from './TopContributors/TopContributors';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            <TopContributors></TopContributors>
        </div>
    );
};

export default Home;