'use client'
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Link  from 'next/link';
import PasswordStrengthBar from 'react-password-strength-bar';
import zxcvbn from 'zxcvbn'
import { usePathname, redirect } from 'next/navigation'


export default function SignUp() {
  const displayNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    const strength = zxcvbn(password).score;
    setPasswordStrength(strength);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (passwordRef.current && passwordRef.current instanceof HTMLInputElement && passwordRef.current.value.length < 8) {
      return setError('Password must be at least 8 characters long');
    }    
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
        return setError('Passwords do not match')
    }
    if (emailRef.current && passwordRef.current && displayNameRef.current){
      try {
        setError('')
        setLoading(true)
        await signUp(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value);
        redirect('/');
      } catch {
        setError('Failed to create an account')
      }

    setLoading(false)
    }
  } 
  
  return (
    <div >
        <div className="anotherDanger" >Sign Up</div>
        {error && <div >{error}</div>}
        <form  onSubmit={handleSubmit}>
            <div >
                <label htmlFor="displayName">Display Name</label>
                <input type="displayName" id="displayName" ref={displayNameRef}  required />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={emailRef} required />
            </div>
            <div>
                <label htmlFor="password" >Password</label>
                <input type="password" id="password" ref={passwordRef} onChange={handlePasswordChange} required />
                <PasswordStrengthBar password={passwordRef.current?.value} />
            </div>
            <div>
                <label htmlFor="passwordConfirm" >Confirm Password</label>
                <input type="passwordConfirm" id="passwordConfirm" ref={passwordConfirmRef}  required />
            </div>
            <div>
                <button disabled={loading} type="submit">
                Create Account
                </button>
            </div>
          
        </form>
        <div>
            Already have an account? <Link className="anotherDanger"  href="/auth/signIn">Sign In</Link>
        </div>
    </div>
  )
}