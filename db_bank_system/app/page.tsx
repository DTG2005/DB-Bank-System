import Image from "next/image";
import NavBar from "./NavBar.js";

/**
 * Renders the home page of the DB Bank application.
 *
 * @return {JSX.Element} The JSX element representing the home page.
 */
export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-gray-300 to-gray-500">
        <Image
          alt="DB Bank"
          src="/bank.png"
          height={100}
          width={100}
          className="rounded-full"
        />
        <h1 className="text-6xl font-bold">DB Bank</h1>
        <p className="text-2xl">The best bank in the world</p>
      </div>
    </>
  );
}
