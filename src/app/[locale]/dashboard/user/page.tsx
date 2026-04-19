"use client"

import { useState, useEffect } from "react"

type UserStatus = "pending" | "rejected" | "verified"

interface IUser {
    _id: string
    tradeName: string
    phone?: { Number: string }
    email: string
    logo?: string
    address?: string
    active: UserStatus
    createdAt: number
}

const STATUS_STYLES: Record<UserStatus, { badge: string; label: string }> = {
    pending: { badge: "bg-amber-50  text-amber-700  border border-amber-200", label: "Pending" },
    verified: { badge: "bg-green-50  text-green-700  border border-green-200", label: "Verified" },
    rejected: { badge: "bg-red-50    text-red-700    border border-red-200", label: "Rejected" },
}

const AVATAR_COLORS = [
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-teal-100", text: "text-teal-700" },
    { bg: "bg-orange-100", text: "text-orange-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
]

function getInitials(name: string) {
    return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

type FilterType = "all" | UserStatus

export default function DashboardUser() {
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<FilterType>("all")
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/users")
            const data = await res.json()
            console.log(data)
            setUsers(data)
        } catch (err) {
            console.error("Failed to fetch users", err)
        } finally {
            setLoading(false)
        }
    }

    async function updateStatus(userId: string, status: UserStatus) {
        setUpdating(userId)
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: status }),
            })
            if (res.ok) {
                setUsers((prev) =>
                    prev.map((u) => (u._id === userId ? { ...u, active: status } : u))
                )
            }
        } catch (err) {
            console.error("Failed to update user status", err)
        } finally {
            setUpdating(null)
        }
    }

    const counts = {
        all: users.length,
        pending: users.filter((u) => u.active === "pending").length,
        verified: users.filter((u) => u.active === "verified").length,
        rejected: users.filter((u) => u.active === "rejected").length,
    }

    const filtered = filter === "all" ? users : users.filter((u) => u.active === filter)

    const tabs: { key: FilterType; label: string }[] = [
        { key: "all", label: "All" },
        { key: "pending", label: "Pending" },
        { key: "verified", label: "Verified" },
        { key: "rejected", label: "Rejected" },
    ]

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Admin Dashboard</p>
                <h1 className="text-2xl font-medium text-gray-900">User Registrations</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                    { label: "Total", value: counts.all, color: "text-gray-700" },
                    { label: "Pending", value: counts.pending, color: "text-amber-700" },
                    { label: "Verified", value: counts.verified, color: "text-green-700" },
                    { label: "Rejected", value: counts.rejected, color: "text-red-700" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
                        <p className={`text-xs uppercase tracking-wider font-medium mb-1 ${stat.color}`}>
                            {stat.label}
                        </p>
                        <p className={`text-2xl font-medium ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === tab.key
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.label}
                        <span className={`ml-1.5 text-xs ${filter === tab.key ? "text-gray-400" : "text-gray-400"}`}>
                            {counts[tab.key]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
                        Loading users...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
                        No users found
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                {["Business", "Contact", "Address", "Status", "Registered", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((user, i) => {
                                const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length]
                                const statusStyle = STATUS_STYLES[user.active]
                                const isUpdating = updating === user._id

                                return (
                                    <tr key={user._id} className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">

                                        {/* Business */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {user.logo ? (
                                                    <img src={user.logo} alt={user.tradeName} className="w-9 h-9 rounded-full object-cover" />
                                                ) : (
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium ${avatarColor.bg} ${avatarColor.text}`}>
                                                        {getInitials(user.tradeName)}
                                                    </div>
                                                )}
                                                <span className="font-medium text-gray-900">{user.tradeName}</span>
                                            </div>
                                        </td>

                                        {/* Contact */}
                                        <td className="px-4 py-3">
                                            <p className="text-gray-700">{user.email}</p>
                                            {user.phone?.Number && (
                                                <p className="text-xs text-gray-400 mt-0.5">{user.phone.Number}</p>
                                            )}
                                        </td>

                                        {/* Address */}
                                        <td className="px-4 py-3 text-gray-500">{user.address || "—"}</td>

                                        {/* Status */}
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.badge}`}>
                                                {statusStyle.label}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(user.createdAt)}</td>

                                        {/* Actions */}
                                        <td className="px-4 py-3">
                                            {user.active === "pending" ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updateStatus(user._id, "verified")}
                                                        disabled={isUpdating}
                                                        className="px-3 py-1 text-xs font-medium rounded-md bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 disabled:opacity-50 transition-colors"
                                                    >
                                                        {isUpdating ? "..." : "Accept"}
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(user._id, "rejected")}
                                                        disabled={isUpdating}
                                                        className="px-3 py-1 text-xs font-medium rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 disabled:opacity-50 transition-colors"
                                                    >
                                                        {isUpdating ? "..." : "Reject"}
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400">{statusStyle.label}</span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}