import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { userId, name, email, password, images, role } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ userId, name, email, password: hashedPassword, images, role });

        return NextResponse.json(
            { message: 'User registered.' },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Error occured during registration' },
            { status: 500 }
        );
    }
}
