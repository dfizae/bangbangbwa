// 금액(만원 단위)을 "8억 2,000" / "5,000" 형태로 변환
export function formatManwon(man) {
  const eok = Math.floor(man / 10000)
  const rest = man % 10000
  if (eok > 0 && rest > 0) return `${eok}억 ${rest.toLocaleString()}`
  if (eok > 0) return `${eok}억`
  return rest.toLocaleString()
}

// 카드 가격 표기 (거래유형은 뱃지로 별도 표시하므로 숫자만 반환)
// 전세·매매: "5억 5,000" / 월세: "2,000 / 90"
export function formatPrice({ dealType, deposit, monthlyRent }) {
  if (dealType === "월세") return `${formatManwon(deposit)} / ${monthlyRent}`
  return formatManwon(deposit)
}

// 전용면적 → 평 (반올림 1자리)
export function toPyeong(m2) {
  return Math.round((m2 / 3.3058) * 10) / 10
}
