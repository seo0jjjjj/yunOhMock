export function formatTimeToAMPM(date: Date) : string {
  const hours:number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string[] = ["오전", "오후"] ;

  // 오전 3:33 이런식으로 변환
  return `${ampm[hours / 12]} ${hours % 12}:${minutes}`
}