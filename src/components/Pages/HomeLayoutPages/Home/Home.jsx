import React from 'react';
import CallToAction from './CallToAction/CallToAction';

import Header from './Header/Header';
import TopContributors from './TopContributors/TopContributors';
import RecommendedCampaigns from '../../../Shared/RecommendedCampaigns/RecommendedCampaigns';
import OurMissions from './OurMissions/OurMissions';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <CallToAction></CallToAction>
            <OurMissions></OurMissions>
            <TopContributors></TopContributors>

            <div className='w-11/12 md:w-10/12 max-w-7xl mx-auto pb-10 md:py-10'>
                <RecommendedCampaigns></RecommendedCampaigns>
            </div>
            
        </div>
    );
};

export default Home;