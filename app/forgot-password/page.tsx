'use client'
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Link  from 'next/link';
import { usePathname, redirect } from 'next/navigation'

export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [ message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(emailRef.current){
            try {
                setMessage('')
                setError("")
                setLoading(true)
                await resetPassword(emailRef.current.value)
                setMessage('Check your inbox for further instructions')
            } catch {
                setError('Failed to reset password')
            }
            setLoading(false)
        }
    }

    return (
        <div >
        <div className="anotherDanger" >Password Reset</div>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <form  onSubmit={handleSubmit}>
            <div >We will send you a link via email to change your password.  Please submit the email associated with your account.</div>
            <div >
                <label htmlFor="email" >Email</label>
                <input type="email" id="email" ref={emailRef}  required />
            </div>
            <div >
                <button disabled={loading} type="submit">
                Submit Email
                </button>
            </div>
        </form>
        <div >
            <Link className="anotherDanger"  href="/auth/signIn">Sign In</Link>
        </div>
    </div>
    )
}