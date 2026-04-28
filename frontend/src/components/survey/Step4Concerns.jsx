// src/components/survey/Step4Concerns.jsx
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";

const CONCERNS = [
  { value: "cost", label: "비용 부담", icon: "💰" },
  { value: "time", label: "시간 부족", icon: "⏰" },
  { value: "space", label: "공간 부족", icon: "🏠" },
  { value: "noise", label: "짖음/소음", icon: "🔊" },
  { value: "health", label: "건강 관리", icon: "🏥" },
  { value: "training", label: "훈련 어려움", icon: "🎓" },
  { value: "allergy", label: "알러지", icon: "🤧" },
  { value: "travel", label: "여행 제약", icon: "✈️" },
  { value: "lifespan", label: "이별 두려움", icon: "💔" },
  { value: "responsibility", label: "책임감", icon: "🤝" },
];

export default function Step4Concerns({ onComplete, onPrev }) {
  const { answers, updateAnswers } = useSurvey();
  const [selected, setSelected] = useState(answers.step4?.concerns || []);

  const toggleConcern = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const isValid = selected.length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    updateAnswers("step4", { concerns: selected });
    onComplete();
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(255,193,7,0.15)] 
                    p-6 md:p-8 border-2 border-yellow-100">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 animate-bounce-slow">🤔</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          가장 우려되는 점은?
        </h2>
        <p className="text-amber-700/70 text-sm">
          중복 선택 가능해요. 솔직하게 알려주세요 💛
        </p>
      </div>

      {/* 선택 개수 표시 */}
      <div className="mb-4 text-center">
        <span className="inline-block px-4 py-1 bg-yellow-100 text-amber-900 
                         rounded-full text-sm font-bold">
          {selected.length}개 선택됨
        </span>
      </div>

      {/* 우려사항 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {CONCERNS.map((c) => {
          const isSelected = selected.includes(c.value);
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => toggleConcern(c.value)}
              className={`relative p-4 rounded-2xl border-2 transition 
                          flex flex-col items-center gap-2
                ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-amber-400 
                                 text-white rounded-full flex items-center justify-center 
                                 text-xs font-bold">
                  ✓
                </span>
              )}
              <span className="text-3xl">{c.icon}</span>
              <span className="text-sm font-bold text-amber-900 text-center">
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 완료 버튼 (이전 + 완료) */}
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="px-6 py-4 rounded-2xl font-bold text-amber-700 bg-yellow-50 
                     border-2 border-yellow-200 hover:bg-yellow-100 transition"
        >
          ← 이전
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`flex-1 py-4 rounded-2xl font-bold text-base transition-all
            ${
              isValid
                ? "bg-gradient-to-r from-amber-300 to-orange-300 text-amber-900 " +
                  "shadow-[0_4px_0_0_#F59E0B] hover:translate-y-0.5 " +
                  "hover:shadow-[0_2px_0_0_#F59E0B] active:translate-y-1 active:shadow-none"
                : "bg-yellow-50 text-amber-300 cursor-not-allowed border-2 border-yellow-100"
            }`}
        >
          {isValid ? "🐶 내 강아지 추천받기!" : "최소 1개 이상 선택해주세요"}
        </button>
      </div>
    </div>
  );
}
