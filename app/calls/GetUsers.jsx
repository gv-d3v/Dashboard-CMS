export const GetUsers = async () => {
  try {
    const resUserExists = await fetch(`/api/team/userShow`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resUserExists.ok) {
      throw new Error(`Failed to fetch user data: ${resUserExists.status}`);
    }

    const data = await resUserExists.json();

    return data.user || [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};
