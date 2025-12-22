"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { StudentInput, UserFromDB, UserResponse } from "@/lib/types";
import Image from "next/image";
import { FiMinus } from "react-icons/fi";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import ProfileImage from "@/components/profileImage";

export default function AddStudent() {
  const [data, setData] = useState<UserFromDB | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserFromDB | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<{
    searchUser?: boolean | null;
    submitForm?: boolean | null;
  }>({ searchUser: null, submitForm: null });
  const [image, setImage] = useState<null | string>(null);
  const imgRef = useRef<null | HTMLInputElement>(null);
  const session = useSession();

  useEffect(() => {
    if (selectedUser) return setError(null);

    const debounce = setTimeout(() => {
      if (!email) return setData(null);
      if (email.length < 5 || !email.includes("@")) {
        setError("Enter a valid email.");
        setData(null);
        return;
      }

      setError(null);

      async function getUserData(email: string) {
        try {
          setLoading({ searchUser: true });
          const res = await fetch(`/api/users/user/${email}`);
          if (!res.ok && res.status === 404)
            throw new Error("This method is unavailable");

          const userRes: UserResponse = await res.json();

          if (!userRes.success) {
            setData(null);
            setError(userRes.message);
            return;
          }

          if (userRes.data.role === "student") {
            setData(null);
            setError("User already promoted");
            return;
          }

          return setData(userRes.data);
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Unknown error happened while searching user data.";
          setError(message);
        } finally {
          setLoading({
            searchUser: false,
          });
        }
      }
      getUserData(email);
    }, 500);
    return () => clearTimeout(debounce);
  }, [email, selectedUser]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(e.currentTarget);
    const d = Object.fromEntries(data) as Record<string, string>;
    if (!selectedUser) return setError("Please select a user.");

    const student: StudentInput = {
      userId: selectedUser.id,
      phone: d.phoneNumber,
      department: d.department as
        | "Computer Science"
        | "Mathematics"
        | "Physics"
        | "Chemistry",
      address: d.address,
      currentSemester: d.semester as
        | "1st Semester"
        | "2nd Semester"
        | "3rd Semester",
      dateOfBirth: d.dateOfBirth,
    };
    console.log(student);

    async function submitForm(formDate: StudentInput) {
      try {
        setLoading({ submitForm: true });
        const res = await fetch(
          `/api/students/student?req-user=${session.data?.user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDate),
          }
        );

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        console.log(data);
        if (!data?.success) throw new Error(data.message);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User promoted successfully",
        });

        form.reset();
        setImage(null);
        setSelectedUser(null);
      } catch (error: unknown) {
        const errMsg =
          error instanceof Error ? error.message : "Unknown error happened.";
        Swal.fire({
          icon: "error",
          text: errMsg,
        });
        console.log(errMsg);
      } finally {
        setLoading({ submitForm: false });
      }
    }
    submitForm(student);
  }
  ////////////////

  // Need to update user role in the backend

  // //////////////////////

  return (
    <div className="rounded-md p-6 space-y-6 bg-white">
      {/* User search bar */}
      <div className="space-y-5">
        <h3 className="font-semibold border-b pb-2 border-b-gray-300">
          Select user to promote as a Student
        </h3>
        <div className="flex items-center gap-3">
          <h4>Find User: </h4>
          <div>
            <input
              onChange={(e) => {
                setError(null);
                setEmail(e.target.value);
              }}
              className="border px-3 py-1 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              placeholder="Search by email"
              type="email"
              name="user_searchbar"
              id="user_searchbar"
            />
            <div className="relative mt-1">
              <div className="bg-gray-200 h-10 absolute "></div>

              {loading.searchUser && (
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full absolute"></div>
                </div>
              )}

              {error && (
                <div className="text-sm text-start text-red-500 absolute left-3">
                  {error}
                </div>
              )}

              {data && (
                <div className="absolute w-full bg-transparent">
                  <div
                    onClick={() => {
                      setData(null);
                      setSelectedUser(data);
                    }}
                    className="border hover:cursor-pointer flex items-center px-2 py-1 rounded-md w-full gap-3 bg-gray-200"
                  >
                    {data.image ? (
                      <Image
                        className="rounded-full"
                        src={data.image}
                        width={30}
                        height={30}
                        alt="profile"
                      />
                    ) : (
                      <div className="border rounded-full max-w-max">
                        <div className="w-[30px] h-[30px] text-lg flex items-center justify-center">
                          {data.name.slice(0, 1)}
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold">{data.name}</h4>
                      <div className="text-sm -mt-1">
                        {data.role.toLowerCase()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {selectedUser && (
            <div className="border max-w-max hover:cursor-pointer flex items-center px-3 py-2 rounded-md w-full gap-3 bg-indigo-500/90 text-white relative">
              <div
                onClick={() => setSelectedUser(null)}
                className="absolute rounded-full border-2 border-red-500 bg-red-500 z-20 top-1 right-1 text-sm "
              >
                <FiMinus />
              </div>
              {selectedUser.image ? (
                <Image
                  className="rounded-full"
                  src={selectedUser.image}
                  width={40}
                  height={40}
                  alt="profile"
                />
              ) : (
                <div className="border rounded-full max-w-max">
                  <div className="w-[40px] h-[40px] text-lg flex items-center justify-center">
                    {selectedUser.name.slice(0, 1)}
                  </div>
                </div>
              )}
              <div>
                <h4 className="text-sm font-semibold">{selectedUser.name}</h4>
                <div className="text-sm">{selectedUser.email}</div>
              </div>
              <div>
                <div className="text-sm">
                  <span className="font-semibold">Role: </span>
                  {selectedUser.role.toLowerCase()}
                </div>
                <h4 className="text-sm">
                  <span className="font-semibold">Joined: </span>
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form field */}
      <div>
        <h3 className="font-semibold border-b pb-2 border-b-gray-300">
          Additional Information
        </h3>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-3">
        <ProfileImage image={image} setImage={setImage} imgRef={imgRef} />

        <div className="flex gap-5">
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="dateOfBirth" className="text-sm text-indigo-600">
              Date of birth<span className="text-red-600">*</span>
            </label>
            <input
              required
              max={new Date().toISOString().split("T")[0]}
              className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              placeholder="Last name"
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              onInvalid={(e) =>
                (e.target as HTMLSelectElement).setCustomValidity(
                  "Please select a date"
                )
              }
              onInput={(e) =>
                (e.target as HTMLSelectElement).setCustomValidity("")
              }
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="phoneNumber" className="text-sm text-indigo-600">
              Phone Number<span className="text-red-600">*</span>
            </label>
            <input
              required
              className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              placeholder="+123 456-7890"
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              onInvalid={(e) =>
                (e.target as HTMLSelectElement).setCustomValidity(
                  "Please enter a phone number"
                )
              }
              onInput={(e) =>
                (e.target as HTMLSelectElement).setCustomValidity("")
              }
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="department" className="text-sm text-indigo-600">
              Department<span className="text-red-600">*</span>
            </label>
            <select
              required
              className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              defaultValue={""}
              name="department"
              id="department"
              onInvalid={(e) =>
                (e.target as HTMLSelectElement).setCustomValidity(
                  "Please select a department"
                )
              }
              onInput={(e) =>
                (e.target as HTMLSelectElement).setCustomValidity("")
              }
            >
              <option disabled value="">
                Select department
              </option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="semester" className="text-sm text-indigo-600">
              Semester<span className="text-red-600">*</span>
            </label>
            <select
              required
              className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              defaultValue={""}
              name="semester"
              id="semester"
              onInvalid={(e) =>
                (e.target as HTMLSelectElement).setCustomValidity(
                  "Please select a semester"
                )
              }
              onInput={(e) =>
                (e.target as HTMLSelectElement).setCustomValidity("")
              }
            >
              <option disabled value="">
                Select semester
              </option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
            </select>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-1/2 space-y-2">
            <label htmlFor="address" className="text-sm text-indigo-600">
              Address<span className="text-red-600">*</span>
            </label>
            <input
              required
              className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              placeholder="New Street, Old York"
              name="address"
              id="address"
            />
          </div>
        </div>

        <Button className="mt-3" variant={"primary"}>
          {loading.submitForm ? (
            <>
              <span className="animate-spin border-white w-4 h-4 border-t-transparent border-2 rounded-full"></span>
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
