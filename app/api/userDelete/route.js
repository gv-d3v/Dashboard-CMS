import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    try {
        await connectMongoDB();
        const id = await req.json();

        await User.deleteOne({ _id: id });

        return NextResponse.json(true);
        
    } catch (error) {
        console.log(error);
    }
}
