// /app/lib/appwrite-service.ts
//---- (1) ----
import {
    Account,
    Client,
    ID,
  } from "appwrite";
  
  // ---- (2) ----
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string);
  
  // ---- (3) ----
  export const appwrite = {
    client,
    account: new Account(client),
    ID
  };