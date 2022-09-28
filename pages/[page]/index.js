import jQuery  from "jquery";
import { getAllPages, getPage, getPosts } from "../../lib/api";
import { useEffect } from "react";
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

export default function Page({pageData, postsData: {edges}}) {
    

    let settings = {
        className: "",
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        lazyLoad: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
    return (
        <div id="sliderBackground">
            <h1>{pageData.title}</h1>
            <div dangerouslySetInnerHTML={{__html:pageData.content}} />
            <Slider {...settings}>
            {edges.map(({node}) => (
                    <div className="item" key="{node.title}">
                    <h2>{node.title}</h2>
                    <div dangerouslySetInnerHTML={{__html:node.content}} />        
                </div>
                      ))}
                      </Slider>
                      </div>
                    )
                  }
                  
export async function getStaticPaths() {
    const allPages = await getAllPages();
    return {
        paths: allPages.edges.map(({node}) => `/${node.slug}`) || [],
        fallback: false
    };
}

export async function getStaticProps({params}) {
    const data = await getPage(params.page);
    const postsData = await getPosts(params.page);
    return {
        props: {
            pageData: data.pageBy,
            postsData
        }
    };
}