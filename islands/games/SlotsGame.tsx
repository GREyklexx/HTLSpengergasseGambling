import { useEffect, useState } from "preact/hooks";
import { SpecialFeature } from "../../lib/games/slots/SlotsGame.ts";

interface SlotsGameProps {
  userId?: string;
  initialBalance: number;
  onWin?: (amount: number) => void;
  onLose?: (amount: number) => void;
}

export default function SlotsGame({
  userId = "demo-user",
  initialBalance = 1000,
  onWin,
  onLose,
}: SlotsGameProps) {
  // Game state
  const [balance, setBalance] = useState(initialBalance);
  const [betAmount, setBetAmount] = useState(10);
  const [lines, setLines] = useState(5);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState<string[][]>([]);
  const [winAmount, setWinAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [activeFeatures, setActiveFeatures] = useState<SpecialFeature[]>([]);
  const [winningLines, setWinningLines] = useState<number[]>([]);

  // Symbol mapping for display
  const symbolMap: Record<string, { emoji: string; color: string }> = {
    A: { emoji: "🅰️", color: "text-red-500" },
    K: { emoji: "🎰", color: "text-yellow-500" },
    Q: { emoji: "👑", color: "text-purple-500" },
    J: { emoji: "💎", color: "text-blue-500" },
    "10": { emoji: "🔟", color: "text-green-500" },
    W: { emoji: "⭐", color: "text-accent-blue" },
    S: { emoji: "🎁", color: "text-accent-purple" },
    B: { emoji: "💰", color: "text-accent-green" },
  };

  // Initialize reels
  useEffect(() => {
    // Create empty reels on initial load
    const initialReels = Array(5)
      .fill(null)
      .map(() =>
        Array(3)
          .fill(null)
          .map(
            () =>
              Object.keys(symbolMap)[
                Math.floor(Math.random() * Object.keys(symbolMap).length)
              ]
          )
      );
    setReels(initialReels);
  }, []);

  // Calculate bet per line
  const betPerLine = betAmount / lines;

  // Handle spin button click
  const handleSpin = async () => {
    if (spinning) return;
    if (balance < betAmount) {
      setMessage("Insufficient balance!");
      return;
    }

    // Reset previous spin results
    setWinAmount(0);
    setMessage("");
    setActiveFeatures([]);
    setWinningLines([]);

    // Update balance
    setBalance((prev) => prev - betAmount);

    // Start spinning animation
    setSpinning(true);

    // Simulate backend call - in a real implementation this would call the backend API
    setTimeout(async () => {
      const result = await simulateBet(userId, betAmount, {
        lines,
        betPerLine,
      });

      // Update reels with the result
      setReels(result.gameData.reels);

      // Handle win or loss
      if (result.success && result.payout > 0) {
        setWinAmount(result.payout);
        setBalance((prev) => prev + result.payout);
        setMessage(`You won ${result.payout} tokens!`);
        setWinningLines(result.gameData.winningLines.map((wl: any) => wl.line));
        setActiveFeatures(result.gameData.specialFeatures || []);

        if (onWin) onWin(result.payout);
      } else {
        setMessage("Better luck next time!");
        if (onLose) onLose(betAmount);
      }

      // End spinning animation
      setSpinning(false);
    }, 1500); // Spinning animation duration
  };

  // Simulate a bet to the backend - this would be replaced with a real API call
  const simulateBet = async (userId: string, amount: number, betData: any) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Randomly determine win or loss
    const win = Math.random() > 0.7; // 30% chance of winning

    // Generate random reels outcome
    const outcome = Array(5)
      .fill(null)
      .map(() =>
        Array(3)
          .fill(null)
          .map(
            () =>
              Object.keys(symbolMap)[
                Math.floor(Math.random() * Object.keys(symbolMap).length)
              ]
          )
      );

    // For demo purposes, if it's a win, make sure there are some matching symbols
    if (win) {
      // Add some matching symbols to create a win
      const winSymbol =
        Object.keys(symbolMap)[
          Math.floor(Math.random() * Object.keys(symbolMap).length)
        ];

      // Create a winning line (middle row)
      for (let i = 0; i < 3; i++) {
        outcome[i][1] = winSymbol;
      }

      // Sometimes add a special feature
      const hasSpecialFeature = Math.random() > 0.5;
      const specialFeatures = hasSpecialFeature
        ? [
            Math.random() > 0.5
              ? SpecialFeature.FREE_SPINS
              : SpecialFeature.MULTIPLIER,
          ]
        : [];

      // Calculate payout - in reality this would come from the backend
      const winAmount =
        betData.betPerLine * (10 + Math.floor(Math.random() * 20));

      return {
        success: true,
        payout: winAmount,
        outcome: "win",
        gameData: {
          reels: outcome,
          winningLines: [
            {
              line: 2,
              win: winAmount,
              symbols: [winSymbol, winSymbol, winSymbol],
            },
          ],
          specialFeatures,
        },
        verificationHash: "demo-hash",
      };
    }

    // Loss outcome
    return {
      success: true,
      payout: 0,
      outcome: "loss",
      gameData: {
        reels: outcome,
        winningLines: [],
        specialFeatures: [],
      },
      verificationHash: "demo-hash",
    };
  };

  // Determine if a symbol is on a winning line
  const isWinningSymbol = (reelIndex: number, rowIndex: number) => {
    // For simplicity in this demo, just highlight the middle row if it's winning
    if (winningLines.includes(2) && rowIndex === 1 && reelIndex < 3) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-bg-secondary rounded-lg shadow-xl p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg">
          <span className="text-text-secondary">Balance:</span>
          <span className="font-bold ml-2 text-accent-green">
            {balance} 2XBD
          </span>
        </div>
        <div className="text-lg">
          <span className="text-text-secondary">Win:</span>
          <span
            className={`font-bold ml-2 ${
              winAmount > 0
                ? "text-accent-blue animate-pulse"
                : "text-text-secondary"
            }`}
          >
            {winAmount} 2XBD
          </span>
        </div>
      </div>

      {/* Slot Machine */}
      <div className="bg-bg-primary rounded-lg p-4 border-2 border-slots-primary mb-6">
        {/* Reels */}
        <div
          className={`grid grid-cols-5 gap-2 mb-4 transition-all duration-300 ${
            spinning ? "blur-sm" : ""
          }`}
        >
          {reels.map((reel, reelIndex) => (
            <div
              key={reelIndex}
              className="bg-gray-800 rounded-md overflow-hidden"
            >
              {reel.map((symbol, rowIndex) => (
                <div
                  key={`${reelIndex}-${rowIndex}`}
                  className={`flex items-center justify-center h-20 text-4xl 
                    ${
                      isWinningSymbol(reelIndex, rowIndex)
                        ? "bg-slots-primary bg-opacity-30 animate-pulse"
                        : ""
                    }
                    ${spinning ? "slots-reel" : ""}`}
                >
                  <span className={symbolMap[symbol]?.color || "text-white"}>
                    {symbolMap[symbol]?.emoji || "🎯"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="h-8 text-center font-bold">
          {message && (
            <p
              className={`text-lg ${
                winAmount > 0 ? "text-accent-green" : "text-text-secondary"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Special Features */}
        {activeFeatures.length > 0 && (
          <div className="text-center mb-2">
            {activeFeatures.map((feature, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 rounded-full bg-accent-purple text-white text-sm mx-1 animate-pulse"
              >
                {feature === SpecialFeature.FREE_SPINS
                  ? "🎡 Free Spins!"
                  : feature === SpecialFeature.MULTIPLIER
                  ? "✨ Multiplier!"
                  : feature === SpecialFeature.BONUS_GAME
                  ? "🎁 Bonus Game!"
                  : feature}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-text-secondary mb-1">Bet Amount</label>
          <div className="flex items-center">
            <button
              onClick={() => setBetAmount((prev) => Math.max(5, prev - 5))}
              disabled={spinning}
              className="px-3 py-1 bg-gray-700 rounded-l-md hover:bg-gray-600 disabled:opacity-50"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-800 text-white">
              {betAmount}
            </span>
            <button
              onClick={() => setBetAmount((prev) => Math.min(100, prev + 5))}
              disabled={spinning}
              className="px-3 py-1 bg-gray-700 rounded-r-md hover:bg-gray-600 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-text-secondary mb-1">Paylines</label>
          <div className="flex items-center">
            <button
              onClick={() => setLines((prev) => Math.max(1, prev - 1))}
              disabled={spinning}
              className="px-3 py-1 bg-gray-700 rounded-l-md hover:bg-gray-600 disabled:opacity-50"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-800 text-white">{lines}</span>
            <button
              onClick={() => setLines((prev) => Math.min(10, prev + 1))}
              disabled={spinning}
              className="px-3 py-1 bg-gray-700 rounded-r-md hover:bg-gray-600 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-text-secondary mb-4">
        <p>
          Betting {betAmount} tokens on {lines} lines ({betPerLine.toFixed(2)}{" "}
          per line)
        </p>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={spinning || balance < betAmount}
        className={`w-full py-4 rounded-lg text-xl font-bold transition-all ${
          spinning
            ? "bg-gray-600 cursor-not-allowed"
            : balance < betAmount
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-slots-primary hover:bg-opacity-80"
        }`}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>

      {/* Paylines Info */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Paylines</h3>
        <div className="grid grid-cols-5 gap-2 text-xs text-text-secondary">
          <div className="text-center">
            Line 1<br />
            Top Row
          </div>
          <div className="text-center">
            Line 2<br />
            Middle Row
          </div>
          <div className="text-center">
            Line 3<br />
            Bottom Row
          </div>
          <div className="text-center">
            Line 4<br />V Shape
          </div>
          <div className="text-center">
            Line 5<br />
            Inverted V
          </div>
        </div>
      </div>
    </div>
  );
}
