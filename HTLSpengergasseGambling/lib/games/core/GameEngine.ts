// Core Game Engine for 2xBDamageToken Gambling Platform

/**
 * Base Game interface that all games must implement
 */
export interface Game {
  id: string;
  name: string;
  type: string;
  description: string;
  minBet: number;
  maxBet: number;
  isActive: boolean;
  imageUrl?: string;

  // Core game methods
  initialize(): void;
  placeBet(userId: string, amount: number, betData: any): Promise<BetResult>;
  getGameState(): any;
  validateBet(amount: number, betData: any): boolean;
}

/**
 * Result of a bet operation
 */
export interface BetResult {
  success: boolean;
  payout: number;
  outcome: string;
  gameData: any;
  verificationHash: string;
}

/**
 * Configuration for a game
 */
export interface GameConfig {
  id: string;
  name: string;
  type: string;
  description: string;
  minBet: number;
  maxBet: number;
  isActive: boolean;
  imageUrl?: string;
  gameSpecificConfig: any;
}

/**
 * Base class for all games
 */
export abstract class BaseGame implements Game {
  id: string;
  name: string;
  type: string;
  description: string;
  minBet: number;
  maxBet: number;
  isActive: boolean;
  imageUrl?: string;

  constructor(config: GameConfig) {
    this.id = config.id;
    this.name = config.name;
    this.type = config.type;
    this.description = config.description;
    this.minBet = config.minBet;
    this.maxBet = config.maxBet;
    this.isActive = config.isActive;
    this.imageUrl = config.imageUrl;
  }

  initialize(): void {
    console.log(`Initializing game: ${this.name}`);
  }

  abstract placeBet(
    userId: string,
    amount: number,
    betData: any
  ): Promise<BetResult>;

  getGameState(): any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      minBet: this.minBet,
      maxBet: this.maxBet,
      isActive: this.isActive,
    };
  }

  validateBet(amount: number, betData: any): boolean {
    // Base validation for all games
    if (amount < this.minBet) {
      console.error(
        `Bet amount ${amount} is less than minimum bet ${this.minBet}`
      );
      return false;
    }

    if (amount > this.maxBet) {
      console.error(
        `Bet amount ${amount} is more than maximum bet ${this.maxBet}`
      );
      return false;
    }

    if (!this.isActive) {
      console.error(`Game ${this.name} is not active`);
      return false;
    }

    return true;
  }

  /**
   * Generate a cryptographic hash for result verification
   * This enables "provably fair" gambling
   */
  protected generateVerificationHash(
    userId: string,
    betData: any,
    outcome: any
  ): string {
    // In a real implementation, this would use a proper cryptographic function
    // For demo purposes, we'll just concatenate and hash the values
    const data = JSON.stringify({
      userId,
      betData,
      outcome,
      timestamp: Date.now(),
      serverSeed: "2xBDamageToken-server-seed", // In reality, this would be a secure random seed
    });

    // Simple hash function for demonstration
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    return hash.toString(16);
  }
}

/**
 * Service for managing and accessing all available games
 */
export class GameService {
  private games: Map<string, Game> = new Map();

  registerGame(game: Game): void {
    this.games.set(game.id, game);
    game.initialize();
    console.log(`Game registered: ${game.name}`);
  }

  getGame(id: string): Game | undefined {
    return this.games.get(id);
  }

  getAllGames(): Game[] {
    return Array.from(this.games.values());
  }

  getGamesByType(type: string): Game[] {
    return this.getAllGames().filter((game) => game.type === type);
  }
}

// Create a singleton instance
export const gameService = new GameService();
