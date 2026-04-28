// src/components/survey/Step2PetExperience.jsx
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";
import NavButtons from "../common/NavButtons";

const PREVIOUS_PETS = [
  { value: "none", label: "처음이에요", icon: "🌱" },
  { value: "dog", label: "강아지", icon: "🐶" },
  { value: "cat", label: "고양이", icon: "🐱" },
  { value: "other", label: "기타", icon: "🐹" },
];

const EXPERIENCE_LEVELS = [
  { value: "none", label: "처음", desc: "키워본 적 없어요" },
  { value: "short", label: "1년 미만", desc: "조금 키워봤어요" },
  { value: "mid", label: "1~5년", desc: "어느 정도 익숙해요" },
  { value: "long", label: "5년 이상", desc: "베테랑이에요!" },
];

const OUTING_HOURS = [
  { value: "0-2", label: "2시간 미만", icon: "🏠" },
  { value: "2-5", label: "2~5시간", icon: "🚶" },
  { value: "5-8", label: "5~8시간", icon: "🏢" },
  { value: "8+", label: "8시간 이상", icon: "🌙" },
];

export default function Step2PetExperience({ onNext, onPrev }) {
  const { answers, updateAnswers } = useSurvey();
  const [form, setForm] = useState(answers.step2 || {});

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid = form.previousPet && form.experience && form.outingHours;

  const handleSubmit = () => {
    if (!isValid) return;
    updateAnswers("step2", form);
    onNext();
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(255,193,7,0.15)] 
                    p-6 md:p-8 border-2 border-yellow-100">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 animate-bounce-slow">🐾</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          반려동물 경험을 알려주세요
        </h2>
        <p className="text-amber-700/70 text-sm">
          어떤 친구와 함께 지내셨나요? 🌼
        </p>
      </div>

      {/* 1. 기존 반려동물 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🐕 이전에 키운 반려동물이 있나요?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PREVIOUS_PETS.map((pet) => (
            <button
              key={pet.value}
              type="button"
              onClick={() => handleChange("previousPet", pet.value)}
              className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-2
                ${
                  form.previousPet === pet.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                }`}
            >
              <span className="text-3xl">{pet.icon}</span>
              <span className="text-sm font-bold text-amber-900">{pet.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. 양육 경험 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          ⭐ 양육 경험은 얼마나 되셨나요?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {EXPERIENCE_LEVELS.map((lvl) => (
            <button
              key={lvl.value}
              type="button"
              onClick={() => handleChange("experience", lvl.value)}
              className={`p-4 rounded-2xl border-2 transition text-left
                ${
                  form.experience === lvl.value
                    ? "border-yellow-400 bg-yellow-100 scale-[1.02] shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                }`}
            >
              <div className="font-bold text-amber-900">{lvl.label}</div>
              <div className="text-xs text-amber-700/70 mt-1">{lvl.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 하루 외출시간 */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🕐 하루 평균 외출시간은?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OUTING_HOURS.map((h) => (
            <button
              key={h.value}
              type="button"
              onClick={() => handleChange("outingHours", h.value)}
              className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-2
                ${
                  form.outingHours === h.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                }`}
            >
              <span className="text-2xl">{h.icon}</span>
              <span className="text-sm font-bold text-amber-900">{h.label}</span>
            </button>
          ))}
        </div>
      </div>

      <NavButtons onPrev={onPrev} onNext={handleSubmit} isValid={isValid} />
    </div>
  );
}
