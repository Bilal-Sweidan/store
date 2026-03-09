"use client"

import { useState, ChangeEvent, FormEvent } from "react"

interface ClientData {
  name: string
  email: string
  phone: string
  password: string
  termsAccepted: boolean
}

export default function ClientRegister() {

  const [formData, setFormData] = useState<ClientData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    termsAccepted: false
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()

    const res = await fetch("/api/register/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    alert(data.message || "Registered")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        name="name"
        placeholder="Full Name"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          name="termsAccepted"
          required
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="mr-2"
        />
        <span className="text-sm text-gray-600">
          I accept the terms
        </span>
      </div>

      <button
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Register
      </button>

    </form>
  )
}