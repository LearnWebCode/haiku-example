import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

export async function POST(request) {
  const { paramsToSign } = await request.json()
  console.log(paramsToSign)

  try {
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET)
    return NextResponse.json({ signature })
  } catch (error) {
    return NextResponse.json({ message: "Sorry" })
  }
}
