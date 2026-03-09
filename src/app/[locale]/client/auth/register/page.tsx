"use client"

import { useState } from "react"
import ClientRegister from "@/components/public/views/register/ClientRegister"
import ResourceRegister from "@/components/public/views/register/ResourceRegister"

type UserType = "client" | "resource"

export default function RegisterPage() {

    const [type, setType] = useState<UserType>("client")

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h1>

                {/* Account Type Switch */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">

                    <button
                        onClick={() => setType("client")}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition
                                ${type === "client"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600"}`}
                    >
                        Client
                    </button>

                    <button
                        onClick={() => setType("resource")}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition
                                ${type === "resource"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600"}`}
                    >
                        Resource
                    </button>

                </div>

                {type === "client" && <ClientRegister />}
                {type === "resource" && <ResourceRegister />}

            </div>

        </div>
    )
}