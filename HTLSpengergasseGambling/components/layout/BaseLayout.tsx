import { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/runtime.ts";
import { NavBar } from "./NavBar.tsx";
import { Footer } from "./Footer.tsx";

interface BaseLayoutProps {
  title?: string;
  children: ComponentChildren;
}

export function BaseLayout({
  title = "2xBDamageToken Gambling",
  children,
}: BaseLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Advanced gambling platform with 2xBDamageToken cryptocurrency"
        />
        <link rel="stylesheet" href={asset("styles/main.css")} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Chakra+Petch:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div class="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <NavBar />
        <main class="flex-grow w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
