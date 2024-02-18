export const GetUsers = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "..";

  //const production = '..'

  try {
    const resUserExists = await fetch(`${apiBaseUrl}/api/userShow`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!resUserExists.ok) {
      throw new Error(`Failed to fetch user data: ${resUserExists.status}`);
    }

    const data = await resUserExists.json();
    return data.user || [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    //console.log(apiBaseUrl)
    return [];
  }
};
