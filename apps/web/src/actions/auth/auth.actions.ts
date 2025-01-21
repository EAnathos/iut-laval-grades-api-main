'use server'

import { signOut as legacySignOut, signIn as legacySignIn } from '@web/lib/auth'

type SignOutProps = Parameters<typeof legacySignOut>[0]

export const signOutAction = async (props: SignOutProps) => {
  await legacySignOut(props)
}

type SignInProps = {
  email: string
  password: string
  redirect?: boolean
  redirectTo?: string
}

export const signInAction = async (provider: string, props: SignInProps) => {
  await legacySignIn(provider, {...props })
}