import Image from "next/image";
import postImg from "@/assets/1-Dk6LdeOL.jpg";

export default function Post({ type = "column" }: { type?: "column" | "row" }) {
  return (
    <>
      {type == "column" ? (
        <div className="w-full">
          <Image className="w-full mb-6" src={postImg} alt="post image" />
          <div>
            <h3 className="font-semibold mb-2">
              How To Get (A) Fabulous EDUCATION On A Tight Budget
            </h3>
            <p className="text-sm">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <div className="h-20 w-20 shrink-0">
            <Image
              className="w-full h-full rounded-md object-cover"
              src={postImg}
              alt="post image"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2 line-clamp-1">
              How To Get (A) Fabulous EDUCATION On A Tight Budget
            </h3>
            <p className="text-sm line-clamp-2">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
