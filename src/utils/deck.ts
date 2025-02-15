export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  value: Value;
}

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.initializeDeck();
    this.shuffle();
  }

  private initializeDeck() {
    const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values: Value[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (const suit of suits) {
      for (const value of values) {
        this.cards.push({ suit, value });
      }
    }
  }

  private shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard(): Card | undefined {
    return this.cards.pop();
  }

  get remainingCards(): number {
    return this.cards.length;
  }
} 
