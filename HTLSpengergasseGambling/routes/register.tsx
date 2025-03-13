import { BaseLayout } from "../components/layout/BaseLayout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { authService } from "../lib/auth/authService.ts";
import { setCookie } from "$std/http/cookie.ts";
import RegisterForm from "../islands/auth/RegisterForm.tsx";

interface RegisterData {
  success: boolean;
  error?: string;
}

export const handler: Handlers<RegisterData> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const username = form.get("username")?.toString() || "";
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    const confirmPassword = form.get("confirmPassword")?.toString() || "";

    // Validate passwords match
    if (password !== confirmPassword) {
      return ctx.render({
        success: false,
        error: "Passwords do not match",
      });
    }

    // Register user
    const result = await authService.register(username, email, password);

    if (result.success && result.userId) {
      // Log the user in
      const loginResult = await authService.login(username, password);

      if (loginResult.success && loginResult.sessionId) {
        // Set session cookie
        const headers = new Headers();
        setCookie(headers, {
          name: "sessionId",
          value: loginResult.sessionId,
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        // Redirect to welcome/getting started page
        headers.set("location", "/wallet");
        return new Response(null, {
          status: 303,
          headers,
        });
      }
    }

    // If registration failed, render the page with error
    return ctx.render({
      success: false,
      error: result.error || "Registration failed",
    });
  },
};

export default function Register({ data }: PageProps<RegisterData | null>) {
  return (
    <BaseLayout title="Register | 2xBDamageToken Gambling">
      <div className="min-h-screen py-12 flex justify-center">
        <RegisterForm error={data?.error} />
      </div>
    </BaseLayout>
  );
}
