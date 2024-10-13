"use client"
import React, { useState } from "react";
import { signIn } from "next-auth/react"; 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

const hasUpperCase = (password: string) => /[A-Z]/.test(password);
const hasNumber =  (password: string) =>  /[0-9]/.test(password);
const hasSpecialChar = (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password);
const inMinLength = (password: string) => password.length >= 6;

export default function SignupFormDemo() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });
  const [password, setPassword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Example sign-in logic here
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to Algoprep
      </h2>
      <p className="text-neutral-50 text-sm max-w-sm mt-2">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
     <ul className="text-sm mt-2 text-neutral-50">
         <li className={cn("mt-1", hasUpperCase(password) ? "text-green-500" : "text-neutral-50", !hasUpperCase(password) && password.length > 0 ? "text-red-500" : "")}>
        At least one uppercase letter
        </li>
        <li className={cn("mt-1", hasNumber(password) ? "text-green-500" : "text-neutral-50", !hasNumber(password) && password.length > 0 ? "text-red-500" : "")}>
        At least one number
        </li>
       <li className={cn("mt-1", hasSpecialChar(password) ? "text-green-500" :   "text-neutral-50", !hasSpecialChar(password) && password.length > 0 ?      "text-red-500" : "")}>
        At least one special character
        </li>
        <li className={cn("mt-1", inMinLength(password) ? "text-green-500" : "text-neutral-50", !inMinLength(password) && password.length > 0 ? "text-red-500" : "")}>
        At least 6 characters
      </li>
    </ul>
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
