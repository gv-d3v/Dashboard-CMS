import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { _id, name, email, password, imageUrl, role } = await req.json();
        
        await connectMongoDB();

        let updateFields = {
            $set: {
                name,
                email,
                imageUrl,
                role,
            },
        };

        // Check if the password is provided and not an empty string
        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.$set.password = hashedPassword;
        }

        const user = await User.findOneAndUpdate(
            { _id }, 
            updateFields,
        );

        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}
