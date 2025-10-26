"use client";
import Image from "next/image";
import noImageAvatar from "@/assets/no-img-avatar.png";
import { Dispatch, RefObject, SetStateAction } from "react";

export default function ProfileImage({
  imgRef,
  image,
  setImage,
}: {
  imgRef: RefObject<HTMLInputElement | null>;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <div className="space-y-2">
      <div
        id="image"
        className="bg-[#F6F9FF] flex flex-col items-center justify-center gap-2 rounded-md w-20 h-20"
      >
        {image ? (
          <Image
            className="object-cover shrink-0 rounded-md overflow-hidden w-full h-full"
            src={image}
            width={80}
            height={80}
            alt="profile"
          />
        ) : (
          <div>
            <div className="rounded-md w-full h-full">
              <Image
                src={noImageAvatar}
                width={80}
                height={80}
                alt="Upload image"  
              />
            </div>
            <input
              onChange={(e) =>
                e?.target?.files?.[0] &&
                setImage(URL.createObjectURL(e?.target?.files?.[0]))
              }
              hidden
              accept="image/jpeg, image/png"
              type="file"
              ref={imgRef}
            />
          </div>
        )}
      </div>
      <div className=" flex items-center gap-2">
        <button
          onClick={() => imgRef?.current?.click()}
          type="button"
          className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold"
        >
          Choose image
        </button>
        <button
          onClick={() => setImage(null)}
          type="button"
          className="px-3 py-2 rounded-md bg-red-200 text-red-500 hover:bg-red-500 hover:text-white duration-300 text-xs font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
