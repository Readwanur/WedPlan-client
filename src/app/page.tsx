import Image from "next/image";
import logo from "/public/WedPlan_logo.png"

export default function Home() {
  return (
    <Image 
    src={logo}
    alt="WedPlan_logo"
    height={200} 
    width={250}
    />
  );
}
