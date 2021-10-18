async function makePost (path = '', data = {}, auth = '') {
  const response = await fetch(path, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth.toString(),
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
      Authorization: auth.toString(),
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  respBlob = await response.text()
  return [response.status, respBlob]
}

export const katya_get = makeGet
export const katya_post = makePost
