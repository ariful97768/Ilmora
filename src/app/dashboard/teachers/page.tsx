import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";

export default async function Parents() {
  const session = await auth();
  const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-4 gap-5">
      {count.map((item) => (
        <div key={item} className="flex bg-white p-5 rounded-md space-y-5 text-center flex-col items-center relative">
            <div className="absolute bg-indigo-200 hover:bg-indigo-300 transition-colors duration-300 cursor-pointer font-black text-xl top-5 right-5 p-2 border rounded-md"><HiDotsHorizontal /></div>
          <Image
            className="rounded-full border-6 border-white"
            width={100}
            height={100}
            src={session?.user?.image ?? "/default-profile.png"}
            alt="Profile"
          />
          <div className="space-y-1">
            <h3 className="font-semibold">Munaroh Steffani</h3>
            <p className="text-sm text-gray-500">Teacher</p>
            <div className="flex gap-2 mt-3">
              <span className="px-2 border py-1 rounded-md bg-green-200 text-green-700 text-xs">
                Mathematics
              </span>
              <span className="px-2 border py-1 rounded-md bg-green-200 text-green-700 text-xs">
                Science
              </span>
              <span className="px-2 border py-1 rounded-md bg-green-200 text-green-700 text-xs">
                Art
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            <Button variant={"outline"}>Profile</Button>
            <Button>Chat</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
