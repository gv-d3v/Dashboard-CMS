export const GetAccommodations = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "..";

  //const production = '..'

  try {
    const resAccommodationExists = await fetch(`${apiBaseUrl}/api/accommodationShow`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!resAccommodationExists.ok) {
      throw new Error(`Failed to fetch accommodation data: ${resAccommodationExists.status}`);
    }

    const data = await resAccommodationExists.json();
    return data.accommodation || [];
  } catch (error) {
    console.error("Error fetching Accommodation data:", error);
    return [];
  }
};
