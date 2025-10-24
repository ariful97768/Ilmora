import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import img from "@/assets/1-Dk6LdeOL.jpg";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiLocationArrowOutline } from "react-icons/ti";
import { LuPaperclip } from "react-icons/lu";
export default function Chat() {
  const hour: number = new Date().getHours();
  const minute: number = new Date().getMinutes();
  const time: string = hour + ":" + minute;
  const isActive: boolean = true;
  const messages: Array<{
    isSender: boolean;
    name: string;
    message: Array<{ text: string; sentTime: string }>;
  }> = [
    {
      isSender: false,
      name: "Someone",
      message: [{ text: "hi", sentTime: "8:20" }],
    },
    {
      isSender: true,
      name: "Ariful",
      message: [
        { text: "hi", sentTime: "8:20" },
        { text: "hi", sentTime: "8:20" },
      ],
    },
    {
      isSender: false,
      name: "Someone",
      message: [{ text: "hi", sentTime: "8:20" }],
    },
    {
      isSender: true,
      name: "Ariful",
      message: [
        { text: "hi", sentTime: "8:20" },
        { text: "hi sf sfags sgasf gsdg sgs gsa gasdg", sentTime: "8:20" },
      ],
    },
    {
      isSender: false,
      name: "Someone",
      message: [
        { text: "hi", sentTime: "8:20" },
        { text: "hi", sentTime: "8:20" },
        {
          text: "hi sf sfags sgasf gsdg sgs gsa gsdg sgs gsa ga s dg",
          sentTime: "8:20",
        },
      ],
    },
  ];
  return (
    <div className="flex gap-[2px] h-[calc(100vh-65px)]">
      {/* Left sidebar */}
      <div className="bg-white hidden md:block scrollbar-thin px-2 overflow-y-auto shrink-0 w-3/8 space-y-7 py-7">
        {/* search button */}
        <div className="flex gap-2">
          <div className="flex gap-4 items-center border rounded-sm px-4 py-2 w-full">
            <IoSearch className="text-xl" />
            <input
              className="outline-none w-full"
              type="text"
              name="search"
              id="search"
              placeholder="Contacts"
            />
          </div>
          <button className="rounded-sm text-sm bg-indigo-500 p-3 text-white">
            <FaPlus />
          </button>
        </div>
        {/* all contacts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Contacts</h4>
            <span className="text-xs text-gray-600  hover:underline hover:cursor-pointer">
              View All
            </span>
          </div>
          <div className="flex gap-3 mx-auto pl-2">
            <div className="w-13 h-13 rounded-lg overflow-hidden">
              <Image
                className="border object-cover h-full w-full"
                src={img}
                alt="profile"
              />
            </div>
            <div className="w-13 h-13 rounded-lg overflow-hidden">
              <Image
                className="border object-cover h-full w-full"
                src={img}
                alt="profile"
              />
            </div>
            <div className="w-13 h-13 rounded-lg overflow-hidden">
              <Image
                className="border object-cover h-full w-full"
                src={img}
                alt="profile"
              />
            </div>
            <div className="w-13 h-13 rounded-lg overflow-hidden">
              <Image
                className="border object-cover h-full w-full"
                src={img}
                alt="profile"
              />
            </div>
            <div className="w-13 h-13 rounded-lg overflow-hidden">
              <Image
                className="border object-cover h-full w-full"
                src={img}
                alt="profile"
              />
            </div>
            <div className="w-13 h-13 rounded-lg overflow-hidden">
              <Image
                className="border object-cover h-full w-full"
                src={img}
                alt="profile"
              />
            </div>
          </div>
        </div>
        {/* groups */}
        <div className="space-y-2">
          <h4 className="font-semibold">Groups</h4>
          <div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
          </div>
        </div>
        {/* groups */}
        <div className="space-y-2">
          <h4 className="font-semibold">Groups</h4>
          <div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
          </div>
        </div>
        {/* groups */}
        <div className="space-y-2">
          <h4 className="font-semibold">Groups</h4>
          <div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
            <div className="flex items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    className="border object-cover h-full w-full"
                    src={img}
                    alt="profile"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Product Team (32)</h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div>{time}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Main chat area */}
      <div className="w-full px-5 bg-white flex flex-col">
        {/* profile info */}
        <div>
          <div className="flex border-b items-center justify-between hover:bg-accent transition-colors duration-100 py-2 rounded-md hover:cursor-pointer px-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-md overflow-hidden">
                <Image
                  className="border object-cover h-full w-full"
                  src={img}
                  alt="profile"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold">Product Team (32)</h4>
                <div className="flex items-center gap-2">
                  {isActive ? (
                    <p className="flex text-sm items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-400"></span>
                      online
                    </p>
                  ) : (
                    "offline"
                  )}
                </div>
              </div>
            </div>
            <div className="cursor-pointer font-black text-xl top-5 right-5 p-2 border rounded-md">
              <HiDotsHorizontal />
            </div>
          </div>
        </div>
        {/* messages container */}
        <div className="flex-1 scrollbar-thin overflow-y-auto py-4">
          <div className="pr-2">
            <div>
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    message.isSender ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-11 h-11 shrink-0 rounded-md overflow-hidden">
                    <Image
                      className="border object-cover h-full w-full"
                      src={img}
                      alt="profile"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3
                      className={`font-semibold ${
                        message.isSender ? "text-right" : "text-left"
                      }`}
                    >
                      {message.name}
                    </h3>
                    <div
                      className={`flex flex-col gap-1 ${
                        message.isSender ? "items-end" : ""
                      }`}
                    >
                      {message.message.map((text, i) => (
                        <p
                          key={i}
                          className={`flex items-end gap-2 w-max max-w-100 bg-indigo-200 py-2 px-4 rounded-md ${
                            message.isSender
                              ? "rounded-tr-none"
                              : "rounded-tl-none"
                          }`}
                        >
                          {text.text}
                          <span className="text-right text-xs">
                            {text.sentTime}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* input container */}
        <div className=" pb-3">
          <div className="flex space-x-2 px-2 py-2 border rounded-md">
            <input
              className="outline-none py-2 w-full"
              type="text"
              autoComplete="off"
              spellCheck="true"
              placeholder="Type a message"
              name="message"
              id="message"
            />
            <button className="bg-indigo-600/50 text-indigo-600 flex items-center font-bold px-2 py-2 rounded-md">
              <LuPaperclip className="rotate-180" size={20} />
            </button>
            <button className="bg-indigo-600 flex items-center text-white font-semibold px-3 py-1 rounded-md">
              <TiLocationArrowOutline size={30} /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
