import { Card } from './deck';

const cardValues: Record<string, number> = {
  'J': 2,  // Валет
  'Q': 3,  // Дама
  'K': 4,  // Король
  'A': 11  // Туз
};

export const calculateScore = (cards: Card[]): number => {
  let score = 0;

  cards.forEach(card => {
    if (cardValues[card.value]) {
      // Если это картинка или туз
      score += cardValues[card.value];
    } else {
      // Если это числовая карта
      score += parseInt(card.value);
    }
  });

  return score;
}; 
