import React, { Component } from 'react'
import "./index.less"
import Viewer from 'react-viewer';
import { reqimages } from '../../api';
import InfiniteScroll from 'react-infinite-scroller';
import { message } from 'antd';

//hooks状态不同步 改为了原来的类写法

export default class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      images: [],
      curPage: 1,
      typeId: props.match.params.typeId,
      hasMore: true

    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.getImages(props.match.params.typeId, 1)

  }
  componentDidMount() {
    this.getImages(this.state.typeId, this.state.curPage)
  }

  getImages = async (id, curPage) => {
    const result = await reqimages(id, curPage)
    if (result.status === 0) {
      const images = []
      for (let index = 0; index < result.data.length; index++) {
        const element = result.data[index];
        let image = { src: element.imageUrl, alt: element.describe }
        images.push(image)
      }
      this.setState({
        data: result.data,
        curPage: 1,
        images,
        typeId: id,
        hasMore: true

      })
    }
  }


  getImageNextPage = async () => {
    var curPage = (this.state.curPage) + 1
    var { data, images } = this.state
    const result = await reqimages(this.state.typeId, curPage)

    if (result.status === 0) {
      const newdata = data.concat(result.data)
      for (let index = 0; index < result.data.length; index++) {
        const element = result.data[index];
        let image = { src: element.imageUrl, alt: element.describe }
        images.push(image)
      }
      this.setState({
        data: newdata,
        curPage: curPage,
        images
      })
    } else {
      message.info("已经没有更多了")
      this.setState({
        hasMore: false
      })
    }
  }

  showBigImages = (e) => {
    const curIndex = parseInt(e.target.getAttribute("index"))
    // const alt = e.target.getAttribute("alt")
    const { images } = this.state
    this.setState({
      visible: true,
      images,
      activeIndex: curIndex
    }
    )
  }

  imageChange = (activeImage, index) => {
    const images_lenth = this.state.images.length
    if ((index + 10) > images_lenth) {
      this.getImageNextPage()
    }
  }

  imgError=(e)=>{
    e.target.style.display="none"

  }

  componentWillUnmount(){
    // 卸载异步操作设置状态
    this.setState = (state, callback) => {
      return;
    }
}
  render() {
    const { visible, data, images, activeIndex, hasMore } = this.state
    const showBigImages = this.showBigImages
    const getImageNextPage = this.getImageNextPage
    const imageChange = this.imageChange
    return (
      <div >
        <div>
          <Viewer
            visible={visible}
            downloadable={false}
            activeIndex={activeIndex}
            onClose={() => { this.setState({ visible: false }) }}
            images={images}
            onChange={imageChange}

          />
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={getImageNextPage}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <div className='photo-container'>
            {data.map((item, index) => {
              return <img index={index} className="photo" key={item.id} onClick={showBigImages} src={item.imageUrl} alt="" onError={this.imgError} />
            })}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
