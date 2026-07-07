// src/components/survey/Step2PetExperience.jsx
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";
import NavButtons from "../common/NavButtons";

const CURRENT_PETS = [
  { value: "dog", label: "강아지", icon: "🐶" },
  { value: "cat", label: "고양이", icon: "🐱" },
  { value: "other", label: "기타", icon: "🐹" },
  { value: "no", label: "없음", icon: "❌" },
];

const getOutingMessage = (hours) => {
  if (hours === undefined || hours === "") return "슬라이더를 움직여 시간을 알려주세요";
  const h = Number(hours);
  if (h === 0) return "🏠 거의 집에서 시간을 보내시는군요!";
  if (h < 3) return "☕ 외출이 짧은 편이에요";
  if (h < 6) return "🚶 적당히 외출하시는군요";
  if (h < 9) return "🏢 외출이 꽤 긴 편이에요";
  return "🌙 외출이 매우 길어요. 분리불안 케어가 중요해요";
};

export default function Step2PetExperience({ onNext, onPrev }) {
  const { answers, updateAnswers } = useSurvey();
  const [form, setForm] = useState(answers.step2 || {});

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleExperienceChange = (value) => {
    setForm((prev) => ({
      ...prev,
      hasDogExperience: value,
      ...(value === "no" && { dogYears: "" }),
    }));
  };

  const handleCurrentPetChange = (value) => {
    setForm((prev) => ({
      ...prev,
      currentPet: value,
      ...(value !== "other" && { currentPetOther: "" }),
    }));
  };

  const isValid =
    form.hasDogExperience &&
    (form.hasDogExperience === "no" || form.dogYears) &&
    form.currentPet &&
    (form.currentPet !== "other" || form.currentPetOther) &&
    form.outingHours !== undefined && form.outingHours !== "";

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

      {/* 1. 반려견 경험 여부 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🐕 반려견을 키워본 경험이 있나요?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "yes", label: "예", icon: "🙋" },
            { value: "no", label: "아니오", icon: "🙅" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleExperienceChange(opt.value)}
              className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-2
                ${
                  form.hasDogExperience === opt.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                }`}
            >
              <span className="text-3xl">{opt.icon}</span>
              <span className="text-sm font-bold text-amber-900">{opt.label}</span>
            </button>
          ))}
        </div>

        {form.hasDogExperience === "yes" && (
          <div className="mt-4 bg-yellow-50/60 rounded-2xl p-5 border-2 border-yellow-100 animate-fade-in">
            <p className="text-xs text-amber-700/80 font-bold mb-4 flex items-center gap-1">
              🌼 조금 더 알려주세요
            </p>
            <div className="flex items-center gap-3">
              <span className="text-amber-900 font-bold text-sm w-44">
                가장 오래 함께했던 기간
              </span>
              <input
                type="number"
                min="0"
                max="50"
                step="0.5"
                placeholder="5"
                value={form.dogYears || ""}
                onChange={(e) => handleChange("dogYears", e.target.value)}
                className="w-20 px-3 py-2 bg-white border-2 border-yellow-200 
                           rounded-xl text-amber-900 text-center font-bold
                           focus:outline-none focus:border-yellow-400 transition"
              />
              <span className="text-amber-900 font-bold text-sm">년</span>
            </div>
            <p className="text-[11px] text-amber-700/60 mt-3">
              💡 한 마리 기준으로 가장 길게 함께한 기간을 적어주세요
            </p>
          </div>
        )}
      </div>

      {/* 2. 현재 반려동물 여부 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🏠 현재 함께 하는 반려동물이 있나요?
        </label>
        <div className="grid grid-cols-4 gap-4">
          {CURRENT_PETS.map((pet) => (
            <button
              key={pet.value}
              type="button"
              onClick={() => handleCurrentPetChange(pet.value)}
              className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-2
                ${
                  form.currentPet === pet.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
                }`}
            >
              <span className="text-3xl">{pet.icon}</span>
              <span className="text-sm font-bold text-amber-900">{pet.label}</span>
            </button>
          ))}
        </div>

        {form.currentPet === "other" && (
          <div className="mt-4 animate-fade-in">
            <input
              type="text"
              placeholder="어떤 친구인지 알려주세요 🐾"
              value={form.currentPetOther || ""}
              onChange={(e) => handleChange("currentPetOther", e.target.value)}
              className="w-full px-4 py-3 bg-yellow-50/60 border-2 border-yellow-200 
                         rounded-2xl text-amber-900 font-bold placeholder:text-amber-300
                         focus:outline-none focus:border-yellow-400 transition"
            />
          </div>
        )}
      </div>

      {/* 3. 하루 외출시간 */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🕐 평일 기준, 평균 외출시간은?
        </label>

        <div className="bg-yellow-50/60 rounded-2xl p-5 border-2 border-yellow-100">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-amber-900">
              {form.outingHours !== undefined && form.outingHours !== ""
                ? `${form.outingHours}시간`
                : "?"}
            </div>
            <p className="text-xs text-amber-700/70 mt-2">
              {getOutingMessage(form.outingHours)}
            </p>
          </div>

          <input
            type="range"
            min="0"
            max="23"
            step="1"
            value={form.outingHours !== "" && form.outingHours !== undefined ? form.outingHours : 0}
            onChange={(e) => handleChange("outingHours", e.target.value)}
            className="w-full h-2 bg-yellow-200 rounded-full appearance-none cursor-pointer
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

          <div className="flex justify-between mt-3 text-[10px] text-amber-700/50 font-medium">
            <span>0h</span>
            <span>6h</span>
            <span>12h</span>
            <span>18h</span>
            <span>23h</span>
          </div>
        </div>
      </div>

      <NavButtons onPrev={onPrev} onNext={handleSubmit} isValid={isValid} />
    </div>
  );
}