import { handerTime, handersinger } from '../../utils/handSongs';
import { seachMusic, seachMusicDetail } from '../../api';

const getSongList = async (keywords) => {
  const result = await seachMusic(keywords)
  if (result.code === 200) {
    const songs = result.result.songs
    if (songs) {
      var _ = []
      for (let index = 0; index < songs.length; index++) {
        const element = songs[index];
        _.push(element.id)
      }
      const data= await getMusicDetail(_)
      return data
    }
  }
}

export const getMusicDetail=async(array)=>{
  const querySonglist = await seachMusicDetail(array.join(","))
  if (querySonglist.code === 200) {
    var data = []
    for (let index = 0; index < querySonglist.songs.length; index++) {
      const element = querySonglist.songs[index];
      const info = {
        'key': element.id,
        'id': index + 1,
        'songName': element,
        'time': handerTime(element.dt),
        'singer': handersinger(element.ar),
        'action': element,
        'pic': element.al.picUrl
      }
      data.push(info)
    }
    return data
  }
}

export default getSongList