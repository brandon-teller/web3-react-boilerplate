# Web3 React Boilerplate by Brandon

This is a Next.js+Web3 boilerplate project for simple ERC20 token transaction.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Task Completed

- [x] Allows you connect your wallet
- [x] Detect the wrong network and allows you to switch between chains (Sepolia and Polygon Mumbai)
- [x] Fetch balances of DAI and USDC tokens
- [x] Displays both balances in a readable/human way
- [x] Has an input for wallet address to set selected/target user
- [x] Has an input for each token to enter the amount of tokens to be approved or transfered
- [x] Has 2 buttons for each token: APPROVE and TRANSFER
- [x] The inputs have the correct validations hooked to the buttons and also an error message to show to the user ('not enough funds', 'need to approve token first', etc). All of this is calculated/validated with the amount the user types
- [x] Executes the transactions for APPROVE and TRANSFER of tokens to a user
- [x] Some UNIT tests
- [x] Allows you to call the Mint() function to get some tokens to test the app

### Bonuses:

- [x] Organized folder/files structure
- [x] Well defined state architecture
- [x] Buttons with loading state
- [x] Detect that you are in the correct network
- [x] Some E2E tests
- [x] UI/UX (Material UI, Responsive)

## Libraries

- React v118
- Next.js v14
- Typescript v5
- Material UI v5
- RainbowKit v2
- Viem v2.8.6
- Wagmi v2.5.7
- ESLint
- Prettier
- Cypress
- Jest
