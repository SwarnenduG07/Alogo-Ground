import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "@/components/LandingNavbar";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
       <NavBar />
       <Hero />
       <Testimonials />
    </div>
  );
}
