import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Supabase 클라이언트 생성
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✔" : "❌")
    console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✔" : "❌")

    const { data, error } = await supabase
      .from("issues") // ✅ 테이블명은 소문자 그대로
      .select(`
        "ISSUE_ID",
        "ORDER_ID",
        "ISSUE_DATE",
        "ISSUE_TYPE",
        "SEVERITY",
        "DESCRIPTION",
        "RESOLVED_DATE",
        "STATUS"
      `)
      .order("ISSUE_DATE", { ascending: false })
      .range(0, 9999) // ✅ 최대 10,000건 불러오기

    if (error) {
      console.error("Supabase 쿼리 오류:", error)
      throw new Error(error.message)
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.error("API 오류:", err)
    return NextResponse.json(
      {
        error: "Supabase 연결 실패",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
