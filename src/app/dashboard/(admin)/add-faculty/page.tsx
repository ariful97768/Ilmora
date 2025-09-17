"use client";

import { FormEvent, useEffect, useState } from "react";
import { Faculty, UserFromDB, UserResponse } from "@/lib/types";
import Image from "next/image";
import { FiMinus } from "react-icons/fi";
import { json } from "stream/consumers";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";

export default function AddTeacher() {
  const [data, setData] = useState<UserFromDB | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserFromDB | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<{
    searchUser?: boolean | null;
    submitForm?: boolean | null;
  }>({ searchUser: null, submitForm: null });

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
          return setData(userRes.data);
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Unknown error happened while searching user data.";
          console.log(error);
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
  }, [email]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const d = Object.fromEntries(data) as Record<string, string>;
    if (!selectedUser) return setError("Please select a user.");

    const faculty: Faculty = {
      userId: selectedUser.id,
      phone: d.phoneNumber,
      education: {
        degree: d.degree,
        startDate: d.startDate,
        endDate: d.endDate,
        university: d.university,
      },
      department: d.department as
        | "Computer Science"
        | "Mathematics"
        | "Physics"
        | "Chemistry",
      about: d.about,

      joiningDate: d.joiningDate,
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    async function submitForm(formDate: Faculty) {
      try {
        setLoading({ submitForm: true });
        const res = await fetch(`/api/faculties/faculty`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDate),
        });

        if (!res.ok) {
          throw new Error((await res.json()).message);
        }
        const data: {
          result: { acknowledged: boolean; insertedId: string };
        } | null = await res.json();
        if (!data?.result.insertedId)
          throw new Error("Failed to promote user.");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User promoted successfully",
        });
      } catch (error: unknown) {
        const errMsg =
          error instanceof Error ? error.message : "Unknown error happened.";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errMsg,
        });
        console.log(errMsg);
      } finally {
        setLoading({ submitForm: false });
      }
    }
    submitForm(faculty);
  }

  return (
    <div className="rounded-md p-6 space-y-6 bg-white">
      {/* User search bar */}
      <div className="space-y-5">
        <h3 className="font-semibold border-b pb-2 border-b-gray-300">
          Select user to promote as a faculty
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
                <div className="text-sm text-start text-red-400 absolute left-3">
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
            <label htmlFor="joiningDate" className="text-sm text-indigo-600">
              Joining date<span className="text-red-600">*</span>
            </label>
            <input
              required
              min={new Date().toISOString().split("T")[0]}
              className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              placeholder="Last name"
              type="date"
              name="joiningDate"
              id="joiningDate"
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
        </div>

        <div className="flex gap-5">
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
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="about" className="text-sm text-indigo-600">
              About<span className="text-red-600">*</span>
            </label>
            <textarea
              required
              className="border px-3 py-2 h-full max-h-25 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500 resize-none"
              placeholder="Tell us about yourself"
              name="about"
              id="about"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold border-b border-b-gray-300 mb-6 pb-2">
              Educational Details
            </h3>
          </div>
          <div className="flex gap-5">
            <div className="flex w-1/2 relative flex-col space-y-2">
              <label className="text-sm text-indigo-600" htmlFor="university">
                University<span className="text-red-600">*</span>
              </label>
              <input
                required
                className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                type="text"
                placeholder="eg: Major, University"
                name="university"
                id="university"
                onInvalid={(e) =>
                  (e.target as HTMLSelectElement).setCustomValidity(
                    "Please enter your major and university"
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLSelectElement).setCustomValidity("")
                }
              />
            </div>

            <div className="flex w-1/2 relative flex-col space-y-2">
              <label className="text-sm text-indigo-600" htmlFor="degree">
                Degree<span className="text-red-600">*</span>
              </label>
              <input
                required
                className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                type="text"
                placeholder="eg: Philosophy"
                name="degree"
                id="degree"
                onInvalid={(e) =>
                  (e.target as HTMLSelectElement).setCustomValidity(
                    "Please enter your degree"
                  )
                }
                onInput={(e) =>
                  (e.target as HTMLSelectElement).setCustomValidity("")
                }
              />
            </div>
          </div>

          <div>
            <div className="w-1/2 flex gap-5">
              <div className="flex w-1/2 relative flex-col space-y-2">
                <label className="text-sm text-indigo-600" htmlFor="startDate">
                  Start date<span className="text-red-600">*</span>
                </label>
                <input
                  required
                  className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  type="date"
                  name="startDate"
                  id="startDate"
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
              <div className="flex w-1/2 relative flex-col space-y-2">
                <label className="text-sm text-indigo-600" htmlFor="startDate">
                  Start date<span className="text-red-600">*</span>
                </label>
                <input
                  required
                  className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  type="date"
                  name="endDate"
                  id="endDate"
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
            </div>
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
