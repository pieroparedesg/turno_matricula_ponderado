import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const response = await fetch("https://Cicilis.pythonanywhere.com/excel", {
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

    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="horarios_con_colores.xlsx"',
      },
    })
  } catch (err) {
    console.error("Excel proxy error:", err)
    return NextResponse.json(
      { error: "Error connecting to external API" },
      { status: 500 }
    )
  }
}
