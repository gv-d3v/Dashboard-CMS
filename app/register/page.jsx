import RegisterForm from '@/components/RegisterForm'
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';


export default async function Register() {
  const session = await getServerSession(authOptions)
  return (
    <RegisterForm />
  )
}
