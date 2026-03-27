import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectT } from "@/libs/db";

import User from "@/models/User";
import { compare } from "@/libs/password.lib";

export const authConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                await connectDB();

                // Explicitly select password since it has select: false
                const user = await User.findOne({ email: credentials.email }).select("+password");

                if (!user) {
                    throw new Error("No account found with this email");
                }

                if (user.active !== "verified") {
                    throw new Error("Your account is not verified yet");
                }

                const isMatch = await comparePassword(
                    credentials.password as string,
                    user.password
                );

                if (!isMatch) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.tradeName,
                    image: user.logo,
                };
            },
        }),
    ],

    callbacks: {
        // Attach extra user data to the JWT token
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        // Expose token data to the session
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",      // your custom login page
        error: "/login",       // redirect errors to login page
    },

    session: {
        strategy: "jwt",       // use JWT, not DB sessions
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },

    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
export const { GET, POST } = handlers;