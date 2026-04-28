// src/components/survey/Step4Concerns.jsx
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";

// ✨ 강아지 점수와 1:1 매칭되는 우려 항목
const CONCERNS = [
  { value: "potty",      label: "배변 실수",        icon: "🚽", desc: "훈련이 어려울까봐" },
  { value: "walk",       label: "산책 시간 부족",    icon: "🚶", desc: "충분히 못 놀아줄까봐" },
  { value: "bark",       label: "짖음/소음",        icon: "🔊", desc: "이웃에 폐 끼칠까봐" },
  { value: "separation", label: "분리불안",          icon: "💔", desc: "혼자 두기 미안해서" },
  { value: "shedding",   label: "털빠짐",            icon: "🧹", desc: "청소·알러지 부담" },
  { value: "cohab",      label: "다른 동물과 합사",  icon: "🐾", desc: "기존 반려동물과 잘 지낼까" },
];

const CONCERN_NONE = {
  value: "none",
  label: "특별히 걱정되는 건 없어요",
  icon: "💛",
  desc: "어떤 친구든 환영이에요",
};

export default function Step4Concerns({ onComplete, onPrev }) {
  const { answers, updateAnswers } = useSurvey();

  // ✨ 단일 선택으로 변경 (배열 → 문자열)
  const [selected, setSelected] = useState(answers.step4?.concern || "");

  const handleSelect = (value) => setSelected(value);

  const isValid = !!selected;

  const handleSubmit = () => {
    if (!isValid) return;
    // ✨ 키 이름도 concerns(복수) → concern(단수)로 변경
    updateAnswers("step4", { concern: selected });
    onComplete();
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(255,193,7,0.15)] 
                    p-6 md:p-8 border-2 border-yellow-100">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 animate-bounce-slow">🤔</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          가장 걱정되는 점은 무엇인가요?
        </h2>
        <p className="text-amber-700/70 text-sm">
          딱 하나만 골라주세요. 그 걱정이 적은 친구를 우선 추천해드려요 ✨
        </p>
      </div>

      {/* 6개 우려사항 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        {CONCERNS.map((c) => {
          const isSelected = selected === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => handleSelect(c.value)}
              className={`relative p-4 rounded-2xl border-2 transition 
                          flex flex-col items-center gap-1 text-center
                ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                }`}
            >
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-amber-400 
                                 text-white rounded-full flex items-center justify-center 
                                 text-xs font-bold">
                  ✓
                </span>
              )}
              <span className="text-3xl mb-1">{c.icon}</span>
              <span className="text-sm font-bold text-amber-900">
                {c.label}
              </span>
              <span className="text-[11px] text-amber-700/60 leading-tight">
                {c.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* "걱정 없음" - 가로 전체 */}
      <button
        type="button"
        onClick={() => handleSelect(CONCERN_NONE.value)}
        className={`w-full p-3 rounded-2xl border-2 transition 
                    flex items-center justify-center gap-2 mb-8
          ${
            selected === CONCERN_NONE.value
              ? "border-yellow-400 bg-yellow-100 scale-[1.01] shadow-md"
              : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
          }`}
      >
        <span className="text-2xl">{CONCERN_NONE.icon}</span>
        <span className="text-sm font-bold text-amber-900">{CONCERN_NONE.label}</span>
        <span className="text-xs text-amber-700/60">· {CONCERN_NONE.desc}</span>
      </button>

      {/* 이전 + 완료 버튼 */}
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
          {isValid ? "🐶 내 강아지 추천받기!" : "1개를 선택해주세요"}
        </button>
      </div>
    </div>
  );
}
