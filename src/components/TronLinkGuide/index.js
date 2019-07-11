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
              <h2 className = "unin">Please login to</h2>
              <a className="a" href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>Tron Chrome Wallet</a>
              <img className = "logo2" src={ TronLinkLogo } alt='TronLink logo' />
                <div className='info'>
                    <p className = "text">
                      If you haven't downloaded the TRON wallet web extension yet,
                      download TronLink to work with the website.
                      <p>Make sure you are on the Mainnet network and not using test network (shasta).</p>
                      <p>After logging into the wallet or changing the account,
                      please reload the page.</p>
                    </p>
                </div>
                <a className = "a dwnld" href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>Download TronLink</a>
            </div>
        );

};

export default TronLinkGuide;
