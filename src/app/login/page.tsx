'use client'

import { authenticate } from '@/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (
        <form action={dispatch}>
            <Input type="email" name="email" placeholder="Email" required />
            <Input type="password" name="password" placeholder="Password" required />
            <div>{errorMessage ? <p>{errorMessage}</p> : null}</div>
            <LoginButton />
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button aria-disabled={pending} type="submit">
            Login
        </Button>
    )
}
