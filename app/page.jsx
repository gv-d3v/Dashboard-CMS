import LoginForm from '@/components/LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

export default async function Home() {

    if (process.env.NODE_ENV === 'production') {
        disableReactDevTools();
      }

    const session = await getServerSession(authOptions);
    if (session) redirect('/dashboard');
    return (
        <div>
            <LoginForm />
        </div>
    );
}
