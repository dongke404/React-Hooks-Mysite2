import React from 'react'
import { Carousel } from 'antd';
import "./index.less"
export default function Slideshow(props) {
  const bannerlist=props.bannerData
  return (
    <Carousel className='banners' autoplay>
      {bannerlist.map((banner, index) => {
        return (
          <div key={index} className='banner'>
            <a href={banner.newsUrl} target='_black'><img src={banner.imgUrl} alt={banner.title} /></a>
            <div className='banner-title'>{banner.title}</div>
          </div >
        )
      })}
    </Carousel>

  )
}
