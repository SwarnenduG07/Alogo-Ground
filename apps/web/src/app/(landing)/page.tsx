"use client"
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HowItWorks from "@/components/howItWork";
import LandingNavBar from "@/components/landingnavbar";
import Langaugesupport from "@/components/langaugesupport";

export default function Home() {
  return (
    <div className="">
       <LandingNavBar />
       <Hero />
       <Langaugesupport />
       <Features />
       <HowItWorks /> 
       <Footer />
    </div>
  );
}
