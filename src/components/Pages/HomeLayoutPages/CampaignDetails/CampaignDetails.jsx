import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useParams } from 'react-router';

const CampaignDetails = () => {
    const { user } = useAuth();
    const { campaignId } = useParams();

    
    return (
        <section>
            
        </section>
    );
};

export default CampaignDetails;