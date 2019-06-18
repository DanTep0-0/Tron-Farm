import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';
import './TronLinkGuide.scss';

const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const openTronLink = () => {
    window.open(WEBSTORE_URL, '_blank');
};

const TronLinkGuide = props => {
    const {
        installed = false
    } = props;

    if(!installed) {
        return (
            <div className='tronLink' onClick={ openTronLink }>
                                <h1 className = "unin">TronLink Required</h1>
              <img className = "logo" src={ TronLinkLogo } alt='TronLink logo' />
                <div className='info'>
                    <p className = "text">
                      To create a post or tip others you must install TronLink. TronLink is a TRON wallet for the browser
                      that can be <a className = "a" href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>installed from the Chrome Webstore</a>.
                      Once installed, return back and refresh the page.
                    </p>
                    <p className = "warning">
                      Otherwise, game won't work!!!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className='tronLink' title = "You must log in" onClick={ openTronLink } >
                            <h1>Log In Required</h1>
          <img className = "logo" src={ TronLinkLogo } alt='TronLink logo' />
            <div className='info'>
                <p className = "text">
                    TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your
                    first wallet or decrypt a previously-created wallet.
                </p>
                <p className = "warning">
                  Otherwise, game won't work!!!
                </p>
            </div>
        </div>
    );
};

export default TronLinkGuide;
