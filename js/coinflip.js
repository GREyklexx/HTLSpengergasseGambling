export class CoinFlipper {
  constructor() {
    this.coin = document.getElementById("coin");
    this.isFlipping = false;
  }

  async flip() {
    if (this.isFlipping) return null;

    this.isFlipping = true;
    const result = Math.random() < 0.5 ? "heads" : "tails";

    // Reset any previous animation
    this.coin.classList.remove("flip");
    // Trigger reflow to ensure animation plays
    void this.coin.offsetWidth;

    // Add flip class for animation
    this.coin.classList.add("flip");

    // Calculate final rotation based on result
    const rotations = 5; // Number of full rotations
    const finalRotation =
      result === "heads" ? rotations * 360 : rotations * 360 + 180;

    this.coin.style.transform = `rotateY(${finalRotation}deg)`;

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 3000));

    this.isFlipping = false;
    return result;
  }

  reset() {
    this.coin.classList.remove("flip");
    this.coin.style.transform = "rotateY(0)";
    this.isFlipping = false;
  }

  disable() {
    this.isFlipping = true;
  }

  enable() {
    this.isFlipping = false;
  }
}
