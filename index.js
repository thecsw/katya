window.onload = () => {
  const url = 'http://127.0.0.1:32000/api'
  const login = document.querySelector('#login')
  report.style.display = 'none'
  // cookie helpers
  const getCookie = (what) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${what}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  // Check if cookie exists, and if it does, check whether they're valid
  const basicAuthToken = getCookie('user')
  console.log('Cookie:', basicAuthToken)
  if (basicAuthToken !== '' && typeof basicAuthToken !== 'undefined') {
    makePost(
      (path = url + '/auth'),
      (data = {}),
      (auth = basicAuthToken)
    ).then((data) => {
      // auth succeeded
      if (data[0] === 200) {
        dashboard.style.display = 'block'
        login.style.display = 'none'
      }
    })
  } else {
    // if cookie not found or doesn't check out against the auth, stop
    // executing all javascript
    dashboard.style.display = 'none'
    login.style.display = 'block'
    return
  }

  async function makePost (path = '', data = {}, auth = '') {
    const response = await fetch(path, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    })
    json = await response.json()
    return [response.status, json]
  }

  async function makeGet (path = '', auth = '') {
    const response = await fetch(path, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    json = await response.json()
    return [response.status, json]
  }

  const reportRequest = (toShow, className) => {
    report.innerHTML = toShow
    report.className = className
    report.style.display = 'block'
    setTimeout(() => {
      report.style.display = 'none'
    }, 1500)
  }
}
