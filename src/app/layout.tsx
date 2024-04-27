"use client";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <QueryClientProvider client={queryClient}>
        <body
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
