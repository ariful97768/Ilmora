"use client";
import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUser,
  FaUserCircle,
  FaUserGraduate,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { Session } from "next-auth";
import { HiSpeakerphone } from "react-icons/hi";
import { useEffect, useState } from "react";

const Sidebar = ({ session }: { session: Session }) => {
  const [fullWidth, setFullWidth] = useState(false);
  useEffect(() => {
    setFullWidth(window.innerWidth > 768);
  }, []);
  return (
    <aside
      className={`${
        fullWidth ? "md:w-1/5 px-7" : "w-1/12 px-3"
      } bg-indigo-700/90 sticky top-0 transform duration-500 h-screen `}
    >
      <div className="h-full text-white">
        <div className="flex items-center relative py-2 justify-center">
          <Link href="/dashboard/profile">
            <h1 className="font-bold text-4xl flex items-center gap-1">
              <FaGraduationCap className="text-5xl" />
              ILMORA
            </h1>
          </Link>
          <div
            onClick={() => setFullWidth(!fullWidth)}
            className="h-3 w-3 bg-red-400 absolute top-8 right-0 z-10"
          ></div>
        </div>

        <div className="flex gap-4 mt-5 flex-col">
          {/* admin */}
          {/* <Link  className="flex gap-2 items-center text-gray-100" href="/dashboard/">
          <HiViewGridAdd />
          Dashboard
        </Link> */}
          <Link
            className="flex gap-2 items-center text-gray-100"
            href="/dashboard/profile"
          >
            <FaUserCircle size={fullWidth ? 18 : 24} />{" "}
            <span className={`${fullWidth ? "block" : "hidden"}`}>Profile</span>
          </Link>
          {/* User routes */}
          {session?.user.role === "student" && (
            <>
              <Link
                className="flex gap-2 items-center text-gray-100"
                href="/dashboard/teachers"
              >
                <FaUserGraduate />{" "}
                <span className={`${fullWidth ? "block" : "hidden"}`}>
                  Teachers
                </span>
              </Link>
              <Link
                className="flex gap-2 items-center text-gray-100"
                href="/dashboard/class"
              >
                <FaChalkboardTeacher size={fullWidth ? 18 : 24} />
                Class
              </Link>
              <Link
                className="flex gap-2 items-center text-gray-100"
                href="/dashboard/notice"
              >
                <HiSpeakerphone size={fullWidth ? 18 : 24} />
                Notice
              </Link>
            </>
          )}
          <Link
            className="flex gap-2 items-center text-gray-100"
            href="/dashboard/classes"
          >
            <FaChalkboardTeacher size={fullWidth ? 18 : 24} />{" "}
            <span className={`${fullWidth ? "block" : "hidden"}`}>Classes</span>
          </Link>

          <Link
            className="flex gap-2 items-center text-gray-100"
            href="/dashboard/admin/all-students"
          >
            <FaGraduationCap size={fullWidth ? 18 : 24} />{" "}
            <span className={`${fullWidth ? "block" : "hidden"}`}>
              Students
            </span>
          </Link>

          <Link
            className="flex gap-2 items-center text-gray-100"
            href="/dashboard/admin/all-users"
          >
            <FaUser size={fullWidth ? 18 : 24} />{" "}
            <span className={`${fullWidth ? "block" : "hidden"}`}>Users</span>
          </Link>

          <Link
            className="flex gap-2 items-center text-gray-100"
            href="/dashboard/chat"
          >
            <MdMessage size={fullWidth ? 18 : 24} />{" "}
            <span className={`${fullWidth ? "block" : "hidden"}`}>Chat</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
