// by Viren Arora
// Imports the core NextAuth library, which provides authentication,
// session management, and OAuth integration support
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
        // Uses JSON Web Tokens (JWT) for stateless session management
        // This avoids the need for database-backed session storage
    },

    // This value is stored securely as an environment variable
    secret: process.env.NEXTAUTH_SECRET,
});
