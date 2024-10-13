"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } 
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl text-neutral-200">Welcome to Algoprep</h2>
      <p className="text-neutral-50 text-sm max-w-sm mt-2">Sign in to Algoprep for DSA Practice</p>

      {error && <p className="text-red-500">{error}</p>}

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4 text-neutral-50">
          <Label htmlFor="email" className="text-neutral-50">Email Address</Label>
          <Input 
            id="email" 
            placeholder="projectmayhem@fc.com" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 text-neutral-50">
          <Label htmlFor="password" className="text-neutral-50">Password</Label>
          <Input 
            id="password" 
            placeholder="••••••••" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-md"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
            type="button"
            onClick={() => signIn("github")}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800" />
            <span className="text-neutral-700 text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
            type="button"
            onClick={() => signIn("google")}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800" />
            <span className="text-neutral-700 text-sm">Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
