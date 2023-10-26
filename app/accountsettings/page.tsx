'use client'
import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import Link  from 'next/link';
import { useUserData } from '../context/UserContext';
import { usePathname, redirect } from 'next/navigation'

export default function AccountSettings() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const displayNameRef = useRef<HTMLInputElement>(null);
    const { currentUser, updateEmail, updatePassword, updateDisplayName} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUserData()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")
        if (emailRef.current?.value !== currentUser?.email){
            promises.push(updateEmail(emailRef.current?.value ?? ''))
        }

        if (passwordRef.current?.value){
            promises.push(updatePassword(passwordRef.current?.value))
        }

        if (displayNameRef.current?.value !== currentUser?.displayName){
            promises.push(updateDisplayName(displayNameRef.current?.value ?? ''))
        }

        Promise.all(promises).then(()=> {
            if(user?.gameMaster) {
                redirect("/gameMaster")
            } else {
                redirect("/player")
            }
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
           setLoading(false)
        })
    }

    function handleRoute() {
        if(user?.gameMaster) {
            return "/gamemaster"
        } else {
            return "/player"
        }
    }

    return (
        <>
            <div >
                
                    <div className="anotherDanger" >Update Profile</div>
                    {error && <div>{error}</div>}
                    <form  onSubmit={handleSubmit} >
                        <div >
                            <label>Email</label>
                            <input type="text" ref={emailRef} required
                            defaultValue={currentUser?.email ?? ''} />
                        </div>
                        <div >
                            <label>Password</label>
                            <input type="text" ref={passwordRef} 
                             placeholder="Leave blank to keep same password"/>
                        </div>
                        <div >
                            <label>Password Confirmation</label>
                            <input type="text" ref={passwordConfirmRef} 
                            placeholder="Leave blank to keep same password" />
                        </div>
                        <div >
                            <label>Display Name</label>
                            <input type="text" ref={displayNameRef} 
                            defaultValue={currentUser?.displayName ?? ''} />
                        </div>
                        <div >
                            <button disabled={loading} className="w-100" type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                <div>
                    <Link className="anotherDanger" href={handleRoute()}>Cancel</Link>              
                </div> 
            </div>  
        </>
    )
}
