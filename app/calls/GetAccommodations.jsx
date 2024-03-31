export const GetAccommodations = async () => {
  try {
    const resAccommodationExists = await fetch(`/api/content/accommShow`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
