import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout"
import { getSortedPostsData } from "../lib/posts"


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Home</title>
      </Head>
      <section className={`${utilStyles.headingMD}`}>

      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}