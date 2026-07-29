export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "cinesync");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/njswhxoj/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();

  return data.secure_url;
}