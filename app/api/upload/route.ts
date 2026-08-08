import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const response = await fetch("https://Cicilis.pythonanywhere.com/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error("Upload proxy error:", err)
    return NextResponse.json(
      { error: "Error connecting to external API" },
      { status: 500 }
    )
  }
}
