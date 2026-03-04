type User = {
  readonly _id: string;
  name: string;
};
export default async function ManageUsers() {
  const users: { message: string; allUsers: User[] } = await (
    await fetch("http://localhost:3000/api/users")
  ).json();
  console.log(users);
  return (
    <div>
      manage users status: {users.message} users: {users.allUsers.length}
    </div>
  );
}
