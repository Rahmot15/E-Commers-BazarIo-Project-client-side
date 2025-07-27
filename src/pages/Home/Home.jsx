import React from 'react';
import Container from '../../Components/Container';
import Banner from '../../Components/Banner';
import Advertisement from '../../Components/Advertisement';
import Steps from '../../Components/Steps';
import StatsSection from '../../Components/StatsSection';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BazarIo | Home</title>
            </Helmet>
            <Banner/>
            <Container/>
            <Advertisement/>
            <StatsSection/>
            <Steps/>
        </div>
    );
};

export default Home;
