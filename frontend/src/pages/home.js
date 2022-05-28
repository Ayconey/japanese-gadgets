import React from 'react'
import { Header } from "../components/header";
import { Features } from "../components/features";
import { Gallery } from "../components/gallery";

export default function Home(props) {
  return (
    <div>
        <Header data={props.landingPageData.Header} />
        <Features data={props.landingPageData.Features} />
        <Gallery data={props.landingPageData.Gallery}/>
    </div>
  )
}
