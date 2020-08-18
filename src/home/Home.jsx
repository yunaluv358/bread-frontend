import React, {Component, useState} from 'react'
import Navigation from './Navigation';
import Header from './Header';
import Features from './Features';
import About from './About'
import Contact from './contact';
import JsonData from '../vendor/data.json';

export const Home = () => {

    const [landingPageData,setLandingPageData] = useState({})

    const getlandingPageData = () => {
        setLandingPageData(JsonData)
    }

    const componentDidMount = () => {
        getlandingPageData();
    }
    return (
        <div>
            <Navigation />
            <Header data={JsonData.Header} />
            <Features data={JsonData.Features} />
            <About data={JsonData.About} />
            <Contact data={JsonData.Contact} />
        </div>
    )
}


export default Home;
