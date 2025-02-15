import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface CardProps {
  suit: Suit;
  value: Value;
  isFlipped?: boolean;
  isDealing?: boolean;
  isDrawn?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  suit, 
  value, 
  isFlipped = false,
  isDealing = false,
  isDrawn = false
}) => {
  const [shouldFlip, setShouldFlip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const suitSymbols: Record<Suit, string> = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };

  const isRed = suit === 'hearts' || suit === 'diamonds';
  const suitSymbol = suitSymbols[suit];

  useEffect(() => {
    // Задержка перед показом карты
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Задержка перед переворотом
    const flipTimeout = setTimeout(() => {
      setShouldFlip(!isFlipped);
    }, 500);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(flipTimeout);
    };
  }, [isFlipped]);

  const cardClasses = [
    styles.card,
    shouldFlip ? styles.flipped : '',
    isDealing ? styles.dealAnimation : '',
    isDrawn ? styles.drawAnimation : '',
  ].filter(Boolean).join(' ');

  if (!isVisible) return null;

  return (
    <div className={cardClasses}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div style={{ 
            alignSelf: 'flex-start', 
            fontSize: '24px',
            color: isRed ? 'red' : 'black'
          }}>
            {value}
            <span style={{ marginLeft: '4px' }}>{suitSymbol}</span>
          </div>
          
          <div style={{ 
            fontSize: '48px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: isRed ? 'red' : 'black'
          }}>
            {suitSymbol}
          </div>
          
          <div style={{ 
            fontSize: '24px',
            alignSelf: 'flex-end',
            transform: 'rotate(180deg)',
            color: isRed ? 'red' : 'black'
          }}>
            {value}
            <span style={{ marginLeft: '4px' }}>{suitSymbol}</span>
          </div>
        </div>
        <div className={styles.cardBack} />
      </div>
    </div>
  );
};
