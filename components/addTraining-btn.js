import { auth, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';


export default async function AddTraining() {
    const user = await currentUser();
    const isAdmin = user && user.emailAddresses.some(email => email.emailAddress === 'venkatsai2963@outlook.com');
    
   
    // Redirect non-admin user
    

    // Allow access to admin users

    return (
        <>
        { isAdmin &&
        (<div>
            <Link href='/new'>Add Training</Link>

        </div>)
        }
        
        </>
        
    );
}