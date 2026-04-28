"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { publicAppConfig } from "@/lib/app-config";
import { useState } from "react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: publicAppConfig.webUrl,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Image src={"/login.svg"} alt="Login" height={500} width={500} />
        <h1 className="text-6xl font-extrabold text-indigo-400">Welcome Back to Helix CLI</h1>
        <p className="text-base font-medium text-zinc-400">Login to your account to approve device access.</p>
      </div>
      <Card className="border-dashed border-2">
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant={"outline"}
                className="w-full h-full"
                type="button"
                onClick={handleGitHubLogin}
                disabled={isLoading}
              >
                <Image src={"/github.svg"} alt="Github" height={16} width={16} className="size-4 dark:invert" />
                {isLoading ? "Redirecting..." : "Continue With GitHub"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
