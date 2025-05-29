// components/LevelSystemSection.tsx
import { EXPINFO, levelList } from "@/constants/levels.constants";

export default function LevelSystemSection() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-yellow-100 p-3 rounded-full mr-4">
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a1 1 0 01.894.553l2.382 4.825 5.327.775a1 1 0 01.554 1.707l-3.852 3.755.91 5.305a1 1 0 01-1.451 1.054L10 16.347l-4.764 2.497a1 1 0 01-1.451-1.054l.910-5.305-3.852-3.755a1 1 0 01.554-1.707l5.327-.775L9.106 2.553A1 1 0 0110 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900">
          레벨 시스템 안내
        </h2>
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">
        오코완에서는 다양한 활동을 통해 경험치를 얻고, 레벨을 올릴 수 있습니다.
        <br />
        꾸준한 코딩 습관을 만들고, 팀원들과 경쟁하며 성장해보세요!
      </p>
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2 px-4 font-bold text-gray-800">
                경험치 획득 방법
              </th>
              <th className="py-2 px-4 font-bold text-gray-800">경험치</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2 px-4">오코완(오늘 코딩완료) 체크</td>
              <td className="py-2 px-4 text-blue-600 font-semibold">
                +{EXPINFO.OCOWAN_EXP}
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4">PR(Pull Request) 1개 생성</td>
              <td className="py-2 px-4 text-blue-600 font-semibold">
                +{EXPINFO.PR_EXP}
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4">이슈(Issue) 1개 생성</td>
              <td className="py-2 px-4 text-blue-600 font-semibold">
                +{EXPINFO.ISSUE_EXP}
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4">커밋(Commit) 1개</td>
              <td className="py-2 px-4 text-blue-600 font-semibold">
                +{EXPINFO.COMMIT_EXP}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        레벨별 경험치 구간
      </h3>
      <div className="bg-gray-50 rounded-lg p-6 mb-8 overflow-x-auto">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="py-2 px-2 font-bold text-gray-800">레벨</th>
              <th className="py-2 px-2 font-bold text-gray-800">경험치 구간</th>
            </tr>
          </thead>
          <tbody>
            {levelList.map((row) => (
              <tr key={row.level} className="border-t">
                <td className="py-2 px-2 font-semibold text-gray-700">
                  {row.level}
                </td>
                <td className="py-2 px-2 text-gray-700">
                  {row.expMin} ~ {row.expMax === Infinity ? "∞" : row.expMax}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-yellow-800 font-medium">
          💡 경험치를 모아 레벨을 올리면, 다양한 배지와 팀 내 랭킹에서 더욱
          돋보일 수 있습니다!
        </p>
      </div>
    </div>
  );
}
