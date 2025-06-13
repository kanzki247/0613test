//app/api/users/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Supabase 클라이언트 생성
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // 환경변수 확인용 로그
    console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✔" : "❌")
    console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✔" : "❌")

    // Supabase에서 USERS 테이블 조회
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("USER_ID", { ascending: true })

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
