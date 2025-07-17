import React from 'react';
import Container from '../../Components/Container';
import Banner from '../../Components/Banner';
import Advertisement from '../../Components/Advertisement';
import Steps from '../../Components/Steps';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Container/>
            <Advertisement/>
            <Steps/>
        </div>
    );
};

export default Home;
