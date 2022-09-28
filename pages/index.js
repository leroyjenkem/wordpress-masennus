import Head from 'next/head'
import Link from "next/link";
import Image from 'next/image'
import { Suspense, createContext } from "react";
import jQuery  from "jquery";

import * as apiFunction from "../lib/api.js";

export default function Home({pages}) {
  return (
    <div>
      <Head>
        <title>käet saatana jäätyy täällä</title>
        <meta name="description" content="CMS Wordpress with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      {
        pages.map((page,index) => (
          <div key={index}>

           <Link href={`${page.node.uri}`}>
           <a style={{color:'blue'}}>{page.node.title}</a>
           </Link>
            
            <div dangerouslySetInnerHTML={{__html:page.node.content}} />

          </div>
        ))
        }
      </main>
    </div>
  )
}


export async function getServerSideProps(ctx){
  let pages = await apiFunction.getPages();
  return {
    props:{
      pages
    }
  }
}