import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/database";
import bcrypt from "bcrypt";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const authOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 3 * 60 * 60, // 3 hours
    },
    secret: "sfdthfyjrhtesdghdrs",
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                username: { label: "Nom d'utilisateur", type: "text", placeholder: "Nom d'utilisateur" },
                password: { label: "Mot de passe", type: "password", placeholder: "Mot de passe" }
            },
            async authorize(credentials) {
                const {username, password} = credentials;
                if (!username || !password) return null;

                const user = await prisma.administrators.findFirst({
                    where: {
                        username: username
                    }
                });
                
                if (user && await bcrypt.compare(password, user.password)) {
                    return user;
                }
                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            if (user) {
                token.idA = user.idA;
                token.username = user.username;
            }
            return token;
        },
        session: async ({session, token}) => {
            if (token) {
                session.user.idA = token.idA
                session.user.username = token.username
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
    }
};

export default NextAuth(authOptions)