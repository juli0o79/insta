import "next-auth";


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  //This is how we augment Session interface
  interface Session {
    user: {
      /** adding new fields to user. */
      name:string;
      image:string;
      email:string;
      uid?: number;
      username?: string;
    }
  }
}