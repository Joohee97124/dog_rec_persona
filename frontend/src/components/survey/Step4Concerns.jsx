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

  const [form, setForm] = useState({
    primaryConcern:   answers.step4?.primaryConcern   || "",
    secondaryConcern: answers.step4?.secondaryConcern || "",
    otherConcern:     answers.step4?.otherConcern     || "",
  });

  // 1순위 선택
  const handlePrimary = (value) => {
    setForm((prev) => ({
      ...prev,
      primaryConcern: value,
      // 1순위와 2순위가 같아지면 2순위 초기화
      secondaryConcern:
        prev.secondaryConcern === value ? "" : prev.secondaryConcern,
    }));
  };

  // 2순위 선택
  const handleSecondary = (value) => {
    // "걱정 없음"은 중복 허용, 그 외 항목만 중복 방지
    if (value !== CONCERN_NONE.value && value === form.primaryConcern) return;
    setForm((prev) => ({ ...prev, secondaryConcern: value }));
  };

  // 주관식 입력
  const handleOther = (e) =>
    setForm((prev) => ({ ...prev, otherConcern: e.target.value }));

  // 1순위, 2순위 둘 다 필수 (주관식은 선택)
  const isValid = !!form.primaryConcern && !!form.secondaryConcern;

  const handleSubmit = () => {
    if (!isValid) return;
    updateAnswers("step4", form);
    onComplete();
  };

  // 공통 카드 렌더 함수 (코드 중복 제거)
  const renderConcernCard = (c, isSelected, isDisabled, onClick) => (
    <button
      key={c.value}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`relative p-4 rounded-2xl border-2 transition 
                  flex flex-col items-center gap-1 text-center
        ${
          isDisabled
            ? "border-yellow-100 bg-gray-50 opacity-40 cursor-not-allowed"
            : isSelected
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
      <span className="text-sm font-bold text-amber-900">{c.label}</span>
      <span className="text-[11px] text-amber-700/60 leading-tight">
        {c.desc}
      </span>
    </button>
  );

  // "걱정 없음" 가로 버튼 렌더 함수
  const renderNoneButton = (isSelected, isDisabled, onClick) => (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full p-3 rounded-2xl border-2 transition 
                  flex items-center justify-center gap-2
        ${
          isDisabled
            ? "border-yellow-100 bg-gray-50 opacity-40 cursor-not-allowed"
            : isSelected
            ? "border-yellow-400 bg-yellow-100 scale-[1.01] shadow-md"
            : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
        }`}
    >
      <span className="text-2xl">{CONCERN_NONE.icon}</span>
      <span className="text-sm font-bold text-amber-900">{CONCERN_NONE.label}</span>
      <span className="text-xs text-amber-700/60">· {CONCERN_NONE.desc}</span>
    </button>
  );

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(255,193,7,0.15)] 
                    p-6 md:p-8 border-2 border-yellow-100">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 animate-bounce-slow">🤔</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          어떤 점이 가장 걱정되시나요?
        </h2>
        <p className="text-amber-700/70 text-sm">
          걱정되는 부분이 적은 친구를 우선 추천해드려요 ✨
        </p>
      </div>

      {/* 1️⃣ 가장 걱정되는 것 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-1">
          1️⃣ 가장 걱정되는 점
        </label>
        <p className="text-xs text-amber-700/60 mb-3">
          1개만 선택해주세요
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
          {CONCERNS.map((c) =>
            renderConcernCard(
              c,
              form.primaryConcern === c.value,
              false,
              () => handlePrimary(c.value)
            )
          )}
        </div>

        {renderNoneButton(
          form.primaryConcern === CONCERN_NONE.value,
          false,
          () => handlePrimary(CONCERN_NONE.value)
        )}
      </div>

      {/* 2️⃣ 두 번째로 걱정되는 것 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-1">
          2️⃣ 두 번째로 걱정되는 점
        </label>
        <p className="text-xs text-amber-700/60 mb-3">
          1번에서 고른 항목은 선택할 수 없어요
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
          {CONCERNS.map((c) =>
            renderConcernCard(
              c,
              form.secondaryConcern === c.value,
              form.primaryConcern === c.value, // 1순위와 같으면 비활성화
              () => handleSecondary(c.value)
            )
          )}
        </div>

        {renderNoneButton(
          form.secondaryConcern === CONCERN_NONE.value,
          // form.primaryConcern === CONCERN_NONE.value,
          false,
          () => handleSecondary(CONCERN_NONE.value)
        )}
      </div>

      {/* 3️⃣ 그 외 걱정 (주관식, 선택) */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-amber-900 mb-1">
          3️⃣ 그 외 걱정되는 점이 있다면 알려주세요
          <span className="text-xs font-normal text-amber-700/60 ml-2">
            (선택)
          </span>
        </label>
        <p className="text-xs text-amber-700/60 mb-3">
          자유롭게 작성해주세요 ✍️
        </p>
        <textarea
          value={form.otherConcern}
          onChange={handleOther}
          maxLength={200}
          rows={3}
          placeholder="예) 사료비, 병원비 같은 양육 비용이 부담돼요..."
          className="w-full px-4 py-3 bg-yellow-50/50 border-2 border-yellow-100 
                     rounded-2xl text-amber-900 placeholder:text-amber-400/60 
                     focus:outline-none focus:border-yellow-400 focus:bg-white 
                     transition resize-none"
        />
        <div className="text-right text-xs text-amber-700/60 mt-1">
          {form.otherConcern.length} / 200
        </div>
      </div>

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
          {isValid ? "🐶 내 강아지 추천받기!" : "1·2순위를 선택해주세요"}
        </button>
      </div>
    </div>
  );
}
