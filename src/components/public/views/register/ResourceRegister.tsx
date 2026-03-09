"use client"

import { useState, ChangeEvent, FormEvent } from "react"

interface ResourceData {

  companyName: string
  managerName: string
  managerEmail: string
  managerNumber: string
  email: string
  address: string

  agencyStatement: File | null
  commercialRegister: File | null

  termsAccepted: boolean
}

export default function ResourceRegister() {

  const [formData, setFormData] = useState<ResourceData>({
    companyName: "",
    managerName: "",
    managerEmail: "",
    managerNumber: "",
    email: "",
    address: "",
    agencyStatement: null,
    commercialRegister: null,
    termsAccepted: false
  })

  const [preview, setPreview] = useState({
    agency: "",
    commercial: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value, type, checked, files } = e.target

    if (type === "checkbox") {

      setFormData({
        ...formData,
        [name]: checked
      })

    }

    else if (type === "file") {

      const file = files ? files[0] : null

      setFormData({
        ...formData,
        [name]: file
      })

      if (file) {

        const url = URL.createObjectURL(file)

        if (name === "agencyStatement")
          setPreview({ ...preview, agency: url })

        if (name === "commercialRegister")
          setPreview({ ...preview, commercial: url })
      }

    }

    else {

      setFormData({
        ...formData,
        [name]: value
      })

    }

  }

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()

    const data = new FormData()

    Object.entries(formData).forEach(([key, value]) => {

      if (value !== null)
        data.append(key, value as any)

    })

    const res = await fetch("/api/register/resource", {
      method: "POST",
      body: data
    })

    const result = await res.json()

    alert(result.message || "Registered")
  }

  return (

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        name="companyName"
        placeholder="Company Name"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="managerName"
        placeholder="Manager Name"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="managerEmail"
        type="email"
        placeholder="Manager Email"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="managerNumber"
        placeholder="Manager Phone"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="email"
        type="email"
        placeholder="Company Email"
        required
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="address"
        placeholder="Company Address"
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      {/* Agency Statement */}
      <div>
        <label className="text-sm text-gray-600">
          Agency Statement
        </label>

        <input
          type="file"
          name="agencyStatement"
          accept="image/*,application/pdf"
          required
          onChange={handleChange}
        />

        {preview.agency && (
          <img
            src={preview.agency}
            className="mt-2 h-20 object-contain"
          />
        )}
      </div>

      {/* Commercial Register */}
      <div>
        <label className="text-sm text-gray-600">
          Commercial Register
        </label>

        <input
          type="file"
          name="commercialRegister"
          accept="image/*,application/pdf"
          required
          onChange={handleChange}
        />

        {preview.commercial && (
          <img
            src={preview.commercial}
            className="mt-2 h-20 object-contain"
          />
        )}
      </div>

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
          Accept terms
        </span>

      </div>

      <button
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
      >
        Register Resource
      </button>

    </form>
  )
}