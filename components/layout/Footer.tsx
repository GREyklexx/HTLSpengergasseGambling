import { asset } from "$fresh/runtime.ts";

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <a href="/" className="flex items-center">
              <img
                className="h-8 w-auto mr-2"
                src={asset("images/logo.svg")}
                alt="2xBDamageToken Logo"
              />
              <span className="font-display text-xl font-bold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green inline-block text-transparent bg-clip-text">
                2xBDamageToken
              </span>
            </a>
            <p className="text-sm text-text-secondary">
              Experience the thrill of gambling with our 2xBDamageToken
              cryptocurrency
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Games
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="/games/slots"
                  className="text-sm text-text-secondary hover:text-accent-blue"
                >
                  Slots
                </a>
              </li>
              <li>
                <a
                  href="/games/blackjack"
                  className="text-sm text-text-secondary hover:text-accent-blue"
                >
                  Blackjack
                </a>
              </li>
              <li>
                <a
                  href="/games/roulette"
                  className="text-sm text-text-secondary hover:text-accent-blue"
                >
                  Roulette
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Social
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="/leaderboard"
                  className="text-sm text-text-secondary hover:text-accent-purple"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="/social/friends"
                  className="text-sm text-text-secondary hover:text-accent-purple"
                >
                  Friends
                </a>
              </li>
              <li>
                <a
                  href="/social/posts"
                  className="text-sm text-text-secondary hover:text-accent-purple"
                >
                  Timeline
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Account
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="/wallet"
                  className="text-sm text-text-secondary hover:text-accent-green"
                >
                  Wallet
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="text-sm text-text-secondary hover:text-accent-green"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/help"
                  className="text-sm text-text-secondary hover:text-accent-green"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-text-secondary text-center">
            &copy; {new Date().getFullYear()} 2xBDamageToken Gambling. All
            rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-text-secondary hover:text-accent-blue">
              <span className="sr-only">Terms of Service</span>
              Terms
            </a>
            <a href="#" className="text-text-secondary hover:text-accent-blue">
              <span className="sr-only">Privacy Policy</span>
              Privacy
            </a>
            <a href="#" className="text-text-secondary hover:text-accent-blue">
              <span className="sr-only">Responsible Gambling</span>
              Responsible Gambling
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
