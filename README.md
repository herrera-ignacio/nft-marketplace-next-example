# Next NFT Marketplace

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. `yarn install`
2. Create a `.env.development` file and add `NEXT_PUBLIC_NETWORK_ID` based on your compiled contract `"networks"` key.
3. Create a workspace with Ganache pointing to `truffle-config.js`.
4. If needed, run `truffle migrate --reset`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Connect Metamask

1. Login to your metamask account.
2. Add a network manually:
   1. Chain ID is 1337 by default.
   2. RPC URL is provided by Ganache.
   3. Currency Symbol is ETH.
