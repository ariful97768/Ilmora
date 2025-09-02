import Link from "next/link";

const Sidebar = () => {
  return (
    <div>
      <h1 className="font-semibold text-2xl">
        <span>{"Student"}</span> Dashboard
      </h1>
      <div className="flex mt-5 flex-col  gap-2">
        <Link className="hover:underline" href="/dashboard/profile">Profile</Link>
        <Link className="hover:underline" href="/dashboard/classes">
          Classes
        </Link>
        <Link className="hover:underline" href="/dashboard/teachers">
          Teachers
        </Link>
        <Link className="hover:underline" href="/dashboard/parents">
          Parents
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
