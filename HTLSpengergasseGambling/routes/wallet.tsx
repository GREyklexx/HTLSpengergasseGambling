import { useState } from "preact/hooks";
import { BaseLayout } from "../components/layout/BaseLayout.tsx";
import { tokenContract } from "../lib/blockchain/2xBDamageToken.ts";

export default function WalletPage() {
  // In a real application, this would be fetched from the server based on auth
  const userId = "demo-user";

  // Ensure the demo user has tokens
  if (tokenContract.balanceOf(userId) === 0) {
    tokenContract.grantInitialTokens(userId, 1000);
  }

  // Create some sample transactions for the demo
  if (tokenContract.getTransactionHistory(userId).length === 0) {
    // Add a win
    tokenContract.processWin(userId, 250, "slots-game-1");
    // Add a bet
    tokenContract.processBet(userId, 50, "blackjack-game-1");
    // Add another win
    tokenContract.processWin(userId, 125, "roulette-game-1");
    // Add another bet
    tokenContract.processBet(userId, 75, "slots-game-2");
  }

  return (
    <BaseLayout title="Wallet | 2xBDamageToken Gambling">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-display mb-4 bg-gradient-to-r from-accent-blue to-accent-green inline-block text-transparent bg-clip-text">
            Your 2xBDamageToken Wallet
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Manage your 2xBDamageToken, view your balance, and track your
            transactions.
          </p>
        </div>

        <WalletOverview userId={userId} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold font-display mb-6">
            Transaction History
          </h2>
          <TransactionHistory userId={userId} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-bg-secondary rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold font-display mb-4">Token Info</h2>
            <TokenInfo />
          </div>

          <div className="bg-bg-secondary rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold font-display mb-4">
              Earn More Tokens
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                <span className="font-bold text-accent-green">🎮</span> Play
                games and win big
              </p>
              <p>
                <span className="font-bold text-accent-green">👥</span> Invite
                friends to get 50 tokens per referral
              </p>
              <p>
                <span className="font-bold text-accent-green">📊</span> Climb
                the leaderboards to win token prizes
              </p>
              <p>
                <span className="font-bold text-accent-green">🏆</span> Compete
                in special tournaments
              </p>
              <div className="mt-6">
                <button className="w-full py-3 bg-accent-green text-white font-bold rounded-lg hover:bg-opacity-90 transition-all">
                  Go to Games
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

function WalletOverview({ userId }: { userId: string }) {
  const balance = tokenContract.balanceOf(userId);
  const tokenInfo = tokenContract.getTokenInfo();

  return (
    <div className="bg-bg-secondary rounded-lg p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="token w-16 h-16 flex items-center justify-center mr-4">
            <span className="text-2xl">💰</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              {balance} {tokenInfo.symbol}
            </h2>
            <p className="text-text-secondary">Your current balance</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-accent-blue text-white font-bold rounded-lg hover:bg-opacity-90 transition-all">
            Deposit
          </button>
          <button className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all">
            Withdraw
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-bg-primary rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Total Won</h3>
          <p className="text-2xl font-bold text-accent-green">
            {calculateTotalWon(userId)} {tokenInfo.symbol}
          </p>
        </div>

        <div className="bg-bg-primary rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Total Wagered</h3>
          <p className="text-2xl font-bold text-accent-blue">
            {calculateTotalBet(userId)} {tokenInfo.symbol}
          </p>
        </div>

        <div className="bg-bg-primary rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-1">Net Profit</h3>
          <p
            className={`text-2xl font-bold ${
              calculateNetProfit(userId) >= 0
                ? "text-accent-green"
                : "text-red-500"
            }`}
          >
            {calculateNetProfit(userId)} {tokenInfo.symbol}
          </p>
        </div>
      </div>
    </div>
  );
}

function TransactionHistory({ userId }: { userId: string }) {
  const transactions = tokenContract.getTransactionHistory(userId);

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary rounded-lg overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-bg-secondary divide-y divide-gray-700">
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`mr-2 ${
                        getTransactionTypeIcon(tx.type).color
                      }`}
                    >
                      {getTransactionTypeIcon(tx.type).icon}
                    </span>
                    <span className="font-medium">
                      {formatTransactionType(tx.type)}
                    </span>
                  </div>
                  {tx.metadata?.gameId && (
                    <span className="text-xs text-text-secondary block mt-1">
                      Game ID: {tx.metadata.gameId}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-medium ${getAmountColor(userId, tx)}`}>
                    {getAmountPrefix(userId, tx)}
                    {tx.amount} 2XBD
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                  {new Date(tx.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      tx.status
                    )}`}
                  >
                    {tx.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TokenInfo() {
  const tokenInfo = tokenContract.getTokenInfo();

  return (
    <div className="space-y-4 text-text-secondary">
      <div className="flex justify-between">
        <span>Name:</span>
        <span className="font-medium text-text-primary">{tokenInfo.name}</span>
      </div>
      <div className="flex justify-between">
        <span>Symbol:</span>
        <span className="font-medium text-text-primary">
          {tokenInfo.symbol}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Total Supply:</span>
        <span className="font-medium text-text-primary">
          {tokenInfo.totalSupply.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Decimals:</span>
        <span className="font-medium text-text-primary">
          {tokenInfo.decimals}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Token Type:</span>
        <span className="font-medium text-text-primary">ERC-20 Compatible</span>
      </div>
      <div className="mt-6 text-center">
        <a href="#" className="text-accent-blue hover:underline">
          View on Block Explorer
        </a>
      </div>
    </div>
  );
}

// Helper functions
function getTransactionTypeIcon(type: string): { icon: string; color: string } {
  switch (type) {
    case "transfer":
      return { icon: "↔️", color: "text-blue-400" };
    case "deposit":
      return { icon: "⬇️", color: "text-green-400" };
    case "withdrawal":
      return { icon: "⬆️", color: "text-yellow-400" };
    case "bet":
      return { icon: "🎮", color: "text-orange-400" };
    case "win":
      return { icon: "🏆", color: "text-accent-green" };
    case "initial_grant":
      return { icon: "🎁", color: "text-purple-400" };
    case "fee":
      return { icon: "💸", color: "text-red-400" };
    default:
      return { icon: "❓", color: "text-gray-400" };
  }
}

function formatTransactionType(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getAmountColor(userId: string, tx: any): string {
  if (tx.to === userId) {
    return "text-accent-green";
  } else if (tx.from === userId) {
    return "text-red-400";
  }
  return "text-text-primary";
}

function getAmountPrefix(userId: string, tx: any): string {
  if (tx.to === userId) {
    return "+";
  } else if (tx.from === userId) {
    return "-";
  }
  return "";
}

function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "bg-green-900 text-green-300";
    case "pending":
      return "bg-yellow-900 text-yellow-300";
    case "failed":
      return "bg-red-900 text-red-300";
    default:
      return "bg-gray-700 text-gray-300";
  }
}

function calculateTotalWon(userId: string): number {
  const transactions = tokenContract.getTransactionHistory(userId);
  return transactions
    .filter((tx) => tx.to === userId && tx.type === "win")
    .reduce((total, tx) => total + tx.amount, 0);
}

function calculateTotalBet(userId: string): number {
  const transactions = tokenContract.getTransactionHistory(userId);
  return transactions
    .filter((tx) => tx.from === userId && tx.type === "bet")
    .reduce((total, tx) => total + tx.amount, 0);
}

function calculateNetProfit(userId: string): number {
  return calculateTotalWon(userId) - calculateTotalBet(userId);
}
