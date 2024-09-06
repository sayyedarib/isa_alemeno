"use client";

import { Button } from "@/components/ui/button";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* TODO: ENV is undefined on client side that's during rendering it shows dev environment always, fix it later */}
      {process.env.ENV == "production" ? (
        <form className="flex flex-col min-w-80">
          <h1 className="text-2xl font-medium">Sign in</h1>
          <p className="text-sm text-foreground">
            Don't have an account?{" "}
            <Link
              className="text-foreground font-medium underline"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <SubmitButton pendingText="Signing In..." formAction={signInAction}>
              Sign in
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      ) : (
        <div className="flex">
          {/* Singin as dummy user */}
          <Button
            onClick={() => {
              const formData = new FormData();
              formData.append("email", "sayyedaribhussain4321@gmail.com");
              formData.append("password", "@Unknown@321");
              signInAction(formData);
            }}
          >
            Sign in as Student
          </Button>
        </div>
      )}
    </div>
  );
}
