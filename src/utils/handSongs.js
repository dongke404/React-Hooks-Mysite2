
//处理时间
export function handerTime (time) {
  const m = Math.floor(time / 1000 / 60)
  var s = Math.round(Math.round(((time - m * 60 * 1000) / 1000)))
  if (s < 10) {
    s = "0" + s
  }
  return m + ":" + s
}

//处理歌手
export function  handersinger (array) {
  var names = ""
  for (let index = 0; index < array.length; index++) {

    const element = array[index];
    if (index === array.length - 1) {
      names += element.name
    } else {
      names = element.name + ' & '
    }
  }
  return names
}


//数据转播放器列表
export function  songs2player (array) {
  const newmusicList=[]
  for (let index = 0; index < array.length; index++) {
    const song = {}
    const element = array[index];
    song.id = element.id
    song.title =element.name
    song.info = handersinger(element.ar)
    song.resource = 'https://music.163.com/song/media/outer/url?id=' + element.id
    song.time = handerTime(element.dt)
    song.img = element.al.picUrl
    newmusicList.push(song)
  }
  return newmusicList
}