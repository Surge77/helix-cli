import { deviceAuthorizationClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { publicAppConfig } from "./app-config"

export const authClient = createAuthClient({
    baseURL: publicAppConfig.serverUrl,
    basePath: "/api/auth",
    
      plugins: [ 
    deviceAuthorizationClient(), 
  ], 
})
