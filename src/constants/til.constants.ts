export const TILCATEGORIES = [
  "전체",
  "프로그래밍 언어",
  "프레임워크 및 라이브러리",
  "데이터베이스",
  "도구 및 환경",
  "클라우드 및 배포",
  "알고리즘 및 자료구조",
  "웹 개발",
  "모바일 개발",
  "보안",
  "기타",
] as const;

export const WRITE_TILCATEGORIES = TILCATEGORIES.slice(1);

export enum TIL_EMOJIS {
  thumbsUp = "thumbsUp",
  heart = "heart",
  smile = "smile",
  fire = "fire",
  idea = "idea",
}

export const displayEmoji = ["👍", "❤️", "😊", "🔥", "💡"];
