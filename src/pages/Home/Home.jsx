import React from 'react';
import Container from '../../Components/Container';
import Banner from '../../Components/Banner';
import Advertisement from '../../Components/Advertisement';
import Steps from '../../Components/Steps';
import StatsSection from '../../Components/StatsSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Container/>
            <Advertisement/>
            <StatsSection/>
            <Steps/>
        </div>
    );
};

export default Home;
