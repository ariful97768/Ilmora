import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="border bg-white py-3 sticky top-0 z-50 px-2 flex justify-end">
      {session?.user ? (
        <div className="flex gap-3 items-center">
          <span className="font-bold">Username </span> {session.user.name}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant={"ghost"}>Logout</Button>
          </form>
        </div>
      ) : (
        <Button variant={"link"}>
          <a href="/login">Login</a>
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
