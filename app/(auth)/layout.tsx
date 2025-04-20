import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

function AuthLayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo />
      {children}
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        Return to homepage
      </Link>
    </div>
  );
}

export default AuthLayoutPage;
