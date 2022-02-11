import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  //This is how you would normally set the basic auth page for your aplication
  /* theme: {
    logo: 'https://links.papareact.com/sq0',
    brandColor: '#FFFFFF',
    colorScheme: 'auto',
  } */
  pages:{
    signIn: '/auth/signin',
  },
  callbacks: {
    // callback to upgrade returned object when signing in
    async session({ session , token, user}){
      //Here we are working on returned name, taking out empty spaces and uppercased characters
      session.user.username = session.user.name.split(' ')
      .join('')
      .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  }
})