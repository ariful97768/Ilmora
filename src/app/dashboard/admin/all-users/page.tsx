import Image from "next/image";
import { auth } from "@/auth";
import getAllUsers from "@/lib/backend-actions/get-all-users";
import { redirect } from "next/navigation";
import defaultImg from "@/assets/no-img-avatar.png";
import AllUserAction from "@/components/all-user-action";

export default async function AllUsers() {
  const session = await auth();
  if (!session?.user.email) redirect("/login");
  const users = await getAllUsers({ email: session?.user.email });

  return (
    <div className="min-h-screen">
      <div className="overflow-x-auto bg-white rounded-md">
        <table className="table table-xs md:table-sm overflow-x-auto">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last updated</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                className="border-b border-gray-300 border-collapse"
                key={user._id.toString()}
              >
                <th>{idx + 1}</th>
                <td className="overflow-hidden">
                  <Image
                    height={40}
                    width={40}
                    className="rounded-full  object-cover"
                    src={user.image || defaultImg}
                    alt="Avatar Tailwind CSS Component"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role.toUpperCase()}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <AllUserAction />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
