import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSections";
import Background3D from "@/components/BackGrounds3D";

export default function Home() {
  return (
    <main className="relative h-screen w-full">
      <Navbar />
      <HeroSection />
      <Background3D />
    </main>
  );
}
