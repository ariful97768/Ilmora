import Image from "next/image";
import { FaCameraRotate } from "react-icons/fa6";
import noImg from "@/assets/no-img-avatar.png";
export default function UpdateImage({ image }: { image: string | undefined }) {
  return (
    <div className="relative group h-25 w-25">
      <Image
        src={image || noImg}
        fill
        className="object-cover w-full h-full rounded-full"
        alt="profile"
      />
      <div className="absolute text-white border-2 border-white bg-[#395ee2] p-1 rounded-full bottom-0 right-0 z-50">
        <FaCameraRotate size={16} />
      </div>
    </div>
  );
}
