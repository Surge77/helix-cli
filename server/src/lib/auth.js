import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import { deviceAuthorization } from "better-auth/plugins";
import { appConfig } from "../config/app.config.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: appConfig.serverUrl,
  basePath: "/api/auth",
  trustedOrigins: [appConfig.webUrl],
  plugins: [
    deviceAuthorization({
      expiresIn: "30m",
      interval: "5s",
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectURI: `${appConfig.serverUrl}/api/auth/callback/github`,
    },
  },
  logger: {
    level: appConfig.authLogLevel,
  },
});
