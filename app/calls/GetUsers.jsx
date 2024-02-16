let people = [];

export const GetUsers = async () => {
    try {
        const resUserExists = await fetch('../api/userShow', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const { user } = await resUserExists.json();

        people = [];
        people.push(...user);
        return people;
    } catch (error) {
        console.log(error);
    }
};
