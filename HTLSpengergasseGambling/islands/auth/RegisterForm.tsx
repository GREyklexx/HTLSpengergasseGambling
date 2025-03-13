import { useState } from "preact/hooks";

interface RegisterFormProps {
  error?: string;
}

export default function RegisterForm({
  error: initialError,
}: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(initialError || "");

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    // Client-side validation
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Allow the form to submit to the POST handler
    (e.target as HTMLFormElement).submit();
  };

  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg p-8 md:p-12 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-accent-green to-accent-blue inline-block text-transparent bg-clip-text">
          Create Your Account
        </h1>
        <p className="text-text-secondary mt-2">
          Sign up today and get 100 2xBDamageTokens for free!
        </p>
      </div>

      {error && (
        <div className="bg-red-900 text-white px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form method="POST" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block text-text-secondary mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded border border-gray-700 focus:border-accent-green focus:outline-none"
            placeholder="Choose a unique username"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-text-secondary mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded border border-gray-700 focus:border-accent-green focus:outline-none"
            placeholder="Enter your email address"
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
            className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded border border-gray-700 focus:border-accent-green focus:outline-none"
            placeholder="Create a strong password"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-text-secondary mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword((e.target as HTMLInputElement).value)
            }
            className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded border border-gray-700 focus:border-accent-green focus:outline-none"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-accent-green hover:bg-green-600 text-white py-3 px-4 rounded font-bold transition duration-200"
          >
            Create Account
          </button>
        </div>

        <div className="text-center text-text-secondary">
          Already have an account?{" "}
          <a href="/login" className="text-accent-blue hover:underline">
            Login
          </a>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-6">
          <p className="text-center text-accent-purple text-sm">
            By signing up, you'll receive 100 2xBDamageTokens to start gambling
            immediately!
          </p>
        </div>
      </form>
    </div>
  );
}
