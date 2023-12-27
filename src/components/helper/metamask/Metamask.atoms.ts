import { BrowserProvider, Signer } from 'ethers';
import { atom } from 'recoil';

/**
 * Recoil Atoms to share certain wallet/ provider related states across the app.
 */

export const accountState = atom<string>({
    key: 'accountState',
    default: '',
});

export const providerState = atom<BrowserProvider>({
  key: 'providerState',
  default: {} as BrowserProvider
});

export const signerState = atom<Signer>({
  key: 'signerState',
  default: {} as Signer
});

export const connectedState = atom<Boolean>({
  key: 'connectedState',
  default: false
})