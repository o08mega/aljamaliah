"use client"

import { useFormState } from "react-dom"
import { signIn } from "./actions"

type State = {
  error?: string
}

const initialState: State = {}

export default function LoginForm() {
  const [state, formAction] = useFormState<State, FormData>(signIn, initialState)

  return (
    <form action={formAction} className="card mt-8 space-y-4 p-8">
      <input
        name="email"
        type="email"
        placeholder="البريد الإلكتروني"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-night-500"
      />
      <input
        name="password"
        type="password"
        placeholder="كلمة المرور"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-night-500"
      />
      {state?.error && <p className="text-sm text-rose-600">{state.error}</p>}
      <button
        type="submit"
        className="w-full rounded-full bg-night-600 px-6 py-3 text-sm font-semibold text-white hover:bg-night-700"
      >
        تسجيل الدخول
      </button>
    </form>
  )
}
