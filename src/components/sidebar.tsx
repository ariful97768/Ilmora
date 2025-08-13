const Sidebar = () => {
  return (
    <div>
      <h1 className="font-semibold text-2xl">
        <span>{"Student"}</span> Dashboard
      </h1>
      <div className="flex mt-5 flex-col  gap-2">
        <a className="hover:underline" href="/dashboard/profile">
          Profile
        </a>
        <a className="hover:underline" href="/dashboard/classes">
          Classes
        </a>
        <a className="hover:underline" href="/dashboard/teachers">
          Teachers
        </a>
        <a className="hover:underline" href="/dashboard/parents">
          Parents
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
