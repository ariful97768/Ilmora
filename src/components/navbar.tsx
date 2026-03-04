import { auth } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Megaphone, MessageCircleMore } from "lucide-react";
import defaultImg from "@/assets/no-img-avatar.png";
import { signoutUser } from "@/lib/frontend-actions/signout-user";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      {/* <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Search size={16} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div> */}
      {/* ICONS AND USER */}
      {session?.user ? (
        <div className="flex items-center gap-6 justify-end w-full">
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <MessageCircleMore size={20} className="text-gray-500" />
          </div>
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
            <Megaphone size={20} className="text-gray-500" />
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
              1
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium">
              {session.user.name}
            </span>
            <span className="text-[10px] text-gray-500 text-right">
              {session.user.role}
            </span>
          </div>
          <Image
            src={session.user.image || defaultImg}
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
      <Button onClick={signoutUser} variant={"ghost"}>
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
