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

  console.log(headers)

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
