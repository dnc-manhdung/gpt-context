export const fetchData = async (
  path: string,
  token: string = '',
  data: object | null,
  method: string = 'GET'
) => {
  let headers: HeadersInit = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }

  const config: RequestInit = {
    method,
    headers: headers,
    body: data ? JSON.stringify(data) : undefined
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      config
    )

    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

export const fetchStreamData = async (
  path: string,
  token: string = '',
  data: object | null,
  method: string = 'GET',
  onStreamUpdate: (chunk: string) => void
) => {
  let headers: HeadersInit = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }

  const config: RequestInit = {
    method,
    headers: headers,
    body: data ? JSON.stringify(data) : undefined
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      config
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder('utf-8')
    let result = ''

    if (reader) {
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        if (value) {
          result += decoder.decode(value, { stream: !done })
          onStreamUpdate(result)
          console.log('Chunk received:', result)
        }
      }
    }

    return result
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
