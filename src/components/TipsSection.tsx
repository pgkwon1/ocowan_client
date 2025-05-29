export default function TipsSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          개발자 습관 관리 팁
        </h1>
        <p className="text-xl text-gray-600">
          지속 가능한 개발 습관으로 더 나은 개발자가 되어보세요
        </p>
      </div>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">
            효과적인 코딩 루틴
          </h2>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          일관된 코딩 루틴을 유지하는 것은 개발자로서 지속적인 성장의
          핵심입니다. 매일 일정한 시간에 코딩을 시작하고, 집중할 수 있는 환경을
          조성하여 생산성을 극대화하세요.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              🌅 아침 루틴
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-green-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
                <span className="text-gray-700">매일 같은 시간에 기상하기</span>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
                <span className="text-gray-700">15분 명상 또는 스트레칭</span>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
                <span className="text-gray-700">
                  하루 목표 설정 및 우선순위 정하기
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              💻 코딩 세션
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
                <span className="text-gray-700">
                  최소 1시간 집중 코딩 시간 확보
                </span>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
                <span className="text-gray-700">
                  25분 작업 + 5분 휴식 (뽀모도로)
                </span>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-3"></div>
                <span className="text-gray-700">작은 목표부터 점진적 달성</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 생산성 향상 섹션 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">
            생산성 향상 방법
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              ⏰ 시간 관리
            </h3>
            <ul className="space-y-2 text-yellow-700 text-sm">
              <li>• Pomodoro 기법 활용</li>
              <li>• 시간 추적 앱 사용</li>
              <li>• 집중 시간대 파악하기</li>
              <li>• 멀티태스킹 피하기</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              📋 작업 관리
            </h3>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li>• 일일 TODO 리스트 작성</li>
              <li>• 우선순위 매트릭스 활용</li>
              <li>• 큰 작업을 작은 단위로 분할</li>
              <li>• 완료된 작업 체크하기</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              🔧 도구 활용
            </h3>
            <ul className="space-y-2 text-purple-700 text-sm">
              <li>• IDE 단축키 마스터하기</li>
              <li>• 코드 스니펫 활용</li>
              <li>• 자동화 도구 사용</li>
              <li>• 버전 관리 체계화</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 건강 관리 섹션 */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">
            개발자 건강 관리
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-xl font-semibold text-red-800 mb-4">
            💪 신체 건강
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-700 mb-2">올바른 자세</h4>
              <ul className="space-y-1 text-red-600 text-sm">
                <li>• 모니터 높이를 눈높이에 맞추기</li>
                <li>• 등받이에 기대어 앉기</li>
                <li>• 발을 바닥에 평평히 두기</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">정기적 휴식</h4>
              <ul className="space-y-1 text-red-600 text-sm">
                <li>• 1시간마다 5분 스트레칭</li>
                <li>• 20-20-20 규칙 (눈 건강)</li>
                <li>• 충분한 수분 섭취</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
