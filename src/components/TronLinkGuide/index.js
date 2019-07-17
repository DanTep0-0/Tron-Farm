import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';
import './TronLinkGuide.scss';

const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const openTronLink = () => {
    window.open(WEBSTORE_URL, '_blank');
};

const TronLinkGuide = props => {
      return (
            <div className='tronLink wow fadeIn' data-wow-dely="0.8s" onClick={ openTronLink }>
              <h2 className = "unin">Please login to</h2>
              <a className="a wow fadeIn" data-wow-delay="0.5s" href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>Tron Chrome Wallet</a>
              <img className = "logo2 wow slideInRight" data-wow-dely="1.2s" src={ TronLinkLogo } alt='TronLink logo' />
                <div className='infoT'>
                    <div className = "text">
                      If you haven't downloaded the TRON wallet web extension yet,
                      download TronLink to work with the website.
                      <p>Make sure you are on the Mainnet network and not using test network (shasta).
                      You can change it in the settings by switching node.</p>
                      <p>After logging in the wallet or changing the network,
                      please reload the page.</p>
                    </div>
                </div>
                <a className = "a dwnld wow fadeIn" data-wow-delay="0.8s" href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>Download TronLink</a>
            </div>
        );

};

export default TronLinkGuide;
