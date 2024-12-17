"use server";

export async function createSong(formData: FormData) {
  const childName = formData.get("childName");
  const genre = formData.get("genre");
  const theme = formData.get("theme");

  if (!childName || !genre || !theme) {
    return { error: "Missing required information." };
  }

  return {
    song: `A ${genre} classic for ${childName}, telling a story about ${theme}.`
  };
}
