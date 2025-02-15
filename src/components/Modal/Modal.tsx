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
          {winner === 'player' && 'Вы выиграли!'}
          {winner === 'dealer' && 'Дилер выиграл!'}
          {winner === 'tie' && 'Ничья!'}
        </h2>
        <button onClick={onPlayAgain}>Играть снова</button>
      </div>
    </div>
  );
}; 
