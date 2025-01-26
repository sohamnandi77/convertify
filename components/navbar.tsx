import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Navbar({}): any {
  return (
    <nav className="fixed z-50 flex items-center justify-between w-full h-24 px-4 py-10 backdrop-blur-md bg-background bg-opacity-30 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <Link href="/" className="flex items-center gap-2">
        <Image
          alt="logo"
          className="cursor-pointer"
          src="/images/logo.svg"
          height={35}
          width={40}
        />
        <span className="text-2xl text-foreground font-semibold">
          Convertify
        </span>
      </Link>
      <div className="items-center hidden gap-2 md:flex">
        <ModeToggle />
        <Link href="https://github.com/sohamnandi77/convertify.git">
          <Button
            variant="default"
            className="items-center hidden gap-2 bg-purple-600 rounded-full w-fit md:flex"
            size="lg"
          >
            <span>Github Repo</span>
            <span className="text-xl">
              <BsGithub />
            </span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
