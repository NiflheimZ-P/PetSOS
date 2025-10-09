'use server'
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email",type:"text"},
                password: {label: "Password",type:"password"},

            },
            async authorize(credentials){
                // const {email,password} = credentials as {email:string,password:string}
                if (!credentials) {
                    throw new Error("Email and password are required");
                }
                const user = await prisma.users.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if(user && await bcrypt.compare(credentials.password,user.password)){
                    return user;
                }
                else{
                    throw new Error("Invalid email or password");
                }
            },
        }),
        //Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile: any){
                return{
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async({token,user}) => {
            if(user){
                token.id = user.id;
            }
            return token;
        },
        session: async({session,token}) =>{
            if(session.user){
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};