import { TWO_MB } from "@/lib/utils";
export async function uploadImage(image: File) {
  try {
    // TWO_MB variable is imported from utils.ts file so that updating there will change the limit on the /api/upload route as well
    if (image.size > TWO_MB)
      throw new Error(`Image size must be less then ${TWO_MB}MB`);

    if (
      image.type !== "image/jpeg" &&
      image.type !== "image/png" &&
      image.type !== "image/jpg"
    ) {
      throw new Error("Image must be jpg, jpeg or png");
    }

    const imageFile = new FormData();
    imageFile.append("image", image);

    // Fetch api route
    const result = await fetch("/api/upload", {
      method: "POST",
      body: imageFile,
    });

    if (!result.ok)
      return { success: false, message: "Failed to upload image" };

    const data = await result.json();

    return {
      success: true,
      message: "Image uploaded successfully",
      data: { url: data.data.data.url, time: data.data.data.time },
    };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Failed to upload image";
    return { success: false, message: msg };
  }
}
