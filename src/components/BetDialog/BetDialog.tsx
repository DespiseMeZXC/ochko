import React, { useState } from 'react';
import styles from './BetDialog.module.css';

interface BetDialogProps {
  balance: number;
  onBetPlaced: (amount: number) => boolean;
  onStartNewGame: () => void;
}

export const BetDialog: React.FC<BetDialogProps> = ({ 
  balance, 
  onBetPlaced,
  onStartNewGame 
}) => {
  const [betAmount, setBetAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleBet = () => {
    const amount = Number(betAmount);
    if (isNaN(amount)) {
      setError('Пожалуйста, введите число');
      return;
    }
    
    if (amount <= 0) {
      setError('Ставка должна быть больше 0');
      return;
    }
    
    if (amount > balance) {
      setError('Недостаточно средств');
      return;
    }

    if (onBetPlaced(amount)) {
      setError('');
      setBetAmount('');
    }
  };

  return (
    <div className={styles.dialog}>
      {balance <= 0 ? (
        <div className={styles.noBalance}>
          <h2>Игра окончена</h2>
          <p>У вас закончились деньги</p>
          <button onClick={onStartNewGame}>Начать новую игру</button>
        </div>
      ) : (
        <>
          <h2>Сделайте ставку</h2>
          <p>Ваш баланс: {balance}</p>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="Введите сумму ставки"
            min="1"
            max={balance}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button onClick={handleBet}>Сделать ставку</button>
        </>
      )}
    </div>
  );
};
