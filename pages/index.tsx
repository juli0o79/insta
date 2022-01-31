import Head from "next/head"
import { useEffect } from "react"
import Feed from "../components/Feed"
import Header from "../components/Header"


const IndexPage = () =>{
useEffect(()=>{
  console.log('funcionando', 'funcionando')
},[])
return (
  
  <div className="">
    <Head>
    <title> Insta App</title>
  </Head>
    {/* Header */}
    <Header/>
    {/* Feed */}
    {/* Modal */}
    <Feed/>
  </div>
  
)}

export default IndexPage
