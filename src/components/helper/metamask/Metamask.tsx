import React, { useState } from 'react';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { ErrorBanner } from '../common/utility/ErrorBanner';
import {
  accountState,
  connectedState,
  providerState,
  signerState,
} from './Metamask.atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

/**
 * Component to connect the DApp to the user's Metamask wallet. It contains a connect button, which forwards the request for connection to metamask.
 * Furthermore it informs the user about the features of Metamask and how to download the browser extension.
 * 
 * @returns the Metamask Component.
 */
export const Metamask = () => {
  const setAccount = useSetRecoilState(accountState);
  const setSigner = useSetRecoilState(signerState);
  const setProvider = useSetRecoilState(providerState);

  const [connected, setConnected] = useRecoilState(connectedState);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  // Handle cases where Metamask is not installed
  useEffect(() => {
    if (window.ethereum == null) {
      setErrorMessage(
        'You must install and connect Metamask in order to interact with this service.',
      );
      setShowError(true);
    } else {
      setMetamaskInstalled(true);
    }
  }, []);

  /**
   * Connect to the Metamask wallet and set the corresponding account in the dapp state
   */
  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      const signer = await provider.getSigner();
      setSigner(signer);

      const accounts = await provider.listAccounts();
      const account = await accounts[0].getAddress();
      setAccount(account);
      setConnected(true);
    } catch (err: any) {
      setErrorMessage(
        'You must accept the wallet connection to interact with this service.',
      );
      setShowError(true);
    }
  };

  return (
    !connected && (
      <>
        <div
          className={`h-full w-full bg-black absolute z-10 bg-black-transparent-2 text-black $`}
        >
          <div className="h-fit w-[40%] bg-gray-transparent-9 rounded-xl p-4 relative -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col items-center space-y-4">
            <h1 className="w-full text-center text-xl font-bold text-black">
              <img src="assets/img/metamask-logo.svg" className="h-8 inline" />{' '}
              Connect Metamask{' '}
              <img src="assets/img/metamask-logo.svg" className="h-8 inline" />
            </h1>
            <p className="text-lg w-full text-center">
              Connect your Metamask wallet in order to interact with the Solar
              Insurance smart contract!
            </p>
            <button
              className={`btn bg-orange-500 hover:bg-orange-400 border-none text-black disabled:text-gray-500`}
              disabled={!metamaskInstalled}
              onClick={connectWallet}
            >
              Connect
            </button>
            <p>
              <a
                target="_blank"
                href={`https://metamask.io/download`}
                className="link block"
              >
                Install Metamask, a virtual Ethereum wallet, in your browser.
              </a>
              <a
                target="_blank"
                href={`https://portfolio.metamask.io/`}
                className="link block"
              >
                Unsure? Read about Metamask use cases and functionallity.
              </a>
            </p>
          </div>
          {showError && <ErrorBanner message={errorMessage} />}
        </div>
      </>
    )
  );
};
