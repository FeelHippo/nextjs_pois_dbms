export async function GET() {
  const data = await fetch('')
  const posts = await data.json()

  return Response.json(posts)
}
