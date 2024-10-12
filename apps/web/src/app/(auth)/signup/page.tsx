"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn to trigger auth
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";


export default function SignupFormDemo() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Call NextAuth signIn with the credentials provider
      const result = await signIn("credentials", {
        redirect: false, // Disable redirect to handle it manually
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        console.log("Sign up failed:", result.error);
        // Handle error (e.g., display message to user)
      } else {
        console.log("Sign up successful!");
        // Handle successful sign up (e.g., redirect to dashboard)
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to Algoprep
      </h2>
      <p className="text-neutral-50 text-sm max-w-sm mt-2 -300">
        Signup to Algoperp for DSA Practice
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-neutral-50">
              First name
            </Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-neutral-50">
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="username" className="text-neutral-50">
            Username
          </Label>
          <Input
            id="username"
            placeholder="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-neutral-50">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-neutral-50">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium bg-gray-50"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800" />
            <span className="text-neutral-700">Sign up with GitHub</span>
            <BottomGradient />
          </button>

          <button
            className="flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium bg-gray-50"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800" />
            <span className="text-neutral-700">Sign up with Google</span>
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
