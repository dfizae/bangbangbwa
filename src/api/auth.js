// AUTH-01·02 인증 API 스텁.
// 백엔드 완성 후 이 파일만 교체하면 됨.
// 카카오/구글 키는 .env(VITE_KAKAO_KEY 등)에서 읽을 것, 코드에 하드코딩 금지.

// TODO: 카카오 OAuth 연동 (import.meta.env.VITE_KAKAO_KEY)
export async function loginWithKakao() {
  return { name: "테스트 세입자", provider: "kakao" }
}

// TODO: 구글 OAuth 연동 (import.meta.env.VITE_GOOGLE_CLIENT_ID)
export async function loginWithGoogle() {
  return { name: "테스트 세입자", provider: "google" }
}

// TODO: 세션·토큰 무효화
export async function logout() {}
