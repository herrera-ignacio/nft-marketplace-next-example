import { FunctionComponent, createContext, useContext, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, BrowserProvider } from "ethers";
import { browser } from "process";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
  ethereum?: MetaMaskInpageProvider;
  provider?: BrowserProvider;
  contract?: Contract;
}

export type Web3State = {
  isLoading: boolean;
} & Web3Params;

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<{ children: any }> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    setWeb3Api({
      ethereum: window.ethereum, // Injected by metamask.
      provider: new BrowserProvider(window.ethereum),
      isLoading: false
    });
  }, []);

  if (web3Api.provider) {
    web3Api.provider?.send("eth_requestAccounts", []);
  }

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);

function createDefaultState() {
  return {
    ethereum: undefined,
    provider: undefined,
    contract: undefined,
    isLoading: true
  };
};

export default Web3Provider;
