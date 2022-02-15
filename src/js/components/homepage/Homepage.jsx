/**
 * Homepage.jsx
 * Created by Kevin Li 1/18/18
 */

import React from 'react';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import CovidHighlights from 'containers/homepage/CovidHighlights';
import HeroPoc from 'containers/homepage/HeroPoc';
import Header from 'containers/shared/HeaderContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import MetaTags from '../sharedComponents/metaTags/MetaTags';

import Features from './features/Features';
import Download from './download/Download';
import Community from './community/Community';

require('pages/homepage/homePage.scss');

const Homepage = () => (
    <div className="usa-da-home-page">
        <MetaTags {...MetaTagHelper.homePageMetaTags} />
        <Header />
        <main id="main-content" className="homepage-content">
            {/* <CovidHighlights /> */}
            <HeroPoc />
            <Features />
            <Download />
            <Community />
        </main>
        <GlobalModalContainer />
        <Footer pageName="Homepage" />
    </div>
);

export default Homepage;
