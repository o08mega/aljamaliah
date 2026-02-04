"use client"

import { useFormState } from "react-dom"
import { submitAdRequest } from "./actions"

type State = {
  message?: string
  error?: string
}

const initialState: State = {}

export default function AdRequestForm() {
  const [state, formAction] = useFormState<State, FormData>(submitAdRequest, initialState)

  return (
    <form action={formAction} className="card mt-8 space-y-4 p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          placeholder="الاسم"
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-night-500"
        />
        <input
          name="phone"
          placeholder="رقم الهاتف"
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-night-500"
        />
      </div>
      <input
        name="title"
        placeholder="عنوان الإعلان"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-night-500"
      />
      <textarea
        name="body"
        placeholder="وصف الإعلان"
        rows={4}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-night-500"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="link_url"
          placeholder="رابط الإعلان"
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-night-500"
        />
        <input
          name="image_url"
          placeholder="رابط الصورة (اختياري)"
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-night-500"
        />
      </div>
      {state?.error && <p className="text-sm text-rose-600">{state.error}</p>}
      {state?.message && <p className="text-sm text-emerald-600">{state.message}</p>}
      <button
        type="submit"
        className="rounded-full bg-night-600 px-6 py-3 text-sm font-semibold text-white hover:bg-night-700"
      >
        إرسال الطلب
      </button>
    </form>
  )
}
