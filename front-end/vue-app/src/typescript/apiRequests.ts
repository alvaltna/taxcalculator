import axios from 'axios'
const apiUrl = 'http://localhost:3000'

async function getRequest (url) {
  const response = await axios.get(apiUrl + url)

  return response
}

async function postRequest (url, data) {
  const response = await axios.post(apiUrl + url, data)

  return response
}

async function postRequestWithAuthorization (url, data) {
  const response = await axios.post(apiUrl + url, data,
    { headers: { Authorization: localStorage.getItem('Authorization') ?? 'token' } }
  )

  return response
}

async function patchRequestWithAuthorization (url, data) {
  const response = await axios.patch(apiUrl + url, data,
    { headers: { Authorization: localStorage.getItem('Authorization') ?? 'token' } }
  )

  return response
}

async function deleteRequestWithAuthorization (url) {
  const response = await axios.delete(apiUrl + url,
    { headers: { Authorization: localStorage.getItem('Authorization') ?? 'token' } }
  )

  return response
}

export default {
  apiUrl,
  getRequestToApi (url) {
    return getRequest(url)
  },
  postRequestToApi (url, data) {
    return postRequest(url, data)
  },
  postRequestToApiWithAuthorization (url, data) {
    return postRequestWithAuthorization(url, data)
  },
  patchRequestWithAuthorization (url, data) {
    return patchRequestWithAuthorization(url, data)
  },
  deleteRequestWithAuthorization (url) {
    return deleteRequestWithAuthorization(url)
  }
}
