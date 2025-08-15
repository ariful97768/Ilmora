import { Session } from "next-auth";
import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { VscMail } from "react-icons/vsc";

const Messages = ({ session }: { session: Session | null }) => {
  const count = [1, 2, 3, 4, 5];
  return (
    <div className="bg-white space-y-4 w-full px-6 py-5 rounded-md">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h3 className="font-semibold">Contacts</h3>
            <p className="text-xs font-medium text-gray-500">
              You have <span className="font-bold">50</span> contacts
            </p>
          </div>
          <div>
            <button className="rounded-full text-sm bg-indigo-500 p-3 text-white">
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="flex gap-4 items-center border rounded-md px-4 py-2">
          <IoSearch className="text-xl" />
          <input
            className="outline-none w-full"
            type="text"
            name="search"
            id="search"
            placeholder="Contacts"
          />
        </div>
      </div>
      <div className="space-y-3">
        {count.map((item) => (
          <React.Fragment key={item}>
            <div className="flex hover:cursor-pointer items-center justify-between">
              <div className="flex gap-3 items-center">
                <Image
                  className="rounded-full"
                  src={session?.user?.image ?? "/default-profile.png"}
                  width={43}
                  height={43}
                  alt="Profile"
                />
                <div className="space-y-1">
                  <h3 className="font-semibold">
                    {session?.user?.name || "Name not found"}
                  </h3>
                  <p className="text-xs font-medium text-gray-500">
                    Class VIII-A
                  </p>
                </div>
              </div>
              <span className="text-2xl rounded-full p-2 border transition-all duration-300 hover:bg-indigo-500 hover:text-white">
                <VscMail />
              </span>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Messages;
