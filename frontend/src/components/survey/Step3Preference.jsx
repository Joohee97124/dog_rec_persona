// src/components/survey/Step3Preference.jsx
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";
import NavButtons from "../common/NavButtons";

const SIZES = [
  { value: "tiny", label: "~5kg 이하", icon: "🐾" },
  { value: "small", label: "5~10kg", icon: "🐕" },
  { value: "medium", label: "10~15kg", icon: "🐕‍🦺" },
  { value: "large", label: "15kg 이상", icon: "🦮" },
];

const SIZE_ANY = { value: "any", label: "상관없음", icon: "💛", desc: "다 좋아요" };

const AGES = [
  { value: "puppy", label: "퍼피", icon: "🍼", desc: "~1살" },
  { value: "young", label: "청년", icon: "⚡", desc: "1~7살" },
  { value: "senior", label: "시니어", icon: "🌳", desc: "7~10살" },
  { value: "geriatric", label: "노령", icon: "🌅", desc: "10살 이상" },
];

const AGE_ANY = { value: "any", label: "상관없음", icon: "💛", desc: "다 좋아요" };

const PERSONALITY_TAGS = [
  { value: "affectionate", label: "애교 많은", icon: "🥰", desc: "곁에 꼭 붙어요" },
  { value: "independent", label: "독립적인", icon: "😎", desc: "혼자도 잘 지내요" },
  { value: "active", label: "활발한", icon: "🎾", desc: "에너지 넘쳐요" },
  { value: "calm", label: "차분한", icon: "🛋️", desc: "조용히 함께해요" },
  { value: "friendly", label: "사람 좋아", icon: "🤗", desc: "모두와 친해요" },
  { value: "social", label: "사회성 좋은", icon: "🐾", desc: "강아지 친구 OK" },
  { value: "smart", label: "영리한", icon: "🎓", desc: "훈련 잘 받아요" },
  { value: "loyal", label: "충직한", icon: "🛡️", desc: "한결같이 든든해요" },
];

const getPersonalityMessage = (value) => {
  if (value === undefined || value === "") return "슬라이더를 움직여 알려주세요";
  const v = Number(value);
  if (v <= 10) return "🏡 완전한 집순이/집돌이에요";
  if (v <= 30) return "🌙 집에서 충전하는 편이에요";
  if (v <= 49) return "📖 조용한 시간을 좋아해요";
  if (v === 50) return "☯️ 상황에 따라 달라요";
  if (v <= 70) return "☕ 적당히 활동적이에요";
  if (v <= 90) return "🎉 사람 만나는 게 즐거워요";
  return "🌟 완전한 밖순이/밖돌이에요";
};

export default function Step3Preference({ onNext, onPrev }) {
  const { answers, updateAnswers } = useSurvey();

  const [form, setForm] = useState({
    ...answers.step3,
    sizes: answers.step3?.sizes || [],
    ages: answers.step3?.ages || [],
    personalityTags: answers.step3?.personalityTags || [],
  });

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // 크기 다중 선택 토글
  const toggleSize = (value) => {
    setForm((prev) => {
      const current = prev.sizes || [];
      if (value === "any") {
        return { ...prev, sizes: ["any"] };
      }
      const filtered = current.filter((v) => v !== "any");
      return {
        ...prev,
        sizes: filtered.includes(value)
          ? filtered.filter((v) => v !== value)
          : [...filtered, value],
      };
    });
  };

  // 나이 다중 선택 토글
  const toggleAge = (value) => {
    setForm((prev) => {
      const current = prev.ages || [];
      if (value === "any") {
        return { ...prev, ages: ["any"] };
      }
      const filtered = current.filter((v) => v !== "any");
      return {
        ...prev,
        ages: filtered.includes(value)
          ? filtered.filter((v) => v !== value)
          : [...filtered, value],
      };
    });
  };

  // 성격 태그 다중 선택 토글
  const togglePersonalityTag = (value) => {
    setForm((prev) => {
      const current = prev.personalityTags || [];
      return {
        ...prev,
        personalityTags: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const isValid =
    form.personality !== undefined && form.personality !== "" &&
    form.sizes?.length > 0 &&
    form.ages?.length > 0 &&
    form.personalityTags?.length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    updateAnswers("step3", form);
    onNext();
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(255,193,7,0.15)] 
                    p-6 md:p-8 border-2 border-yellow-100">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 animate-bounce-slow">💛</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          어떤 친구를 원하세요?
        </h2>
        <p className="text-amber-700/70 text-sm">
          취향을 알려주시면 딱 맞는 친구를 찾아드려요 ✨
        </p>
      </div>

      {/* 1. 성향 - 슬라이더 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🌟 본인의 성향은?
        </label>

        <div className="bg-yellow-50/60 rounded-2xl p-5 border-2 border-yellow-100">
          <div className="flex justify-between items-center mb-3">
            <div className="text-center">
              <div className="text-2xl">🌙</div>
              <div className="text-xs font-bold text-amber-900 mt-1">내향</div>
              <div className="text-[10px] text-amber-700/60">집순이</div>
            </div>

            <div className="text-center flex-1">
              <div className="text-3xl font-bold text-amber-900">
                {form.personality !== undefined && form.personality !== ""
                  ? `${form.personality}%`
                  : "?"}
              </div>
              <p className="text-[11px] text-amber-700/70 mt-1">
                {getPersonalityMessage(form.personality)}
              </p>
            </div>

            <div className="text-center">
              <div className="text-2xl">🎉</div>
              <div className="text-xs font-bold text-amber-900 mt-1">외향</div>
              <div className="text-[10px] text-amber-700/60">밖순이</div>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={form.personality !== "" && form.personality !== undefined ? form.personality : 50}
            onChange={(e) => handleChange("personality", e.target.value)}
            className="w-full h-2 bg-gradient-to-r from-blue-200 via-yellow-200 to-orange-200 
                       rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-6
                       [&::-webkit-slider-thumb]:h-6
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-amber-400
                       [&::-webkit-slider-thumb]:border-4
                       [&::-webkit-slider-thumb]:border-white
                       [&::-webkit-slider-thumb]:shadow-md
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:w-6
                       [&::-moz-range-thumb]:h-6
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-amber-400
                       [&::-moz-range-thumb]:border-4
                       [&::-moz-range-thumb]:border-white
                       [&::-moz-range-thumb]:cursor-pointer"
          />

          <div className="flex justify-between mt-2 text-[10px] text-amber-700/50 font-medium">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* 2. 선호 크기 - 다중 선택 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-1">
          📏 선호하는 크기는?
        </label>
        <p className="text-xs text-amber-700/60 mb-3">
          중복 선택 가능해요 ✨
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {SIZES.map((item) => {
            const isSelected = form.sizes?.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => toggleSize(item.value)}
                className={`relative p-4 rounded-2xl border-2 transition 
                            flex flex-col items-center gap-1
                  ${
                    isSelected
                      ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                      : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                  }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-400 
                                   text-white rounded-full flex items-center justify-center 
                                   text-[10px] font-bold">
                    ✓
                  </span>
                )}
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="text-sm font-bold text-amber-900">{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => toggleSize(SIZE_ANY.value)}
          className={`w-full p-3 rounded-2xl border-2 transition 
                      flex items-center justify-center gap-2
            ${
              form.sizes?.includes(SIZE_ANY.value)
                ? "border-yellow-400 bg-yellow-100 scale-[1.01] shadow-md"
                : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
            }`}
        >
          <span className="text-2xl">{SIZE_ANY.icon}</span>
          <span className="text-sm font-bold text-amber-900">{SIZE_ANY.label}</span>
          <span className="text-xs text-amber-700/60">· {SIZE_ANY.desc}</span>
        </button>
      </div>

      {/* 3. 선호 나이대 - 다중 선택 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-1">
          🎂 선호하는 나이대는?
        </label>
        <p className="text-xs text-amber-700/60 mb-3">
          중복 선택 가능해요 ✨
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {AGES.map((item) => {
            const isSelected = form.ages?.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => toggleAge(item.value)}
                className={`relative p-4 rounded-2xl border-2 transition 
                            flex flex-col items-center gap-1
                  ${
                    isSelected
                      ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                      : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                  }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-400 
                                   text-white rounded-full flex items-center justify-center 
                                   text-[10px] font-bold">
                    ✓
                  </span>
                )}
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="text-sm font-bold text-amber-900">{item.label}</span>
                <span className="text-xs text-amber-700/60">{item.desc}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => toggleAge(AGE_ANY.value)}
          className={`w-full p-3 rounded-2xl border-2 transition 
                      flex items-center justify-center gap-2
            ${
              form.ages?.includes(AGE_ANY.value)
                ? "border-yellow-400 bg-yellow-100 scale-[1.01] shadow-md"
                : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
            }`}
        >
          <span className="text-2xl">{AGE_ANY.icon}</span>
          <span className="text-sm font-bold text-amber-900">{AGE_ANY.label}</span>
          <span className="text-xs text-amber-700/60">· {AGE_ANY.desc}</span>
        </button>
      </div>

      {/* 4. 원하는 성격 태그 - 다중 선택 */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-amber-900 mb-1">
          🌟 어떤 성격의 친구와 함께하고 싶어요?
        </label>
        <p className="text-xs text-amber-700/60 mb-3">
          원하는 만큼 골라주세요 ✨
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PERSONALITY_TAGS.map((item) => {
            const isSelected = form.personalityTags?.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => togglePersonalityTag(item.value)}
                className={`relative p-4 rounded-2xl border-2 transition 
                            flex flex-col items-center gap-1
                  ${
                    isSelected
                      ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                      : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                  }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-400 
                                   text-white rounded-full flex items-center justify-center 
                                   text-[10px] font-bold">
                    ✓
                  </span>
                )}
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="text-sm font-bold text-amber-900">{item.label}</span>
                <span className="text-xs text-amber-700/60">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      <NavButtons onPrev={onPrev} onNext={handleSubmit} isValid={isValid} />
    </div>
  );
}
