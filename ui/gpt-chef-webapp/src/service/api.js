function formatQuery (queryParams) {
  return queryParams && Object.keys(queryParams).length && '?' + Object.keys(queryParams).map(key => queryParams[key] ? `${key}=${encodeURIComponent(queryParams[key])}` : key).join('&') || ''
}

export async function post(url, data, queryParams) {
  const query = formatQuery(queryParams)

  const response = await fetch(`${url}${query}`, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  return response?.json()
}

export default { post }
