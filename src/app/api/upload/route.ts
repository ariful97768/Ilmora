import { TWO_MB } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return Response.json(
        { success: false, message: "Image is required" },
        { status: 400 },
      );
    }

    if (image.size > TWO_MB) {
      return Response.json(
        { success: false, message: `Image size must be less than ${TWO_MB}MB` },
        { status: 400 },
      );
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(image.type)) {
      return Response.json(
        { success: false, message: "Image must be jpg, jpeg or png" },
        { status: 400 },
      );
    }

    if (!process.env.IMGBB_API_KEY) {
      return Response.json(
        { success: false, message: "ImageBB API key not found" },
        { status: 500 },
      );
    }

    const imgFile = new FormData();
    imgFile.append("image", image);

    const result = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imgFile,
      },
    );

    if (!result.ok) {
      return Response.json(
        { success: false, message: "Failed to upload the image" },
        { status: 500 },
      );
    }

    const data = await result.json();
    return Response.json({
      success: true,
      message: "Image uploaded successfully",
      data,
    });
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : "Something bad happened while uploading the image";
    return Response.json({ success: false, message: msg }, { status: 500 });
  }
}
