/**
 * 2xBDamageToken - Cryptocurrency implementation for HTL Spengergasse Gambling
 *
 * This is a simplified token implementation for demonstration purposes.
 * In a real application, this would be a blockchain-based smart contract.
 */

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  type: TransactionType;
  status: TransactionStatus;
  metadata?: Record<string, any>;
}

export enum TransactionType {
  TRANSFER = "transfer",
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  BET = "bet",
  WIN = "win",
  INITIAL_GRANT = "initial_grant",
  FEE = "fee",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface TokenInfo {
  name: string;
  symbol: string;
  totalSupply: number;
  decimals: number;
}

export class TokenContract {
  private static instance: TokenContract;
  private balances: Map<string, number> = new Map();
  private transactions: Transaction[] = [];
  private tokenInfo: TokenInfo;

  private constructor() {
    // Initialize token info
    this.tokenInfo = {
      name: "2xBDamageToken",
      symbol: "2XBD",
      totalSupply: 1000000, // 1 million tokens initially
      decimals: 2, // 2 decimal places
    };

    // Reserve some tokens for the platform
    this.balances.set("platform-reserve", 900000); // 90% reserved
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): TokenContract {
    if (!TokenContract.instance) {
      TokenContract.instance = new TokenContract();
    }
    return TokenContract.instance;
  }

  /**
   * Get token information
   */
  public getTokenInfo(): TokenInfo {
    return { ...this.tokenInfo };
  }

  /**
   * Get balance for an address
   */
  public balanceOf(address: string): number {
    return this.balances.get(address) || 0;
  }

  /**
   * Transfer tokens from one address to another
   */
  public transfer(
    from: string,
    to: string,
    amount: number,
    metadata?: Record<string, any>
  ): boolean {
    if (amount <= 0) {
      console.error("Invalid amount for transfer");
      return false;
    }

    const fromBalance = this.balanceOf(from);
    if (fromBalance < amount) {
      console.error("Insufficient balance for transfer");
      return false;
    }

    // Update balances
    this.balances.set(from, fromBalance - amount);
    this.balances.set(to, this.balanceOf(to) + amount);

    // Record transaction
    const transaction: Transaction = {
      id: this.generateTransactionId(),
      from,
      to,
      amount,
      timestamp: Date.now(),
      type: TransactionType.TRANSFER,
      status: TransactionStatus.COMPLETED,
      metadata,
    };

    this.transactions.push(transaction);
    return true;
  }

  /**
   * Grant initial tokens to a new user
   */
  public grantInitialTokens(address: string, amount: number = 100): boolean {
    if (this.balanceOf(address) > 0) {
      console.error("Address already has tokens");
      return false;
    }

    const reserveAddress = "platform-reserve";
    const reserveBalance = this.balanceOf(reserveAddress);

    if (reserveBalance < amount) {
      console.error("Insufficient tokens in platform reserve");
      return false;
    }

    // Transfer from reserve to user
    this.balances.set(reserveAddress, reserveBalance - amount);
    this.balances.set(address, amount);

    // Record transaction
    const transaction: Transaction = {
      id: this.generateTransactionId(),
      from: reserveAddress,
      to: address,
      amount,
      timestamp: Date.now(),
      type: TransactionType.INITIAL_GRANT,
      status: TransactionStatus.COMPLETED,
      metadata: { reason: "new_user_grant" },
    };

    this.transactions.push(transaction);
    return true;
  }

  /**
   * Process a bet transaction
   */
  public processBet(userId: string, amount: number, gameId: string): boolean {
    const userBalance = this.balanceOf(userId);

    if (userBalance < amount) {
      console.error("Insufficient balance for bet");
      return false;
    }

    // Remove tokens from user balance
    this.balances.set(userId, userBalance - amount);

    // Add to platform balance
    const platformAddress = "platform-account";
    this.balances.set(
      platformAddress,
      this.balanceOf(platformAddress) + amount
    );

    // Record transaction
    const transaction: Transaction = {
      id: this.generateTransactionId(),
      from: userId,
      to: platformAddress,
      amount,
      timestamp: Date.now(),
      type: TransactionType.BET,
      status: TransactionStatus.COMPLETED,
      metadata: { gameId },
    };

    this.transactions.push(transaction);
    return true;
  }

  /**
   * Process a win transaction
   */
  public processWin(userId: string, amount: number, gameId: string): boolean {
    const platformAddress = "platform-account";
    const platformBalance = this.balanceOf(platformAddress);

    // Platform should always have enough tokens, but check anyway
    if (platformBalance < amount) {
      console.error("Insufficient platform balance for payout");
      return false;
    }

    // Transfer from platform to user
    this.balances.set(platformAddress, platformBalance - amount);
    this.balances.set(userId, this.balanceOf(userId) + amount);

    // Record transaction
    const transaction: Transaction = {
      id: this.generateTransactionId(),
      from: platformAddress,
      to: userId,
      amount,
      timestamp: Date.now(),
      type: TransactionType.WIN,
      status: TransactionStatus.COMPLETED,
      metadata: { gameId },
    };

    this.transactions.push(transaction);
    return true;
  }

  /**
   * Get transaction history for a user
   */
  public getTransactionHistory(address: string): Transaction[] {
    return this.transactions
      .filter((tx) => tx.from === address || tx.to === address)
      .sort((a, b) => b.timestamp - a.timestamp); // newest first
  }

  /**
   * Get top token holders
   */
  public getTopHolders(
    limit: number = 10
  ): Array<{ address: string; balance: number }> {
    const holders = Array.from(this.balances.entries())
      .map(([address, balance]) => ({ address, balance }))
      .sort((a, b) => b.balance - a.balance)
      .slice(0, limit);

    return holders;
  }

  /**
   * Generate a unique transaction ID
   */
  private generateTransactionId(): string {
    return `tx_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  /**
   * Create new tokens (only callable by platform)
   */
  public mint(amount: number): boolean {
    // In a real implementation, this would have strict access controls
    this.tokenInfo.totalSupply += amount;
    const reserveAddress = "platform-reserve";
    this.balances.set(reserveAddress, this.balanceOf(reserveAddress) + amount);
    return true;
  }

  /**
   * Burn tokens (remove from circulation)
   */
  public burn(address: string, amount: number): boolean {
    const balance = this.balanceOf(address);
    if (balance < amount) {
      return false;
    }

    this.balances.set(address, balance - amount);
    this.tokenInfo.totalSupply -= amount;

    // Record transaction
    const transaction: Transaction = {
      id: this.generateTransactionId(),
      from: address,
      to: "burn-address",
      amount,
      timestamp: Date.now(),
      type: TransactionType.FEE,
      status: TransactionStatus.COMPLETED,
      metadata: { reason: "token_burn" },
    };

    this.transactions.push(transaction);
    return true;
  }
}

// Export singleton instance
export const tokenContract = TokenContract.getInstance();
