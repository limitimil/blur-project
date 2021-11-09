import axios from 'axios'

// Reference: https://github.com/ptxmotc/Sample-code/blob/master/JavaScript/Sample.js
function GetAuthorizationHeader() {
  const AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
  const AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'

  const GMTString = new Date().toGMTString()
  const ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update(`x-date: ${GMTString}`)
  const HMAC = ShaObj.getHMAC('B64')
  const Authorization = `hmac username="${
    AppID
  }", algorithm="hmac-sha1", headers="x-date", signature="${
    HMAC
  }"`

  return { Authorization, 'X-Date': GMTString }
}

const instance = axios.create({
  baseURL: 'https://ptx.transportdata.tw/',
  timeout: 10 * 1000,
  headers: GetAuthorizationHeader(),
})

export default instance
