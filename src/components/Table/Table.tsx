import { Card as CardComponent } from '../Card/Card';
import { Card } from '../../utils/deck';
import { motion } from 'framer-motion';

interface TableProps {
  dealerScore: number;
  playerScore: number;
  dealerCards: Card[];
  playerCards: Card[];
  isBust: boolean;
  isStand: boolean;
  winner: 'player' | 'dealer' | 'tie' | null;
  dealingCards: boolean;
  lastPlayerCardIndex: number;
  lastDealerCardIndex: number;
  onDraw: () => void;
  onStand: () => void;
  gameOver: boolean;
}

export const Table: React.FC<TableProps> = ({
  dealerScore,
  playerScore,
  dealerCards,
  playerCards,
  isBust,
  isStand,
  winner,
  dealingCards,
  lastPlayerCardIndex,
  lastDealerCardIndex,
  onDraw,
  onStand,
  gameOver
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '80px',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      minWidth: '800px',
      margin: '0 auto',
      padding: '40px',
      backgroundColor: '#277714',
      borderRadius: '10px',
      minHeight: '80vh',
      position: 'relative'
    }}>
      <div style={{ 
        textAlign: 'center',
        width: '100%'
      }}>
        <div style={{ 
          color: 'white', 
          marginBottom: '20px',
          fontSize: '24px'
        }}>
          Дилер: {dealerScore}
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px',
          flexWrap: 'wrap',
          padding: '0 20px',
          maxWidth: '100%',
          margin: '0 auto'
        }}>
          {dealerCards.map((card, index) => (
            <div style={{ flex: '0 0 auto' }}>
              <CardComponent 
                key={`dealer-${card.suit}-${card.value}-${index}`}
                suit={card.suit}
                value={card.value}
                isFlipped={!isStand && index === 1}
                isDealing={dealingCards}
                isDrawn={index === lastDealerCardIndex}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center',
        width: '100%'
      }}>
        <div style={{ 
          color: 'white', 
          marginBottom: '20px',
          fontSize: '24px'
        }}>
          Игрок: {playerScore}
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px',
          flexWrap: 'wrap',
          padding: '0 20px',
          maxWidth: '100%',
          margin: '0 auto'
        }}>
          {playerCards.map((card, index) => (
            <div style={{ flex: '0 0 auto' }}>
              <CardComponent 
                key={`player-${card.suit}-${card.value}-${index}`}
                suit={card.suit}
                value={card.value}
                isDealing={dealingCards}
                isDrawn={index === lastPlayerCardIndex}
              />
            </div>
          ))}
        </div>
        <div style={{ 
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center'
        }}>
          <button 
            onClick={onDraw}
            disabled={isBust || isStand || gameOver}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: (isBust || isStand || gameOver) ? 'not-allowed' : 'pointer',
              opacity: (isBust || isStand || gameOver) ? 0.5 : 1,
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            Взять карту
          </button>
          <button 
            onClick={onStand}
            disabled={isBust || isStand || gameOver}
            style={{ 
              padding: '10px 20px',
              fontSize: '16px',
              cursor: (isBust || isStand || gameOver) ? 'not-allowed' : 'pointer',
              opacity: (isBust || isStand || gameOver) ? 0.5 : 1,
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            Хватит
          </button>
        </div>
      </div>
    </div>
  );
};
