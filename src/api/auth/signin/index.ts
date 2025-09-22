import { getUser } from "@/api/auth/signin/queries";
import NextAuth, { AuthOptions, DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

interface ExtendsUser extends DefaultUser {}

declare module "next-auth" {
  interface User extends ExtendsUser {}
  interface Session extends DefaultSession {
    user?: ExtendsUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendsUser;
  }
}

export const auth_options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;

        const user = await getUser(email, password);

        if (!user) {
          console.error("존재하지 않는 이메일이거나 비밀번호가 틀립니다.");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async (params) => {
      const { account, user, token } = params;

      if (account && user) {
        // 초기 로그인 상태
        return {
          ...token,
          user: user,
        };
      }

      return { ...token };
    },
    session: (params) => {
      const { session, token } = params;

      session.user = token.user;

      return session;
    },
  },
  session: {
    maxAge: 10,
  },
  jwt: {
    maxAge: 10,
    encode: (params) => {
      const token = jwt.sign(params.token ?? {}, params.secret);

      return token;
    },
    decode: (params) => {
      const decoded = jwt.verify(params.token ?? "", params.secret) as JWT;

      return decoded;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  useSecureCookies: false,
};

export const signinHandler = NextAuth(auth_options);
