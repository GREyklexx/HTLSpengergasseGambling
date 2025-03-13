import { BaseGame, BetResult, GameConfig } from "../core/GameEngine.ts";

/**
 * Configuration specific to Slots game
 */
export interface SlotsConfig {
  reels: number;
  rows: number;
  symbols: SlotSymbol[];
  paylines: Payline[];
  specialFeatures: SpecialFeature[];
}

/**
 * Interface for a slot machine symbol
 */
export interface SlotSymbol {
  id: string;
  name: string;
  value: number; // Base payout multiplier
  image: string;
  isSpecial: boolean; // Whether this is a special symbol (wild, scatter, etc.)
}

/**
 * Interface for a payline in the slot machine
 */
export interface Payline {
  id: number;
  positions: number[][]; // Array of [reel, row] positions that make up this payline
  name: string;
}

/**
 * Enum for special features in the slots game
 */
export enum SpecialFeature {
  WILD = "wild",
  SCATTER = "scatter",
  FREE_SPINS = "freeSpins",
  MULTIPLIER = "multiplier",
  BONUS_GAME = "bonusGame",
}

/**
 * Interface for bet data specific to slots
 */
export interface SlotsBetData {
  lines: number; // Number of paylines to bet on
  betPerLine: number; // Bet amount per payline
}

/**
 * Class implementing the Slots game
 */
export class SlotsGame extends BaseGame {
  private config: SlotsConfig;

  constructor(baseConfig: GameConfig, slotsConfig: SlotsConfig) {
    super(baseConfig);
    this.config = slotsConfig;
  }

  override initialize(): void {
    super.initialize();
    console.log(
      `Initialized Slots game with ${this.config.reels} reels and ${this.config.symbols.length} symbols`
    );
  }

  override validateBet(amount: number, betData: any): boolean {
    if (!super.validateBet(amount, betData)) {
      return false;
    }

    const slotsBetData = betData as SlotsBetData;

    if (!slotsBetData.lines || slotsBetData.lines <= 0) {
      console.error("Invalid number of lines");
      return false;
    }

    if (!slotsBetData.betPerLine || slotsBetData.betPerLine <= 0) {
      console.error("Invalid bet per line");
      return false;
    }

    // Ensure total bet matches
    if (slotsBetData.lines * slotsBetData.betPerLine !== amount) {
      console.error("Total bet amount doesn't match lines * betPerLine");
      return false;
    }

    return true;
  }

  async placeBet(
    userId: string,
    amount: number,
    betData: SlotsBetData
  ): Promise<BetResult> {
    if (!this.validateBet(amount, betData)) {
      return {
        success: false,
        payout: 0,
        outcome: "Invalid bet",
        gameData: {},
        verificationHash: "",
      };
    }

    // Generate the reels outcome
    const outcome = this.generateReelsOutcome();

    // Calculate winnings
    const winData = this.calculateWinnings(outcome, betData);

    // Generate verification hash
    const verificationHash = this.generateVerificationHash(
      userId,
      betData,
      outcome
    );

    return {
      success: true,
      payout: winData.totalWin,
      outcome: winData.totalWin > 0 ? "win" : "loss",
      gameData: {
        reels: outcome,
        winningLines: winData.winningLines,
        specialFeatures: winData.specialFeatures,
      },
      verificationHash,
    };
  }

  /**
   * Generate random outcome for the reels
   */
  private generateReelsOutcome(): string[][] {
    const { reels, rows, symbols } = this.config;
    const outcome: string[][] = [];

    for (let r = 0; r < reels; r++) {
      const reel: string[] = [];
      for (let row = 0; row < rows; row++) {
        // Randomly select a symbol
        const randomIndex = Math.floor(Math.random() * symbols.length);
        reel.push(symbols[randomIndex].id);
      }
      outcome.push(reel);
    }

    return outcome;
  }

  /**
   * Calculate winnings based on the outcome and bet data
   */
  private calculateWinnings(
    reels: string[][],
    betData: SlotsBetData
  ): {
    totalWin: number;
    winningLines: { line: number; win: number; symbols: string[] }[];
    specialFeatures: SpecialFeature[];
  } {
    const { paylines, symbols } = this.config;
    let totalWin = 0;
    const winningLines: { line: number; win: number; symbols: string[] }[] = [];
    const specialFeatures: SpecialFeature[] = [];

    // Check each active payline for wins
    for (let i = 0; i < Math.min(betData.lines, paylines.length); i++) {
      const payline = paylines[i];
      const lineSymbols: string[] = [];

      // Get symbols on this payline
      for (const [reelIndex, rowIndex] of payline.positions) {
        if (reelIndex < reels.length && rowIndex < reels[reelIndex].length) {
          lineSymbols.push(reels[reelIndex][rowIndex]);
        }
      }

      // Check for wins
      const { win, feature } = this.checkLineWin(
        lineSymbols,
        betData.betPerLine
      );

      if (win > 0) {
        totalWin += win;
        winningLines.push({
          line: payline.id,
          win,
          symbols: lineSymbols,
        });
      }

      if (feature) {
        specialFeatures.push(feature);
      }
    }

    // Check for scatter symbols (these win regardless of paylines)
    const scatterWin = this.checkScatterWin(reels, betData.betPerLine);
    if (scatterWin.win > 0) {
      totalWin += scatterWin.win;
      if (scatterWin.feature) {
        specialFeatures.push(scatterWin.feature);
      }
    }

    return {
      totalWin,
      winningLines,
      specialFeatures,
    };
  }

  /**
   * Check if a line of symbols results in a win
   */
  private checkLineWin(
    lineSymbols: string[],
    betPerLine: number
  ): { win: number; feature?: SpecialFeature } {
    const { symbols } = this.config;

    // Find symbol definitions for the line
    const symbolObjects = lineSymbols.map((id) =>
      symbols.find((s) => s.id === id)
    );

    // Basic winning logic: 3 or more of the same symbol in a row from the left
    let maxConsecutive = 0;
    let currentConsecutive = 1;
    let currentSymbol = symbolObjects[0];

    for (let i = 1; i < symbolObjects.length; i++) {
      const symbol = symbolObjects[i];

      // Wild symbols can substitute for the current symbol
      const isWild = symbol?.isSpecial && symbol?.name === "Wild";
      const matches = symbol === currentSymbol || isWild;

      if (matches) {
        currentConsecutive++;
      } else {
        if (currentConsecutive > maxConsecutive) {
          maxConsecutive = currentConsecutive;
        }
        currentConsecutive = 1;
        currentSymbol = symbol;
      }
    }

    if (currentConsecutive > maxConsecutive) {
      maxConsecutive = currentConsecutive;
    }

    // Calculate win based on consecutive symbols
    let win = 0;
    let feature: SpecialFeature | undefined;

    if (maxConsecutive >= 3 && currentSymbol) {
      win = currentSymbol.value * betPerLine * (maxConsecutive - 2); // Scale win by number of matching symbols

      // Check for special features
      if (currentSymbol.isSpecial) {
        if (currentSymbol.name === "Wild" && maxConsecutive >= 5) {
          feature = SpecialFeature.MULTIPLIER;
        } else if (currentSymbol.name === "Bonus" && maxConsecutive >= 3) {
          feature = SpecialFeature.BONUS_GAME;
        }
      }
    }

    return { win, feature };
  }

  /**
   * Check for scattered symbols that win regardless of paylines
   */
  private checkScatterWin(
    reels: string[][],
    betPerLine: number
  ): { win: number; feature?: SpecialFeature } {
    const { symbols } = this.config;

    // Count scatter symbols
    let scatterCount = 0;
    const scatterSymbol = symbols.find(
      (s) => s.isSpecial && s.name === "Scatter"
    );

    if (!scatterSymbol) {
      return { win: 0 };
    }

    // Count scatter symbols in the outcome
    for (const reel of reels) {
      for (const symbolId of reel) {
        if (symbolId === scatterSymbol.id) {
          scatterCount++;
        }
      }
    }

    let win = 0;
    let feature: SpecialFeature | undefined;

    // 3 or more scatters trigger win and free spins
    if (scatterCount >= 3) {
      win = scatterSymbol.value * betPerLine * scatterCount;
      feature = SpecialFeature.FREE_SPINS;
    }

    return { win, feature };
  }

  /**
   * Create default slots configuration for quick setup
   */
  static createDefaultConfig(): SlotsConfig {
    return {
      reels: 5,
      rows: 3,
      symbols: [
        { id: "A", name: "Ace", value: 5, image: "ace.png", isSpecial: false },
        {
          id: "K",
          name: "King",
          value: 4,
          image: "king.png",
          isSpecial: false,
        },
        {
          id: "Q",
          name: "Queen",
          value: 3,
          image: "queen.png",
          isSpecial: false,
        },
        {
          id: "J",
          name: "Jack",
          value: 2,
          image: "jack.png",
          isSpecial: false,
        },
        { id: "10", name: "Ten", value: 1, image: "ten.png", isSpecial: false },
        {
          id: "W",
          name: "Wild",
          value: 10,
          image: "wild.png",
          isSpecial: true,
        },
        {
          id: "S",
          name: "Scatter",
          value: 15,
          image: "scatter.png",
          isSpecial: true,
        },
        {
          id: "B",
          name: "Bonus",
          value: 20,
          image: "bonus.png",
          isSpecial: true,
        },
      ],
      paylines: [
        // Horizontal lines
        {
          id: 1,
          positions: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
          ],
          name: "Top",
        },
        {
          id: 2,
          positions: [
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
          ],
          name: "Middle",
        },
        {
          id: 3,
          positions: [
            [0, 2],
            [1, 2],
            [2, 2],
            [3, 2],
            [4, 2],
          ],
          name: "Bottom",
        },
        // V-shaped lines
        {
          id: 4,
          positions: [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 1],
            [4, 0],
          ],
          name: "V-Shape",
        },
        {
          id: 5,
          positions: [
            [0, 2],
            [1, 1],
            [2, 0],
            [3, 1],
            [4, 2],
          ],
          name: "Inverted V",
        },
        // Zigzag lines
        {
          id: 6,
          positions: [
            [0, 0],
            [1, 1],
            [2, 0],
            [3, 1],
            [4, 0],
          ],
          name: "Zigzag Top",
        },
        {
          id: 7,
          positions: [
            [0, 2],
            [1, 1],
            [2, 2],
            [3, 1],
            [4, 2],
          ],
          name: "Zigzag Bottom",
        },
        // Diagonal lines
        {
          id: 8,
          positions: [
            [0, 0],
            [1, 0],
            [2, 1],
            [3, 2],
            [4, 2],
          ],
          name: "Diagonal TL-BR",
        },
        {
          id: 9,
          positions: [
            [0, 2],
            [1, 2],
            [2, 1],
            [3, 0],
            [4, 0],
          ],
          name: "Diagonal BL-TR",
        },
        // Complex patterns
        {
          id: 10,
          positions: [
            [0, 1],
            [1, 0],
            [2, 1],
            [3, 0],
            [4, 1],
          ],
          name: "Steps Up",
        },
      ],
      specialFeatures: [
        SpecialFeature.WILD,
        SpecialFeature.SCATTER,
        SpecialFeature.FREE_SPINS,
        SpecialFeature.MULTIPLIER,
        SpecialFeature.BONUS_GAME,
      ],
    };
  }
}
