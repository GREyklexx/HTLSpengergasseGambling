import { Head } from "$fresh/runtime.ts";
import { BaseLayout } from "../../components/layout/BaseLayout.tsx";
import SlotsGame from "../../islands/games/SlotsGame.tsx";

export default function SlotsPage() {
  return (
    <BaseLayout title="Slots | 2xBDamageToken Gambling">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-display mb-4 text-slots-primary">
            Advanced Slots
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Experience our high-tech slots with stunning visuals, multiple
            paylines, and special features. Win big with free spins,
            multipliers, and bonus games!
          </p>
        </div>

        <SlotsGame initialBalance={1000} />

        <div className="mt-12 bg-bg-secondary rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold font-display mb-4">How to Play</h2>
          <div className="space-y-4 text-text-secondary">
            <p>
              <span className="font-bold text-slots-primary">1.</span> Adjust
              your bet amount using the + and - buttons
            </p>
            <p>
              <span className="font-bold text-slots-primary">2.</span> Select
              the number of paylines you want to play (more lines = more chances
              to win)
            </p>
            <p>
              <span className="font-bold text-slots-primary">3.</span> Click the
              SPIN button to start the game
            </p>
            <p>
              <span className="font-bold text-slots-primary">4.</span> Match 3
              or more symbols on a payline to win
            </p>
            <p>
              <span className="font-bold text-slots-primary">5.</span> Special
              symbols can trigger bonus features:
            </p>
            <ul className="list-disc pl-8 mt-2 space-y-2">
              <li>
                <span className="text-accent-blue">⭐ Wild</span> - Substitutes
                for any other symbol
              </li>
              <li>
                <span className="text-accent-purple">🎁 Scatter</span> - Grants
                free spins regardless of position
              </li>
              <li>
                <span className="text-accent-green">💰 Bonus</span> - Triggers
                special bonus games
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-bg-secondary rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold font-display mb-4">Paylines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Standard Lines</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <span className="font-bold text-slots-primary">Line 1:</span>{" "}
                  Top Row
                </li>
                <li>
                  <span className="font-bold text-slots-primary">Line 2:</span>{" "}
                  Middle Row
                </li>
                <li>
                  <span className="font-bold text-slots-primary">Line 3:</span>{" "}
                  Bottom Row
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Special Patterns</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <span className="font-bold text-slots-primary">Line 4:</span>{" "}
                  V-Shape
                </li>
                <li>
                  <span className="font-bold text-slots-primary">Line 5:</span>{" "}
                  Inverted V
                </li>
                <li>
                  <span className="font-bold text-slots-primary">
                    Lines 6-10:
                  </span>{" "}
                  Zigzags and Diagonals
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-text-secondary italic">
          <p>
            This is a demo game. In the full version, your winnings would be
            credited to your 2xBDamageToken wallet.
          </p>
        </div>
      </div>
    </BaseLayout>
  );
}
