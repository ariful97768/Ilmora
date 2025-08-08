import { auth } from "@/auth";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="border py-3 px-2 flex justify-end">
      {session?.user ? (
        <div>
          <span className="font-bold">Username </span> {session.user.name}
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
