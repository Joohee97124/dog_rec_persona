// src/components/survey/Step1BasicInfo.jsx
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";

const HOUSE_TYPES = [
  { value: "apartment", label: "아파트", icon: "🏢" },
  { value: "villa", label: "빌라/연립", icon: "🏘️" },
  { value: "house", label: "주택", icon: "🏡" },
  { value: "officetel", label: "오피스텔", icon: "🏬" },
];

const FAMILY_SIZES = [
  { value: "1", label: "1인 가구", icon: "🙋" },
  { value: "2", label: "2인", icon: "👫" },
  { value: "3-4", label: "3~4인", icon: "👨‍👩‍👧" },
  { value: "5+", label: "5인 이상", icon: "👨‍👩‍👧‍👦" },
];

export default function Step1BasicInfo({ onNext }) {
  const { answers, updateAnswers } = useSurvey();
  const [form, setForm] = useState(answers.step1);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.age && form.gender && form.houseType && form.familySize;

  const handleSubmit = () => {
    if (!isValid) return;
    updateAnswers("step1", form);
    onNext();
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(255,193,7,0.15)] 
                    p-6 md:p-8 border-2 border-yellow-100">
      {/* 귀여운 헤더 */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 animate-bounce-slow">🐶</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">
          만나서 반가워요!
        </h2>
        <p className="text-amber-700/70 text-sm">
          먼저 보호자님에 대해 살짝 알려주세요 🌼
        </p>
      </div>

      {/* 1. 나이 + 성별 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🎂 나이 / 성별
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="120"
            placeholder="나이를 입력해주세요"
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className="flex-1 px-4 py-3 bg-yellow-50/50 border-2 border-yellow-100 
                       rounded-2xl text-amber-900 placeholder:text-amber-400/60
                       focus:outline-none focus:border-yellow-400 
                       focus:bg-white transition"
          />
          {["남성", "여성"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => handleChange("gender", g)}
              className={`px-5 py-3 rounded-2xl border-2 font-bold text-sm transition
                ${
                  form.gender === g
                    ? "border-yellow-400 bg-yellow-200 text-amber-900 scale-105"
                    : "border-yellow-100 bg-yellow-50/50 text-amber-700 hover:border-yellow-200"
                }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 거주 형태 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🏠 어디에 살고 계신가요?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HOUSE_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleChange("houseType", type.value)}
              className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-2
                ${
                  form.houseType === type.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200 hover:bg-yellow-50"
                }`}
            >
              <span className="text-3xl">{type.icon}</span>
              <span className="text-sm font-bold text-amber-900">
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 가족 구성원 */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          👨‍👩‍👧 가족은 몇 명인가요?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FAMILY_SIZES.map((size) => (
            <button
              key={size.value}
              type="button"
              onClick={() => handleChange("familySize", size.value)}
              className={`py-3 rounded-2xl border-2 text-sm font-bold transition 
                          flex flex-col items-center gap-1
                ${
                  form.familySize === size.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 text-amber-700 hover:border-yellow-200"
                }`}
            >
              <span className="text-xl">{size.icon}</span>
              <span className="text-amber-900">{size.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 귀여운 다음 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all
          ${
            isValid
              ? "bg-gradient-to-r from-yellow-300 to-amber-300 text-amber-900 " +
                "shadow-[0_4px_0_0_#F59E0B] hover:translate-y-0.5 " +
                "hover:shadow-[0_2px_0_0_#F59E0B] active:translate-y-1 active:shadow-none"
              : "bg-yellow-50 text-amber-300 cursor-not-allowed border-2 border-yellow-100"
          }`}
      >
        {isValid ? "다음으로 가볼까요? 🐾" : "모든 항목을 입력해주세요"}
      </button>
    </div>
  );
}
