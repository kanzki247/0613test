import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // 실제 Oracle DB 연결 코드:
    /*
    import oracledb from "oracledb"
    
    const conn = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTION_STRING,
    })

    const result = await conn.execute(
      `SELECT USER_ID, NAME, EMAIL FROM USERS 
       WHERE EMAIL = :email AND PASSWORD = :password`,
      { email, password },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    )
    
    await conn.close()
    
    if (result.rows && result.rows.length > 0) {
      const user = result.rows[0]
      // 세션 쿠키 설정
      const cookieStore = await cookies()
      cookieStore.set('user-session', JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7일
      })
      
      return NextResponse.json({ success: true, user })
    } else {
      return NextResponse.json({ success: false, message: '이메일 또는 비밀번호가 잘못되었습니다.' }, { status: 401 })
    }
    */

    console.log("로그인 시도:", { email, password })

    // 임시 사용자 데이터 (실제 환경에서는 DB에서 조회)
    const mockUsers = [
      {
        USER_ID: "admin",
        NAME: "관리자",
        EMAIL: "admin@company.com",
        PASSWORD: "admin123",
      },
      {
        USER_ID: "user1",
        NAME: "김철수",
        EMAIL: "kim@company.com",
        PASSWORD: "user123",
      },
    ]

    // 대소문자 구분 없이 이메일 비교, 비밀번호는 대소문자 구분
    const user = mockUsers.find((u) => u.EMAIL.toLowerCase() === email.toLowerCase() && u.PASSWORD === password)

    if (user) {
      // 세션 쿠키 설정
      const cookieStore = cookies()
      const userSession = {
        USER_ID: user.USER_ID,
        NAME: user.NAME,
        EMAIL: user.EMAIL,
      }

      cookieStore.set("user-session", JSON.stringify(userSession), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7일
      })

      return NextResponse.json({ success: true, user: userSession })
    } else {
      // 디버깅을 위한 로그 추가
      console.log("로그인 실패: 사용자를 찾을 수 없음", { email })

      return NextResponse.json(
        {
          success: false,
          message: "이메일 또는 비밀번호가 잘못되었습니다.",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("로그인 오류:", error)
    return NextResponse.json({ success: false, message: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
