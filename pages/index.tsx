import Head from "next/head"
import { useEffect } from "react"
import Feed from "../components/Feed"
import Header from "../components/Header"
import Modal from "../components/Modal"


const IndexPage = () => {

  return (

    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title> Insta App</title>
      </Head>
      {/* Header */}
      <Header />
      {/* Feed */}
      <Feed />
      {/* Modal */}
      <Modal />

    </div>

  )
}

export default IndexPage
