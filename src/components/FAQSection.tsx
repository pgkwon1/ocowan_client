// components/FAQSection.tsx
import React, { useState } from "react";

interface IFAQItem {
  question: string;
  answer: string;
}

interface IFAQCategory {
  category: string;
  questions: IFAQItem[];
}

const faqData: IFAQCategory[] = [
  {
    category: "기본 사용법",
    questions: [
      {
        question: "오코완은 무료인가요?",
        answer:
          "네, 오코완의 기본 기능은 완전 무료로 제공됩니다. GitHub 연동, 3대 측정, 기본 팀 기능까지 모두 무료로 이용하실 수 있습니다. 향후 고급 분석 기능이나 대용량 팀 관리 기능은 프리미엄 플랜으로 제공될 예정입니다.",
      },
      {
        question: "GitHub 연동은 어떻게 하나요?",
        answer:
          "오코완 대시보드에서 'GitHub 연동' 버튼을 클릭하면 GitHub OAuth 인증 페이지로 이동합니다. 여기서 오코완에 필요한 권한을 승인하면 자동으로 연동이 완료됩니다. 연동 후에는 실시간으로 커밋, PR, 이슈 활동이 추적됩니다.",
      },
      {
        question: "어떤 GitHub 활동이 추적되나요?",
        answer:
          "오코완은 커밋(Commits), 풀 리퀘스트(Pull Requests), 이슈(Issues) 활동을 추적합니다. 공개 저장소뿐만 아니라 권한이 있는 비공개 저장소의 활동도 추적 가능합니다. 단, 사용자가 설정에서 특정 저장소를 제외할 수도 있습니다.",
      },
    ],
  },
  {
    category: "팀 기능",
    questions: [
      {
        question: "팀 기능은 어떻게 사용하나요?",
        answer:
          "팀 생성 후 팀원들을 이메일로 초대할 수 있습니다. 팀원들이 초대를 승인하면 자동으로 팀에 합류되며, 3대 측정 데이터를 기반으로 팀 내 순위와 경쟁이 시작됩니다. 주간, 월간 리더보드를 통해 건전한 경쟁 분위기를 조성할 수 있습니다.",
      },
      {
        question: "팀에서 나가거나 팀을 삭제할 수 있나요?",
        answer:
          "네, 언제든지 팀에서 나갈 수 있습니다. 팀 설정에서 '팀 나가기' 버튼을 클릭하면 됩니다. 팀장의 경우 팀을 삭제하거나 다른 멤버에게 팀장 권한을 위임할 수 있습니다. 팀 삭제 시 모든 팀 데이터가 영구 삭제되므로 신중하게 결정해주세요.",
      },
      {
        question: "팀 크기에 제한이 있나요?",
        answer:
          "기본 플랜에서는 팀당 최대 10명까지 참여 가능합니다. 더 큰 팀이 필요한 경우 프리미엄 플랜을 이용하시면 최대 100명까지 확장 가능합니다. 기업용 플랜에서는 무제한 팀원을 지원합니다.",
      },
    ],
  },
  {
    category: "TIL 기능",
    questions: [
      {
        question: "TIL 기능이란 무엇인가요?",
        answer:
          "TIL(Today I Learned)은 오늘 공부한 내용을 게시글로 공유하는 기능입니다. 개발 관련 학습 내용, 새로 알게 된 기술, 문제 해결 과정 등을 기록하고 다른 개발자들과 공유할 수 있습니다. 마크다운 문법을 지원하여 코드 블록과 이미지도 포함할 수 있습니다.",
      },
      {
        question: "TIL 게시글을 비공개로 설정할 수 있나요?",
        answer:
          "비공개 기능은 아직 구현 중 입니다만 비공개 게시글은 본인만 볼 수 있으며, 개인적인 학습 기록용으로 활용하실 수 있게 구현 될 예정입니다. 또한 언제든지 공개 설정으로 변경하여 다른 사용자들과 공유할 수 있게 할 예정입니다.",
      },
    ],
  },
  {
    category: "기술 지원",
    questions: [
      {
        question: "계정을 삭제하고 싶어요",
        answer:
          "대시보드 페이지 맨 하단에 연동 해제 버튼을 클릭하시면 연동 해제와 함께 계정이 삭제됩니다. 계정 삭제는 즉시 처리되며 복구가 불가능합니다.",
      },
      {
        question: "모바일 앱이 있나요?",
        answer:
          "현재는 웹 버전만 제공되고 있습니다. 하지만 반응형 디자인으로 제작되어 모바일 브라우저에서도 최적화된 경험을 제공합니다. iOS/Android 네이티브 앱은 2024년 하반기 출시 예정입니다.",
      },
    ],
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const toggleIndex = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === key ? null : key);
  };

  const categories = [
    "전체",
    ...Array.from(new Set(faqData.map((item) => item.category))),
  ];

  const filteredData =
    selectedCategory === "전체"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          자주 묻는 질문
        </h1>
        <p className="text-xl text-gray-600">
          오코완 사용 중 궁금한 점이 있으시면 아래 FAQ를 확인해보세요
        </p>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ 목록 */}
      <div className="space-y-6">
        {filteredData.map((categoryData, categoryIndex) => (
          <div
            key={categoryIndex}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {categoryData.category}
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {categoryData.questions.map((item, questionIndex) => {
                const isActive =
                  activeIndex === `${categoryIndex}-${questionIndex}`;
                return (
                  <div
                    key={questionIndex}
                    className="transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleIndex(categoryIndex, questionIndex)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                            isActive ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 추가 도움말 */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-blue-600 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-lg font-semibold text-blue-800">
            추가 도움이 필요하신가요?
          </h3>
        </div>
        <p className="text-blue-700 mb-4">
          FAQ에서 원하는 답변을 찾지 못하셨다면 언제든지 문의해주세요. 빠른 시간
          내에 도움을 드리겠습니다.
        </p>
        <p className="text-blue-700 mb-4">
          건의사항 이나 오류사항은 pgkwon1@gmail.com 으로 문의해주세요. 최대한
          빠르게 수정 하겠습니다 감사합니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:pgkwon1@gmail.com"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            이메일 문의
          </a>
        </div>
      </div>
    </div>
  );
}
