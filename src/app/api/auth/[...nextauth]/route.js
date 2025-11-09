import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      async authorize(credentials) {
        const user = { ...credentials };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // return { ...session, user: { ...token } };
      session.user.accessToken = token.accessToken;
      return session;
    },
    // async redirect({ url, baseUrl }) {
    // 	return new URL(process.env.NEXTAUTH_URL);
    // },
  },
});
export { handler as GET, handler as POST };
