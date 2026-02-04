'use client'

import { useEffect, useState } from 'react'

export default function RamadanWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = window.sessionStorage.getItem('ramadan_welcome_seen')
    if (!seen) {
      setIsOpen(true)
    }
  }, [])

  const closeModal = () => {
    window.sessionStorage.setItem('ramadan_welcome_seen', '1')
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
        <button
          type="button"
          onClick={closeModal}
          className="absolute left-4 top-4 text-slate-400 transition hover:text-slate-600"
          aria-label="إغلاق"
        >
          ✕
        </button>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl">
          🌙
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          كل عام وانت بخير بحلول شهر رمضان المبارك
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          استمتع بتجربة جديدة وأجواء رمضانية مميزة داخل بوابة الجمالية.
        </p>
        <button
          type="button"
          onClick={closeModal}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-night-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-night-700"
        >
          متابعة
        </button>
      </div>
    </div>
  )
}
