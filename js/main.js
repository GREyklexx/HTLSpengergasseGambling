import { TokenManager } from "./tokenManager.js";
import { CoinFlipper } from "./coinflip.js";

class Game {
  constructor() {
    this.tokenManager = new TokenManager();
    this.coinFlipper = new CoinFlipper();

    this.betInput = document.getElementById("betInput");
    this.betHeadsButton = document.getElementById("betHeads");
    this.betTailsButton = document.getElementById("betTails");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.betHeadsButton.addEventListener("click", () => this.placeBet("heads"));
    this.betTailsButton.addEventListener("click", () => this.placeBet("tails"));

    // Validate bet input
    this.betInput.addEventListener("input", () => {
      const betAmount = parseInt(this.betInput.value);
      const isValidBet = this.tokenManager.canPlaceBet(betAmount);

      this.betHeadsButton.disabled = !isValidBet;
      this.betTailsButton.disabled = !isValidBet;
    });
  }

  async placeBet(choice) {
    const betAmount = parseInt(this.betInput.value);

    if (!this.tokenManager.canPlaceBet(betAmount)) {
      alert("Invalid bet amount!");
      return;
    }

    // Disable buttons during flip
    this.betHeadsButton.disabled = true;
    this.betTailsButton.disabled = true;
    this.betInput.disabled = true;

    try {
      // Place bet and flip coin
      this.tokenManager.placeBet(betAmount);
      const result = await this.coinFlipper.flip();

      // Process result
      if (result === choice) {
        this.tokenManager.addWinnings(betAmount);
        setTimeout(() => alert("You won!"), 500);
      } else {
        setTimeout(() => alert("You lost!"), 500);
      }
    } catch (error) {
      console.error("Error during bet:", error);
      alert("An error occurred while placing your bet.");
    } finally {
      // Re-enable controls
      this.betInput.disabled = false;
      const currentBet = parseInt(this.betInput.value);
      const canBet = this.tokenManager.canPlaceBet(currentBet);
      this.betHeadsButton.disabled = !canBet;
      this.betTailsButton.disabled = !canBet;
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Game();
});
