import { auth } from "@/auth";
import Messages from "@/components/messages";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

const Profile = async () => {
  const session = await auth();
  return (
    <div className="mx-auto pb-10 relative flex flex-col mt-10">
      <Image
        className="rounded-full absolute border-6 border-white top-20 left-7 z-10"
        width={130}
        height={130}
        src={session?.user?.image ?? "/default-profile.png"}
        alt="Profile"
      />
      <div className="bg-indigo-600 rounded-t-md px-10 pt-8">
        <div className="relative h-28 w-full">
          <svg
            className="absolute right-25 bottom-0"
            width="261"
            height="63"
            viewBox="0 0 261 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="261" height="275.13" rx="130.5" fill="#FB7D5B"></rect>
          </svg>
          <svg
            className="absolute right-0 bottom-0  "
            width="261"
            height="109"
            viewBox="0 0 261 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="0.6521"
              width="261"
              height="275.13"
              rx="130.5"
              fill="#FCC43E"
            ></rect>
          </svg>
        </div>
      </div>
      <div className="rounded-t-md space-y-5 bg-white px-7 pt-16 pb-7 rounded-b-md">
        <div className="mt-6">
          <h3 className="text-2xl font-bold">{session?.user?.name}</h3>
          <p className="text-sm">Admin</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 ">
            <span className="bg-[#FB7D5B] text-white p-3 rounded-full">
              <FaRegUser size={24} />
            </span>
            <div>
              <span className="text-sm text-gray-600">Parents:</span>
              <h3 className="font-semibold leading-5 text-gray-900">
                Justin Hope
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <span className="bg-[#FB7D5B] text-white p-3 rounded-full">
              <SlLocationPin size={24} />
            </span>
            <div>
              <span className="text-sm text-gray-600">Address:</span>
              <h3 className="font-semibold leading-5 text-gray-900">
                Jakarta, Indonesia
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <span className="bg-[#FB7D5B] text-white p-3 rounded-full">
              <FiPhone size={24} />
            </span>
            <div>
              <span className="text-sm text-gray-600">Phone:</span>
              <h3 className="font-semibold leading-5 text-gray-900">
                +12 345 6789 0
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <span className="bg-[#FB7D5B] text-white p-3 rounded-full">
              <MdOutlineMail size={24} />
            </span>
            <div>
              <span className="text-sm text-gray-600">Email:</span>
              <h3 className="font-semibold leading-5 text-gray-900">
                {session?.user?.email || "Email not found"}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-8">
        <Messages session={session} />
        <Messages session={session} />
      </div>
    </div>
  );
};

export default Profile;
