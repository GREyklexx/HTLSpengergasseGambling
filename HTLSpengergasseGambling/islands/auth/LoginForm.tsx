import { useState } from "preact/hooks";

interface LoginFormProps {
  error?: string;
}

export default function LoginForm({ error: initialError }: LoginFormProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError || "");

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      setError("Please enter both username/email and password");
      return;
    }

    // Allow the form to submit to the POST handler
    (e.target as HTMLFormElement).submit();
  };

  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg p-8 md:p-12 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-accent-blue to-accent-purple inline-block text-transparent bg-clip-text">
          Login to Your Account
        </h1>
        <p className="text-text-secondary mt-2">
          Enter your credentials to access your 2xBDamageToken wallet and games
        </p>
      </div>

      {error && (
        <div className="bg-red-900 text-white px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form method="POST" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="usernameOrEmail"
            className="block text-text-secondary mb-2"
          >
            Username or Email
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) =>
              setUsernameOrEmail((e.target as HTMLInputElement).value)
            }
            className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded border border-gray-700 focus:border-accent-blue focus:outline-none"
            placeholder="Enter your username or email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-text-secondary mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded border border-gray-700 focus:border-accent-blue focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-accent-blue hover:bg-blue-600 text-white py-3 px-4 rounded font-bold transition duration-200"
          >
            Login
          </button>
        </div>

        <div className="text-center text-text-secondary">
          Don't have an account?{" "}
          <a href="/register" className="text-accent-green hover:underline">
            Sign Up
          </a>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-6">
          <p className="text-center text-text-secondary text-sm">
            Demo account: <br />
            Username: <span className="text-accent-blue">DemoUser</span>
            <br />
            Password: <span className="text-accent-blue">password123</span>
          </p>
        </div>
      </form>
    </div>
  );
}
