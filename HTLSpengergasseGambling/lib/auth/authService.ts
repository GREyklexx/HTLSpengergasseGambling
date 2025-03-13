import { tokenContract } from "../blockchain/2xBDamageToken.ts";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // In a real app, this would be properly hashed
  walletAddress: string;
  createdAt: Date;
  isAdmin: boolean;
}

// In a real application, this would be stored in a database
const users: Map<string, User> = new Map();

// Add a demo user
users.set("demo-user", {
  id: "demo-user",
  username: "DemoUser",
  email: "demo@example.com",
  passwordHash: "password123", // This would be hashed in a real app
  walletAddress: "0xdemoaddress",
  createdAt: new Date(),
  isAdmin: false,
});

// In a real app, we would use JWT or another token-based auth system
// For this demo, we'll use a simple in-memory sessions store
const sessions: Map<string, { userId: string; expires: Date }> = new Map();

export const authService = {
  /**
   * Register a new user
   */
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; userId?: string; error?: string }> {
    // Check if username or email already exists
    const existingUser = Array.from(users.values()).find(
      (u) => u.username === username || u.email === email
    );

    if (existingUser) {
      return {
        success: false,
        error: "Username or email already exists",
      };
    }

    // Create new user
    const userId = `user_${Date.now()}`;
    const walletAddress = `0x${Math.random().toString(36).substring(2, 15)}`;

    const newUser: User = {
      id: userId,
      username,
      email,
      passwordHash: password, // In real app, this would be hashed
      walletAddress,
      createdAt: new Date(),
      isAdmin: false,
    };

    users.set(userId, newUser);

    // Grant initial tokens to new user
    tokenContract.grantInitialTokens(userId, 100);

    return {
      success: true,
      userId,
    };
  },

  /**
   * Login a user
   */
  async login(
    usernameOrEmail: string,
    password: string
  ): Promise<{ success: boolean; sessionId?: string; error?: string }> {
    // Find user by username or email
    const user = Array.from(users.values()).find(
      (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
    );

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Check password
    if (user.passwordHash !== password) {
      // In a real app, we would use proper password comparison
      return {
        success: false,
        error: "Invalid password",
      };
    }

    // Create session
    const sessionId = `session_${Date.now()}`;
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 7); // 7 days from now

    sessions.set(sessionId, {
      userId: user.id,
      expires: expiration,
    });

    return {
      success: true,
      sessionId,
    };
  },

  /**
   * Get user by session
   */
  getUserBySession(sessionId: string): {
    valid: boolean;
    user?: User;
    error?: string;
  } {
    const session = sessions.get(sessionId);

    if (!session) {
      return {
        valid: false,
        error: "Session not found",
      };
    }

    if (session.expires < new Date()) {
      sessions.delete(sessionId);
      return {
        valid: false,
        error: "Session expired",
      };
    }

    const user = users.get(session.userId);

    if (!user) {
      return {
        valid: false,
        error: "User not found",
      };
    }

    return {
      valid: true,
      user,
    };
  },

  /**
   * Logout user
   */
  logout(sessionId: string): boolean {
    return sessions.delete(sessionId);
  },

  /**
   * Get user by ID
   */
  getUserById(id: string): User | undefined {
    return users.get(id);
  },

  /**
   * List all users (admin only)
   */
  getAllUsers(): User[] {
    return Array.from(users.values());
  },
};
