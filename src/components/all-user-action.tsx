"use client";

import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <BsThreeDots
        onClick={() => setOpen(!open)}
        size={20}
        className="ml-2 hover:cursor-pointer"
      />

      <div
        className={`absolute ${
          open ? "flex" : "hidden"
        } top-5 flex-col -left-10 bg-white text-sm font-semibold py-3 w-30 rounded-md shadow-lg z-10000`}
      >
        <span className="px-3 hover:cursor-pointer hover:bg-gray-100 py-2">
          Edit
        </span>
        <span className="px-3 hover:cursor-pointer hover:bg-gray-100 py-2">
          Deactivate
        </span>
        <span className="px-3 hover:cursor-pointer hover:bg-red-500 text-black hover:text-white py-2">
          Delete
        </span>
      </div>
    </div>
  );
}
