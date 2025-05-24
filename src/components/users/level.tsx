// components/LevelProgress.js

import { levelList } from "@/constants/levels.constants";
import { IRootReducer } from "@/store/reducer.dto";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Levels() {
  // 현재 진행률 계산
  const { levels, isLogin } = useSelector(
    (state: IRootReducer) => state.usersReducer
  );
  const [levelData, setLevelData] = useState({
    currentLevel: 0, //현재 레벨
    currentExp: 0, // 현재 경험치
    nextLevelPoints: 0, // 다음 레벨 까지 남은 경험치
    progress: 0, // 퍼센트
  });

  useEffect(() => {
    if (!isLogin) return;

    const currentLevel = levels.level ?? 0;
    const currentExp = levels.exp ?? 0;
    const nextLevelPoints = levelList[currentLevel].expMin;

    const progress = Math.min((currentExp / nextLevelPoints) * 100, 100);

    setLevelData({
      currentLevel,
      currentExp,
      nextLevelPoints,
      progress,
    });
  }, [levels]);
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">
          현재 레벨: {levelData.currentLevel}
        </h2>
        <span className="text-sm text-gray-500">
          Points: {levelData.currentExp}/{levelData.nextLevelPoints}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
        <div
          className="bg-gradient-to-br from-purple-600 to-blue-500 h-4 rounded-full"
          style={{ width: `${levelData.progress}%` }}
        ></div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        다음 레벨까지 {levelData.nextLevelPoints - levelData.currentExp} 점
        남았습니다.
      </div>
    </div>
  );
}
