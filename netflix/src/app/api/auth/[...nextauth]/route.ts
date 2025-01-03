import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.username = session.user.name
                    ?.split(" ")
                    .join("")
                    .toLowerCase();

                session.user.uid = token.sub || null;
            }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "default_secret_key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
