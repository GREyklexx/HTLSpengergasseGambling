import { BaseLayout } from "../components/layout/BaseLayout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { authService } from "../lib/auth/authService.ts";
import { setCookie } from "$std/http/cookie.ts";
import LoginForm from "../islands/auth/LoginForm.tsx";

interface LoginData {
  success: boolean;
  error?: string;
}

export const handler: Handlers<LoginData> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const usernameOrEmail = form.get("usernameOrEmail")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    const result = await authService.login(usernameOrEmail, password);

    if (result.success && result.sessionId) {
      // Set session cookie
      const headers = new Headers();
      setCookie(headers, {
        name: "sessionId",
        value: result.sessionId,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Redirect to home page or requested page
      headers.set("location", "/");
      return new Response(null, {
        status: 303,
        headers,
      });
    }

    // If login failed, render the page with error
    return ctx.render({
      success: false,
      error: result.error || "Login failed",
    });
  },
};

export default function Login({ data }: PageProps<LoginData | null>) {
  return (
    <BaseLayout title="Login | 2xBDamageToken Gambling">
      <div className="min-h-screen py-12 flex justify-center">
        <LoginForm error={data?.error} />
      </div>
    </BaseLayout>
  );
}
