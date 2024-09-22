'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
  }

  const { data: authData, error: signUpError } = await supabase.auth.signUp(data)

  if (signUpError) {
    return { error: signUpError.message }
  }

  if (authData.user) {
    const userId = await addUserInfo(authData.user.id, data)
    if (!userId) {
      return { error: 'Failed to create user profile' }
    }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut({ scope: 'local' })

  if (error) {
    console.error(error)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

async function addUserInfo(userId: string, userData: { email: string; name: string; phone: string }) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .insert({
      auth_id: userId,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Error adding user info:', error)
    return null
  }

  return data.id
}

export async function getUserId(authId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', authId)
    .single()

  if (error) {
    console.error('Error fetching user id:', error)
    return null
  }

  return data.id
}