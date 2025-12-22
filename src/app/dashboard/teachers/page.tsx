import { Button } from "@/components/ui/button";
import { getAllFaculty } from "@/lib/backend-actions/get-faculty";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiDotsHorizontal } from "react-icons/hi";

export default async function Teachers() {
  const faculties = await getAllFaculty({ limit: 20, skip: 0 });
  // fetch returns null if user is not authenticated
  if (!faculties) {
    redirect("/login");
  }
  if (faculties.length === 0) {
    return (
      <div className="text-center text-4xl text-red-400 font-bold">
        No faculties found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      {faculties.map((faculty) => (
        <div
          key={faculty._id.toString()}
          className="flex bg-white p-5 rounded-md space-y-5 text-center flex-col items-center relative"
        >
          <div className="absolute bg-indigo-200 hover:bg-indigo-300 transition-colors duration-300 cursor-pointer font-black text-xl top-5 right-5 p-2 border rounded-md">
            <HiDotsHorizontal />
          </div>
          <Image
            className="rounded-full border-6 border-white"
            width={100}
            height={100}
            src={""}
            alt="Profile"
          />
          <div className="space-y-1">
            <h3 className="font-semibold">{"Faculty Name"}</h3>
            <p className="text-sm text-gray-500">Teacher</p>
            {/* <div className="flex gap-2 mt-3">
              <span className="px-2 border py-1 rounded-md bg-green-200 text-green-700 text-xs">
                Mathematics
              </span>
              <span className="px-2 border py-1 rounded-md bg-green-200 text-green-700 text-xs">
                Science
              </span>
              <span className="px-2 border py-1 rounded-md bg-green-200 text-green-700 text-xs">
                Art
              </span>
            </div> */}
            <span>{faculty.department}</span>
          </div>
          <div className="flex gap-5">
            <Link href={`teachers/${faculty._id.toString()}`}>
              <Button variant={"outline"}>Profile</Button>
            </Link>
            <Button>Chat</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
