import React from "react";
import {Logo} from './components/Logo';
import {Container} from './components/Container';
import { RecoilRoot } from 'recoil';

export const App = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-pv-panels bg-cover">
      <RecoilRoot>
        <Logo/>
        <Container/>
      </RecoilRoot>
    </div>
  )
}
