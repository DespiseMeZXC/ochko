import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  winner: 'player' | 'dealer' | 'tie' | null;
  onPlayAgain: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, winner, onPlayAgain }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>
          {winner === 'player' && 'Вы выиграли! (x2)'}
          {winner === 'dealer' && 'Дилер выиграл!'}
          {winner === 'tie' && 'Ничья! (возврат ставки)'}
        </h2>
        <button onClick={onPlayAgain}>Сделать новую ставку</button>
      </div>
    </div>
  );
}; 
