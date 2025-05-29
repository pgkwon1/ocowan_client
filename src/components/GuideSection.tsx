// components/GuideSection.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "@/store/reducer.dto";

export default function GuideSection() {
  const router = useRouter();
  const { isLogin } = useSelector((state: IRootReducer) => state.usersReducer);
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          오코완 사용법 가이드
        </h1>
        <p className="text-xl text-gray-600">
          GitHub 연동부터 팀 경쟁까지, 완벽한 개발 습관 관리를 시작하세요
        </p>
      </div>

      <section className="bg-white rounded-lg  mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">
            GitHub 연동 방법
          </h2>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          오코완은 GitHub API를 통해 사용자의 컨트리뷰션 데이터를 자동으로
          연동합니다. GitHub 계정을 연결하면 매일의 커밋, PR, 이슈 활동이
          자동으로 기록되어 개발 습관을 체계적으로 관리할 수 있습니다.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            연동 단계
          </h3>
          <ol className="space-y-3">
            <li className="flex items-start items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                1
              </span>
              <span className="flex flex-col sm:flex-row gap-2 items-center text-gray-700">
                <button
                  onClick={() => {
                    isLogin === false
                      ? router.push(
                          `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`
                        )
                      : "";
                  }}
                  className="w-full flex items-center justify-center bg-black text-white py-2 px-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.698-2.782.603-3.36-1.338-3.36-1.338-.453-1.154-1.108-1.462-1.108-1.462-.904-.618.07-.606.07-.606 1.002.07 1.528 1.03 1.528 1.03.892 1.53 2.34 1.088 2.91.83.09-.647.348-1.088.633-1.338-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.98 1.03-2.675-.103-.253-.446-1.268.097-2.646 0 0 .84-.27 2.75 1.025A9.583 9.583 0 0110 4.505c.855.004 1.715.116 2.508.343 1.91-1.295 2.747-1.025 2.747-1.025.545 1.378.203 2.393.1 2.646.64.694 1.03 1.585 1.03 2.675 0 3.838-2.34 4.683-4.57 4.93.36.308.682.916.682 1.847 0 1.334-.012 2.41-.012 2.737 0 .267.18.576.688.48C17.14 18.165 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>GitHub으로 로그인</span>
                </button>
              </span>
              버튼을 클릭합니다
            </li>
            <li className="flex items-start items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                2
              </span>
              <span className="text-gray-700">
                GitHub OAuth 인증 페이지에서 권한을 승인합니다
              </span>
            </li>
            <li className="flex items-start items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                3
              </span>
              <span className="text-gray-700">
                로그인 완료 후 3대 측정 및 오코완 내역을 확인할 수 있습니다
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-white rounded-lg mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">
            3대 측정 활용법
          </h2>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          오코완의 핵심 기능인 3대 측정은 커밋, PR, 이슈 활동을 종합적으로
          분석하여 개발자의 일일 코딩 습관을 시각화합니다. 이를 통해 자신의
          활동량을 객관적으로 파악하고, 팀원들과 건전한 경쟁을 통해 지속적인
          동기부여를 받을 수 있습니다.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              커밋 수
            </h3>
            <p className="text-blue-700 text-sm">
              하루 동안의 총 커밋 횟수를 측정하여 코딩 활동량을 추적합니다
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              PR 수
            </h3>
            <p className="text-purple-700 text-sm">
              생성한 Pull Request 수로 협업 참여도와 코드 기여도를 측정합니다
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">
              이슈 수
            </h3>
            <p className="text-orange-700 text-sm">
              생성하거나 처리한 이슈 수로 문제 해결 능력을 평가합니다
            </p>
          </div>
        </div>

        <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
          시작하기
        </button>
      </section>

      {/* 팀 기능 섹션 */}
      <section className="bg-white rounded-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">팀 경쟁 기능</h2>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          팀원들과 함께 3대 측정 경쟁을 통해 서로 동기부여를 받으세요. 주간,
          월간 랭킹을 통해 건전한 경쟁 분위기를 조성하고, 함께 성장하는 개발
          문화를 만들어갑니다.
        </p>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">💡 Pro Tip</h3>
          <p className="leading-relaxed">
            매일 최소 1개의 커밋을 목표로 설정하고, 주간 목표를 달성해보세요.
            꾸준한 작은 습관이 모여 큰 성장을 만들어냅니다!
          </p>
        </div>
        <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
          시작하기
        </button>
      </section>
    </div>
  );
}
