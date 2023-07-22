import { ethers, BrowserProvider, Contract } from "ethers";

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, provider: BrowserProvider): Promise<Contract> => {
  if (!NETWORK_ID) {
    return Promise.reject("Network ID is not defined.");
  }

  const res = await fetch(`/contracts/${name}.json`);
  const artifact = await res.json();

  if (artifact.networks[NETWORK_ID].address) {
    return new ethers.Contract(
      artifact.networks[NETWORK_ID].address,
      artifact.abi,
      provider
    );
  }
  else {
    return Promise.reject(`Contract [${name}] cannot be loaded.`);
  }
};
