export const fetchData = async (
  path: string,
  data: any = null,
  method: string = 'GET'
) => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
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
