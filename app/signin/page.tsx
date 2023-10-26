'use client'
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePathname, redirect } from 'next/navigation'
import Link  from 'next/link';

export default function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      try {
        setError('');
        setLoading(true);
        await signIn(emailRef.current.value, passwordRef.current.value);
        redirect('/player');
      
        
      } catch {
        setError('Failed to log in');
      }

      setLoading(false);
    }
  }


  return (
    <div>
        <div className="">Sign In</div>
        {error && <div>{error}</div>}
        <form  onSubmit={handleSubmit}>
            <div >
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    ref={emailRef} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    ref={passwordRef} 
                    required 
                />
            </div>
            <div>
                <button disabled={loading} type="submit">
                Sign In
                </button>
            </div>
          
        </form>
        <div>
            <Link className=""  href="/forgot-password">Forgot Password?</Link>
        </div>
        <div>
            Need an account? <Link className=""  href="/signup">Sign Up</Link>
        </div>
    </div>
  );
}
