'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <div className="m-20">
            Not signed in <br />
            <button className="bg-neutral-300 text-black rounded-md p-2" onClick={() => signIn()}>Sign in</button>
        </div>
    )
}