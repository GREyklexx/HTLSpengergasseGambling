import { asset } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

export function NavBar() {
  return (
    <nav className="bg-bg-secondary border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center">
                <img
                  className="h-8 w-auto mr-2"
                  src={asset("images/logo.svg")}
                  alt="2xBDamageToken Logo"
                />
                <span className="font-display text-xl font-bold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green inline-block text-transparent bg-clip-text animate-glow">
                  2xBDamageToken
                </span>
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/games"
                className="border-transparent text-text-secondary hover:text-accent-blue hover:border-accent-blue inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Games
              </a>
              <a
                href="/leaderboard"
                className="border-transparent text-text-secondary hover:text-accent-purple hover:border-accent-purple inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Leaderboard
              </a>
              <a
                href="/wallet"
                className="border-transparent text-text-secondary hover:text-accent-green hover:border-accent-green inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Wallet
              </a>
              <a
                href="/social"
                className="border-transparent text-text-secondary hover:text-accent-blue hover:border-accent-blue inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Social
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <a
                href="/login"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-accent-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </a>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="/games"
            className="text-text-secondary hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Games
          </a>
          <a
            href="/leaderboard"
            className="text-text-secondary hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Leaderboard
          </a>
          <a
            href="/wallet"
            className="text-text-secondary hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Wallet
          </a>
          <a
            href="/social"
            className="text-text-secondary hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Social
          </a>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <a
              href="/login"
              className="block text-center w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium mb-2"
            >
              Login
            </a>
            <a
              href="/register"
              className="block text-center w-full bg-accent-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
