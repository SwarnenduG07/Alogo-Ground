import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "@/components/LandingNavbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
       <NavBar />
       <Hero />
    </div>
  );
}
