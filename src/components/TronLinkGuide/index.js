import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';
import './TronLinkGuide.scss';

const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const openTronLink = () => {
    window.open(WEBSTORE_URL, '_blank');
};

const TronLinkGuide = props => {
      return (
            <div className='tronLink' onClick={ openTronLink }>
              <h1 className = "unin">TronLink Required</h1>
              <img className = "logo2" src={ TronLinkLogo } alt='TronLink logo' />
                <div className='info'>
                    <p className = "text">
                      To play an economic strategy Tron Farm you must install
                      a TronLink browser extention which is the most popular
                      TRON wallet for the browsers. You can download it from
                      the Chrome Store using the link below. Once installed, return back
                      and refresh the page.
                      <a className = "a" href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>Download TronLink</a>
                    </p>
                </div>
            </div>
        );

};

export default TronLinkGuide;
