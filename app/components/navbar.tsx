import Image from "next/image";

export function Navbar() {
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="min-w-screen-xl">
          <Image
            src="/entraide.png"
            className=" align-middle mx-auto"
            alt="Flowbite Logo"
            width={350}
            height={32}
          />
        </div>
      </nav>
    </>
  );
}
