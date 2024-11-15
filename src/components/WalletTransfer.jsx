import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram, clusterApiUrl } from '@solana/web3.js';

const WalletTransfer = () => {
  const { publicKey, sendTransaction, connected } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const connection = new Connection(clusterApiUrl("devnet"));

  const handleTransfer = async () => {
    try {
      setStatus('Processing...');
      setError('');

      if (!publicKey) {
        throw new Error('Wallet not connected');
      }

      let recipientPubKey;
      try {
        recipientPubKey = new PublicKey(recipient);
      } catch {
        throw new Error('Invalid recipient address');
      }

      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Invalid amount');
      }
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: parsedAmount * LAMPORTS_PER_SOL,
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);
      
      await connection.confirmTransaction(signature);
      
      setStatus('Transfer successful!');
      setAmount('');
      setRecipient('');
    } catch (err) {
      setError(err.message);
      setStatus('');
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      marginBottom: '8px',
    },
    description: {
      color: '#666',
      marginBottom: '20px',
    },
    walletButton: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      marginBottom: '12px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#512DA8',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '12px',
    },
    disabledButton: {
      backgroundColor: '#9e9e9e',
      cursor: 'not-allowed',
    },
    status: {
      padding: '12px',
      borderRadius: '4px',
      backgroundColor: '#e3f2fd',
      marginBottom: '12px',
    },
    error: {
      padding: '12px',
      borderRadius: '4px',
      backgroundColor: '#ffebee',
      color: '#c62828',
      marginBottom: '12px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Solana Transfer</h1>
        <p style={styles.description}>Send SOL to another wallet</p>
      </div>

      <div style={styles.walletButton}>
        <WalletMultiButton />
      </div>

      {connected && (
        <>
          <input
            style={styles.input}
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Amount (SOL)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.001"
          />

          <button
            style={{
              ...styles.button,
              ...((!recipient || !amount) && styles.disabledButton),
            }}
            onClick={handleTransfer}
            disabled={!recipient || !amount}
          >
            Send SOL
          </button>
        </>
      )}

      {status && <div style={styles.status}>{status}</div>}
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default WalletTransfer;