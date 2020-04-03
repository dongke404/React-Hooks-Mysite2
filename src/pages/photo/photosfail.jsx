// import React, { useEffect, useState,useRef } from "react";
// import "./index.less";
// import Viewer from "react-viewer";
// import { reqimages } from "../../api";
// import InfiniteScroll from "react-infinite-scroller";
// import { message } from "antd";

// export default function Photos(props) {
//   const typeId = props.match.params.typeId;
//   const [visible, setvisible] = useState(false);
//   const [data, setdata] = useState([]);
//   const [images, setimages] = useState([]);
//   const [curPage, setcurPage] = useState(1);
//   const [hasMore, sethasMore] = useState(true);
//   const [activeIndex, setactiveIndex] = useState(0);
  
//   const curPageRef = useRef(curPage);


//   useEffect(() => {
//     setdata([])
//     setimages([])
//     setcurPage(1)
//     sethasMore(true)
//     // getImageNextPage(typeId,1)
//   }, [typeId]);


//   const imgError=(e)=>{
//     e.target.style.display="none"

//   }
//   useEffect(() => {
//     curPageRef.current = curPage;
//   });
  
//   // const addCurpage=(page)=>{
//   //     getImageNextPage(typeId,page)
//   // }
 
//   const getImageNextPage = async () => {
//     let nextPage=curPageRef.current + 1
//     const result = await reqimages(typeId, nextPage);
//     if (result.status === 0) {
//       let newdata = data.concat(result.data);
//       for (let index = 0; index < result.data.length; index++) {
//         const element = result.data[index];
//         let image = { src: element.imageUrl, alt: element.describe };
//         images.push(image);
//       }
      
//       setdata(newdata);
//       setimages(images);
//       setcurPage(nextPage)
//     } else {
//       message.info("已经没有更多了");
//       sethasMore(false);
//     }
//   }

 

//   const showBigImages = e => {
//     const curIndex = parseInt(e.target.getAttribute("index"));
//     // const alt = e.target.getAttribute("alt")
//     setvisible(true);
//     setimages(images);
//     setactiveIndex(curIndex);
//   };

//   const imageChange = (activeImage, index) => {
//     const images_lenth = images.length;
//     if (index + 10 > images_lenth) {
//       getImageNextPage();
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Viewer
//           visible={visible}
//           downloadable={false}
//           activeIndex={activeIndex}
//           onClose={() => {
//             setvisible(false);
//           }}
//           images={images}
//           onChange={imageChange}
//         />
//       </div>
//       <InfiniteScroll
//         pageStart={1}
//         loadMore={getImageNextPage}
//         hasMore={hasMore}
//         loader={
//           <div className="loader" key={0}>
//             Loading ...
//           </div>
//         }
//       >
//         <div className="photo-container">
//           {data.map((item, index) => {
//             return (
//               <img
//                 index={index}
//                 className="photo"
//                 key={item.id}
//                 onClick={showBigImages}
//                 src={item.imageUrl}
//                 alt=""
//                 onError={imgError}
//               />
//             );
//           })}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// }
