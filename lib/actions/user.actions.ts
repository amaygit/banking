'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const signIn= async  ({ email, password }: signInProps) =>{
    try {
        //Mutation / Database
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);
        return parseStringify(response);
      }
    catch(error)
    {
        console.error('Error',error);
    }
}

export const signUp= async (userData: SignUpParams) =>{
    const {email,password,firstName,lastName}=userData
    let newUserAccount;
    try{
        //Mutation / Database
        const { account } = await createAdminClient();

       newUserAccount=await account.create(
          ID.unique(), 
          email, 
          password, 
          `${firstName} ${lastName}`
        );
    
        if(!newUserAccount) throw new Error('Error creating user')
        const session = await account.createEmailPasswordSession(email, password);
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });
    
      //  console.log(newUserAccount)
          return parseStringify(newUserAccount);
    }
    catch(error)
    {
        console.error('Error',error);
    }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      return parseStringify(user)
  
    //   const user = await getUserInfo({ userId: result.$id})
  
    //   return parseStringify(user);
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  export const logoutAccount = async () => {
    try {
      const { account } = await createSessionClient();
  
      cookies().delete('appwrite-session');
  
      await account.deleteSession('current');
    } catch (error) {
      return null;
    }
  }  