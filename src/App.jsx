import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import WalletTransfer from './components/WalletTransfer';

// Create array of supported wallet adapters
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

export default App