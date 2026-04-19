"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { CheckCircle, FileText, Shield, AlertCircle, ArrowLeft, Printer, Download, Building2, Globe, Users, Scale, HeartHandshake, Clock } from "lucide-react"

interface TermItem {
    title: {
        ar: string
        en: string
    }
    term: {
        ar: string
        en: string
    }
}

interface TermsData {
    title: {
        ar: string
        en: string
    }
    describtion: {
        ar: string
        en: string
    }
    _id: {
        $oid: string
    }
    for: string
    terms: TermItem[]
}

interface Props {
    accountType: string
}

// Icons for different term categories (just for visual variety)
const termIcons = [
    <Building2 key="building" className="w-5 h-5" />,
    <Globe key="globe" className="w-5 h-5" />,
    <Users key="users" className="w-5 h-5" />,
    <Scale key="scale" className="w-5 h-5" />,
    <HeartHandshake key="handshake" className="w-5 h-5" />,
    <Clock key="clock" className="w-5 h-5" />,
]

export default function TermsView({ accountType }: Props) {
    const lang = useLocale()
    const [termsData, setTermsData] = useState<TermsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [accepted, setAccepted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false)

    const getTerms = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/terms?for=${accountType}`)
            if (!res.ok) throw new Error("Failed to fetch terms")
            const data = await res.json()
            setTermsData(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTerms()
    }, [accountType])

    // Check if user scrolled to bottom
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY
            const bottomPosition = document.documentElement.scrollHeight
            setIsScrolledToBottom(scrollPosition >= bottomPosition - 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleAccept = async () => {
        if (!isScrolledToBottom) {
            alert("Please read all terms before accepting")
            return
        }
        setAccepted(true)
        // Add your API call to save acceptance here
        // await fetch('/api/accept-terms', { method: 'POST', body: JSON.stringify({ termsId: termsData?._id.$oid }) })
        
        // Optional: redirect after 1 second
        // setTimeout(() => { window.location.href = '/dashboard' }, 1000)
    }

    const handleDecline = () => {
        window.history.back()
    }

    const handlePrint = () => {
        window.print()
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <Shield className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-600" />
                    </div>
                    <p className="text-slate-600 font-medium mt-4">Loading terms and conditions...</p>
                    <p className="text-sm text-slate-400 mt-1">Please wait</p>
                </div>
            </div>
        )
    }

    if (error || !termsData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Unable to Load Terms</h2>
                    <p className="text-slate-600 mb-6">{error || "Could not fetch terms and conditions"}</p>
                    <button
                        onClick={getTerms}
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    const title = termsData.title[lang as keyof typeof termsData.title] || termsData.title.en
    const description = termsData.describtion[lang as keyof typeof termsData.describtion] || termsData.describtion.en
    const accountTypeDisplay = {
        supplier: "Supplier Account",
        buyer: "Buyer Account",
        partner: "Partner Account",
        individual: "Individual Account",
    }[termsData.for] || `${termsData.for} Account`

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            <span className="text-sm font-medium">Back</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            >
                                <Printer className="w-4 h-4" />
                                <span className="text-sm font-medium hidden sm:inline">Print</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Hero Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-sm">
                        <Shield className="w-4 h-4" />
                        Legal Agreement
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full border border-slate-200">
                        <span className="text-sm text-slate-500">Account Type:</span>
                        <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent capitalize">
                            {accountTypeDisplay}
                        </span>
                    </div>
                </div>

                {/* Terms List */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8 sm:mb-12 transition-all">
                    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 px-6 sm:px-8 py-5 border-b border-slate-200">
                        <h2 className="font-semibold text-slate-800 flex items-center gap-2 text-lg">
                            <FileText className="w-5 h-5 text-indigo-600" />
                            Terms and Conditions
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">Please read carefully before accepting</p>
                    </div>
                    
                    <div className="divide-y divide-slate-100">
                        {termsData.terms && termsData.terms.length > 0 ? (
                            termsData.terms.map((term, index) => {
                                const termTitle = term.title?.[lang as keyof typeof term.title] || term.title?.en || `Section ${index + 1}`
                                const termContent = term.term?.[lang as keyof typeof term.term] || term.term?.en || ""
                                const icon = termIcons[index % termIcons.length]
                                
                                return (
                                    <div 
                                        key={index} 
                                        className="p-6 sm:p-8 hover:bg-slate-50/80 transition-all duration-300 group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                                {icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
                                                    <span className="text-indigo-600 mr-2">{index + 1}.</span>
                                                    {termTitle}
                                                </h3>
                                                {termContent && (
                                                    <div className="text-slate-600 leading-relaxed pl-0 sm:pl-6">
                                                        <p className="relative">
                                                            <span className="inline-block w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2 align-middle"></span>
                                                            {termContent}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="p-12 text-center">
                                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                <p className="text-slate-500 font-medium">No specific terms have been added yet.</p>
                                <p className="text-sm text-slate-400 mt-1">Please check back later or contact support.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Scroll Progress Indicator */}
                <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-0.5 h-32 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                                className="w-full bg-gradient-to-t from-indigo-600 to-purple-600 transition-all duration-300"
                                style={{ 
                                    height: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
                                }}
                            />
                        </div>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isScrolledToBottom ? 'bg-green-500 scale-150' : 'bg-indigo-500'}`} />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 ${
                    accepted ? 'border-green-200 bg-green-50/30' : 'border-slate-200'
                } p-6 sm:p-8 sticky bottom-4 sm:bottom-8 backdrop-blur-sm`}>
                    {!accepted ? (
                        <>
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                <div className="text-center sm:text-left">
                                    <p className="text-slate-800 font-semibold text-lg">Do you agree to these terms?</p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        By accepting, you agree to comply with all {termsData.terms.length} conditions above.
                                    </p>
                                    {!isScrolledToBottom && termsData.terms.length > 0 && (
                                        <p className="text-xs text-amber-600 mt-2 flex items-center gap-1 justify-center sm:justify-start">
                                            <AlertCircle className="w-3 h-3" />
                                            Please scroll to the bottom to read all terms
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleDecline}
                                        className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all font-medium"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        disabled={!isScrolledToBottom && termsData.terms.length > 0}
                                        className={`px-6 py-2.5 rounded-xl transition-all font-medium flex items-center gap-2 shadow-sm ${
                                            !isScrolledToBottom && termsData.terms.length > 0
                                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                                        }`}
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Accept Terms
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                                <CheckCircle className="w-6 h-6" />
                                <span className="font-semibold text-lg">Terms Accepted!</span>
                            </div>
                            <p className="text-slate-600">You have successfully agreed to the terms and conditions.</p>
                            <button 
                                onClick={() => window.location.href = '/dashboard'}
                                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all"
                            >
                                Continue to Dashboard
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-400">
                        Last updated: {new Date().toLocaleDateString()} • Lorenz Platform
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                        For any questions, please contact our legal team
                    </p>
                </div>
            </div>
        </div>
    )
}