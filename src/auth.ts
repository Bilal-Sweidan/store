import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User";
import { comparePassword } from "@/lib/hashing.lib";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig, // ✅ spread the Edge-safe config

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();

        const user = await User.findOne({
          email: (credentials.email as string).toLowerCase().trim(),
        })
          .select("+password")

        if (!user) return null;
        if (user.active !== "verified") return null;

        const isMatch = await comparePassword(
          credentials.password as string,
          user.password
        );

        if (!isMatch) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.tradeName,
          image: user.logo,
          role: user.role
        };
      },
    }),
  ],
});

// ✅ Export GET and POST from handlers
export const { GET, POST } = handlers;