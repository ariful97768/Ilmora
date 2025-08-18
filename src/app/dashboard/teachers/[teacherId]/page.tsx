import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Image from "next/image";
import Follow from "./follow-button";
import Link from "next/link";
import Post from "@/components/post";
import bgImg from "@/assets/backgroung-akademi.jpg";
export default async function TeacherDetails({
  params,
}: {
  params: Promise<{ teacherId: string }>;
}) {
  const session: Session | null = await auth();
  const userId: string = (await params).teacherId;
  const txt = `A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. \nA collection of textile samples lay spread out on the table - Mitchel was a traveling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.`;
  const skills: string[] = ["Mathematics", "Science", "Art"];
  const languages: string[] = ["English", "Bangla", "French"];
  return (
    <div className="mx-auto py-10 flex flex-col">
      <div>
        <div
          style={{ backgroundImage: `url(${bgImg.src})` }}
          className="border min-h-50 bg-cover bg-center relative rounded-t-md px-10 pt-8"
        >
          <Image
            className="rounded-full absolute -bottom-10 left-7 z-10"
            width={100}
            height={100}
            src={session?.user?.image ?? "/default-profile.png"}
            alt="Profile"
          />
        </div>
        <div className="pr-7 py-6 pl-37 space-y-5 rounded-t-md rounded-b-md bg-white">
          <div className="flex gap-10">
            <div>
              <h3 className="text-xl font-bold">
                {session?.user?.name + " " + userId}
              </h3>
              <p className="text-sm">Teacher</p>
            </div>
            <div>
              <h3 className="text-medium">{session?.user?.email}</h3>
              <p className="text-sm">Admin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex gap-7">
        {/* About section */}
        <div className="md:w-2/3 px-7 py-5 mt-7 rounded-md bg-white">
          <div className="space-y-2 mb-9">
            <h3 className="text-lg font-semibold">About me</h3>
            <div className="whitespace-pre-line space-y-2">
              {txt.split("\n").map((item, idx) => (
                <p className="text-sm" key={idx}>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-2 mb-7">
            <h4 className="text-lg font-semibold">Skills</h4>
            <div className="flex gap-1">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-1 text-xs font-semibold bg-amber-400 border rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2 mb-7">
            <h4 className="text-lg font-semibold">Language</h4>
            <div className="flex gap-1">
              {languages.map((language, i) => (
                <span
                  key={i}
                  className="px-4 py-1 text-xs font-semibold bg-amber-400 border rounded-md"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4 mb-9">
            <h4 className="text-lg font-semibold">Personal Information</h4>
            <div className="space-y-1">
              <div className="flex">
                <p className="font-semibold min-w-50">Name:</p>
                <p className="text-sm text-gray-800">Mitchell C.Shay</p>
              </div>
              <div className="flex">
                <p className="font-semibold min-w-50">Email:</p>
                <p className="text-sm text-gray-800">example@examplel.com</p>
              </div>
              <div className="flex">
                <p className="font-semibold min-w-50">Availability:</p>
                <p className="text-sm text-gray-800">Full Time</p>
              </div>
              <div className="flex">
                <p className="font-semibold min-w-50">Age:</p>
                <p className="text-sm text-gray-800">27</p>
              </div>
              <div className="flex">
                <p className="font-semibold min-w-50">Location:</p>
                <p className="text-sm text-gray-800">
                  Rosemont Avenue Melbourne, Florida
                </p>
              </div>
              <div className="flex">
                <p className="font-semibold min-w-50">Year Experience:</p>
                <p className="text-sm text-gray-800">07 Year Experiences</p>
              </div>
            </div>
          </div>
        </div>
        {/* Blogs section */}
        <div className="md:w-1/3 space-y-7 mt-7">
          <div className="space-y-5 px-7 py-7 rounded-md bg-white">
            <div className="flex justify-around">
              <div className="flex flex-col items-center ">
                <span className="text-xl font-semibold">150</span>
                <p className="text-xs font-semibold text-gray-600">Follower</p>
              </div>
              <div className="flex flex-col items-center ">
                <span className="text-xl font-semibold">140</span>
                <p className="text-xs font-semibold text-gray-600">
                  Place Stay
                </p>
              </div>
              <div className="flex flex-col items-center ">
                <span className="text-xl font-semibold">25</span>
                <p className="text-xs font-semibold text-gray-600">Reviews</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <Follow />
              <Link href={`?message=true&to=${userId}`}>
                <Button className="bg-indigo-600 text-white hover:bg-indigo-500 hover:cursor-pointer">
                  Send Message
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-7">
            <div className="flex flex-col gap-7 rounded-md bg-white p-6 ">
              <h4 className="font-semibold text-lg">Todays Highlight</h4>
              <Post />
            </div>
            <div className="rounded-md p-7 bg-white space-y-7">
              <h4 className="font-semibold text-lg">Our Latest Blogs</h4>
              <Post type="row" />
              <Post type="row" />
              <Post type="row" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
