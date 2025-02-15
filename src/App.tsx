import { useState, useEffect } from 'react'
import './App.css'
import { Table } from './components/Table/Table'
import { Deck, Card } from './utils/deck'
import { calculateScore } from './utils/calculateScore'
import { Modal } from './components/Modal/Modal'

function App() {
  const [deck, setDeck] = useState(() => new Deck());
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [isBust, setIsBust] = useState(false);
  const [isStand, setIsStand] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'dealer' | 'tie' | null>(null);
  const [dealingCards, setDealingCards] = useState<boolean>(true);
  const [lastPlayerCardIndex, setLastPlayerCardIndex] = useState<number>(-1);
  const [lastDealerCardIndex, setLastDealerCardIndex] = useState<number>(-1);

  useEffect(() => {
    initialDeal();
  }, []);

  useEffect(() => {
    const score = calculateScore(playerCards);
    setPlayerScore(score);
  }, [playerCards]);

  useEffect(() => {
    if (!isStand && dealerCards.length > 0) {
      setDealerScore(calculateScore([dealerCards[0]]));
    } else {
      setDealerScore(calculateScore(dealerCards));
    }
  }, [dealerCards, isStand]);

  const initialDeal = () => {
    const newDeck = new Deck();
    setDeck(newDeck);
    
    setIsBust(false);
    setIsStand(false);
    setGameOver(false);
    setWinner(null);
    setDealingCards(true);
    setLastPlayerCardIndex(-1);
    setLastDealerCardIndex(-1);
    
    const newPlayerCards: Card[] = [];
    const newDealerCards: Card[] = [];

    for (let i = 0; i < 2; i++) {
      const playerCard = newDeck.drawCard();
      const dealerCard = newDeck.drawCard();
      
      if (playerCard) newPlayerCards.push(playerCard);
      if (dealerCard) newDealerCards.push(dealerCard);
    }

    setPlayerCards(newPlayerCards);
    setDealerCards(newDealerCards);
    
    setTimeout(() => {
      setDealingCards(false);
    }, 1500);
  };

  const drawCard = () => {
    if (isBust || isStand) return;
    
    const card = deck.drawCard();
    if (card) {
      setLastPlayerCardIndex(playerCards.length);
      setPlayerCards(prev => [...prev, card]);
      
      setTimeout(() => {
        setLastPlayerCardIndex(-1);
        const newScore = calculateScore([...playerCards, card]);
        if (newScore > 21) {
          setIsBust(true);
          endGame('dealer');
        }
      }, 800);
    }
  };

  const dealerPlay = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    let currentDealerScore = calculateScore(dealerCards);
    let currentDealerCards = [...dealerCards];

    await new Promise(resolve => setTimeout(resolve, 1000));

    while (currentDealerScore < 17) {
      const card = deck.drawCard();
      if (card) {
        setLastDealerCardIndex(currentDealerCards.length);
        currentDealerCards = [...currentDealerCards, card];
        setDealerCards(currentDealerCards);
        currentDealerScore = calculateScore(currentDealerCards);

        await new Promise(resolve => setTimeout(resolve, 800));
        setLastDealerCardIndex(-1);

        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    determineWinner(playerScore, currentDealerScore);
  };

  const determineWinner = (playerScore: number, dealerScore: number) => {
    if (playerScore > 21) {
      endGame('dealer');
    } else if (dealerScore > 21) {
      endGame('player');
    } else if (playerScore > dealerScore) {
      endGame('player');
    } else if (dealerScore > playerScore) {
      endGame('dealer');
    } else {
      endGame('tie');
    }
  };

  const endGame = (result: 'player' | 'dealer' | 'tie') => {
    setWinner(result);
    setGameOver(true);
  };

  const stand = () => {
    setIsStand(true);
    setTimeout(() => {
      dealerPlay();
    }, 500);
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      padding: '20px'
    }}>
      <Table 
        dealerScore={dealerScore} 
        playerScore={playerScore}
        dealerCards={dealerCards}
        playerCards={playerCards}
        isBust={isBust}
        isStand={isStand}
        winner={winner}
        dealingCards={dealingCards}
        lastPlayerCardIndex={lastPlayerCardIndex}
        lastDealerCardIndex={lastDealerCardIndex}
        onDraw={drawCard}
        onStand={stand}
        gameOver={gameOver}
      />
      <Modal 
        isOpen={gameOver} 
        winner={winner} 
        onPlayAgain={initialDeal}
      />
    </div>
  );
}

export default App
