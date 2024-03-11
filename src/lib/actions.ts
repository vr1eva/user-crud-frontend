"use server"

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'

export async function authenticate(_currentState: unknown, formData: FormData) {
    const signInQuery = `
        mutation SignIn($username: String!, $password: String!) {
            signIn(username: $username, password: $password) {
                id
            }
        }
      `;
    const graphqlEndpoint = "http://localhost:8500/graphql"
    const username = formData.get("username")
    const password = formData.get("password")
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': `application/json`
        },
        body: JSON.stringify({
            query: signInQuery,
            variables: {
                username,
                password
            }
        }),
    };

    fetch(graphqlEndpoint, fetchOptions)
        .then(response => {
            return response.json()
        }).then(data => {
            const { id } = data.data.signIn
            if (id) {
                cookies().set({
                    name: 'authId',
                    value: id,
                    httpOnly: true,
                    path: '/',
                })
                revalidatePath("/")
            }

        }).catch(error => {
            console.error('Error during fetch:', error);
        })
}