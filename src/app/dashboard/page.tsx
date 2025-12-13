import { redirect } from "next/navigation";

export default function DashboardLayout() {
  return redirect('dashboard/profile');
};