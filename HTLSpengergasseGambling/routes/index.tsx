import { BaseLayout } from "../components/layout/BaseLayout.tsx";
import { asset } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <BaseLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-bg-primary opacity-70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green inline-block text-transparent bg-clip-text animate-glow">
            2xBDamageToken Gambling
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-10">
            Experience the thrill of next-generation gambling with our custom
            cryptocurrency. Play, win, and connect with other players in our
            immersive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-accent-blue hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Sign Up & Get 100 Tokens Free
            </a>
            <a
              href="/games"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Explore Games
            </a>
          </div>
        </div>
      </section>

      {/* Game Showcase */}
      <section className="py-20">
        <h2 className="text-3xl font-bold font-display text-center mb-16">
          Featured Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Slots */}
          <div className="bg-bg-secondary rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-slots-primary">
            <div className="h-48 bg-slots-primary bg-opacity-20 flex items-center justify-center">
              <span className="text-6xl">🎰</span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold font-display mb-3 text-slots-primary">
                Slots
              </h3>
              <p className="text-text-secondary mb-4">
                Advanced slot machines with stunning visuals, multiple reels,
                special features, and progressive jackpots.
              </p>
              <a
                href="/games/slots"
                className="inline-block px-6 py-2 border border-slots-primary text-slots-primary rounded-lg hover:bg-slots-primary hover:text-white transition-colors duration-200"
              >
                Play Now
              </a>
            </div>
          </div>

          {/* Blackjack */}
          <div className="bg-bg-secondary rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-blackjack-primary">
            <div className="h-48 bg-blackjack-primary bg-opacity-20 flex items-center justify-center">
              <span className="text-6xl">♠️</span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold font-display mb-3 text-blackjack-primary">
                Blackjack
              </h3>
              <p className="text-text-secondary mb-4">
                Visually appealing blackjack with realistic card animations,
                multiple betting options, and side bets.
              </p>
              <a
                href="/games/blackjack"
                className="inline-block px-6 py-2 border border-blackjack-primary text-blackjack-primary rounded-lg hover:bg-blackjack-primary hover:text-white transition-colors duration-200"
              >
                Play Now
              </a>
            </div>
          </div>

          {/* Roulette */}
          <div className="bg-bg-secondary rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-roulette-primary">
            <div className="h-48 bg-roulette-primary bg-opacity-20 flex items-center justify-center">
              <span className="text-6xl">🎲</span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold font-display mb-3 text-roulette-primary">
                Roulette
              </h3>
              <p className="text-text-secondary mb-4">
                Realistic 3D roulette with European and American options,
                detailed betting table, and history tracking.
              </p>
              <a
                href="/games/roulette"
                className="inline-block px-6 py-2 border border-roulette-primary text-roulette-primary rounded-lg hover:bg-roulette-primary hover:text-white transition-colors duration-200"
              >
                Play Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold font-display text-center mb-16">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center text-center p-6 bg-bg-primary rounded-xl shadow-lg">
              <div className="w-16 h-16 rounded-full bg-accent-blue bg-opacity-20 flex items-center justify-center mb-4">
                <span className="text-2xl text-accent-blue">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3">2xBDamageToken</h3>
              <p className="text-text-secondary">
                Our custom cryptocurrency for all your gambling needs. Get 100
                tokens free when you sign up and start playing immediately.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-bg-primary rounded-xl shadow-lg">
              <div className="w-16 h-16 rounded-full bg-accent-purple bg-opacity-20 flex items-center justify-center mb-4">
                <span className="text-2xl text-accent-purple">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Leaderboards</h3>
              <p className="text-text-secondary">
                Compete with other players on our global and game-specific
                leaderboards. Track your stats and climb the ranks.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-bg-primary rounded-xl shadow-lg">
              <div className="w-16 h-16 rounded-full bg-accent-green bg-opacity-20 flex items-center justify-center mb-4">
                <span className="text-2xl text-accent-green">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Social Features</h3>
              <p className="text-text-secondary">
                Add friends, chat in real-time, and follow your favorite
                players. Share your biggest wins on the timeline.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-bg-primary rounded-xl shadow-lg">
              <div className="w-16 h-16 rounded-full bg-accent-blue bg-opacity-20 flex items-center justify-center mb-4">
                <span className="text-2xl text-accent-blue">👤</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Customizable Profiles</h3>
              <p className="text-text-secondary">
                Personalize your profile with pictures, banners, and badges.
                Showcase your achievements and gambling style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-display mb-6">
            Ready to Start Gambling?
          </h2>
          <p className="text-xl text-text-secondary mb-10">
            Join thousands of players already winning big with 2xBDamageToken.
            Sign up now and get 100 tokens free!
          </p>
          <a
            href="/register"
            className="px-12 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 inline-block"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </BaseLayout>
  );
}
