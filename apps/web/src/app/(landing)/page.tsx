"use client"
import Features from "@/components/features";
import Hero from "@/components/hero";
import LandingNavBar from "@/components/landingnavbar";
import Langaugesupport from "@/components/langaugesupport";

export default function Home() {
  return (
    <div className="">
       <LandingNavBar />
       <Hero />
       <Langaugesupport />
       <Features />
    </div>
  );
}
