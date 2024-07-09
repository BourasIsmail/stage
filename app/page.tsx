import Image from "next/image";
import { Add } from "./components/add";
import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Add />
    </div>
  );
}
