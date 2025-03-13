export class TokenManager {
  constructor(initialBalance = 1000) {
    this.balance = initialBalance;
    this.balanceElement = document.getElementById("balance");
    this.updateDisplay();
  }

  updateDisplay() {
    this.balanceElement.textContent = this.balance;
  }

  canPlaceBet(amount) {
    return amount <= this.balance && amount > 0;
  }

  placeBet(amount) {
    if (!this.canPlaceBet(amount)) {
      throw new Error("Invalid bet amount");
    }
    this.balance -= amount;
    this.updateDisplay();
  }

  addWinnings(amount) {
    this.balance += amount * 2; // Double the bet for a win
    this.updateDisplay();
  }

  getBalance() {
    return this.balance;
  }
}
