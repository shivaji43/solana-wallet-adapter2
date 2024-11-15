# Solana Wallet Transfer App Documentation

A React application that allows users to connect their Solana wallet and send SOL to other addresses using the Solana Wallet Adapter.

## Features

- Wallet connection using Solana Wallet Adapter
- SOL transfer functionality
- Real-time transaction status updates
- Error handling
- Support for Phantom Wallet
- Clean, responsive UI

## Installation

1. Create a new React project (if you haven't already):
```bash
npx create-react-app solana-wallet-app
cd solana-wallet-app
```

2. Install the required dependencies:
```bash
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

## Project Structure

Create the following files in your project:

### src/components/WalletTransfer.js

This is the main component that handles wallet connection and SOL transfers. Copy the component code into this file.

### src/App.js

Update your App.js to include the necessary providers:

```jsx
import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import WalletTransfer from './components/WalletTransfer';

const wallets = [new PhantomWalletAdapter()];

function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletTransfer />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
```

## Usage

1. Start the development server:
```bash
npm start
```

2. The app will be available at `http://localhost:3000`

3. To use the app:
   - Click the "Select Wallet" button
   - Connect your Phantom wallet
   - Enter the recipient's Solana address
   - Enter the amount of SOL to send
   - Click "Send SOL" to initiate the transfer

## Component Details

### WalletTransfer Component

The main component handles:

- Wallet connection state
- Input validation
- Transaction creation and sending
- Status updates and error handling

Key features:
```javascript
// Connection to Solana devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Transaction creation
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: recipientPubKey,
    lamports: parsedAmount * LAMPORTS_PER_SOL,
  })
);
```

## Customization

### Styling

The component uses inline styles for simplicity. You can customize the appearance by modifying the `styles` object in the component:

```javascript
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    // ... other styles
  },
  // ... other style objects
};
```

### Network Configuration

By default, the app connects to Solana's devnet. To use mainnet-beta, update the connection endpoint in both App.js and WalletTransfer.js:

```javascript
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
```

## Error Handling

The component includes built-in error handling for common scenarios:
- Invalid recipient addresses
- Invalid amounts
- Failed transactions
- Wallet connection issues

Errors are displayed to the user in a red error box below the form.

## Best Practices

1. Always validate user input before creating transactions
2. Use appropriate error handling
3. Show clear feedback to users during transactions
4. Test thoroughly on devnet before deploying to mainnet
5. Keep private keys secure and never expose them in the code

## Development Notes

- The app uses Solana's devnet by default for testing
- Transaction fees are paid by the sender
- The Phantom wallet adapter is included by default, but other wallets can be added

## Troubleshooting

Common issues and solutions:

1. Wallet not connecting:
   - Ensure Phantom wallet is installed
   - Check if you're on a supported browser
   - Verify the wallet adapter is properly configured

2. Transaction failing:
   - Verify sufficient SOL balance for transfer and fees
   - Check recipient address format
   - Ensure network connection is stable

3. Network errors:
   - Verify connection endpoint is correct
   - Check network status at status.solana.com

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is MIT licensed.
