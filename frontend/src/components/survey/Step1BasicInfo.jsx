// src/components/survey/Step1BasicInfo.jsx
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";

const ROOM_COUNTS = [
  { value: "one_room",   label: "원룸",     icon: "🛏️", desc: "1개 공간" },
  { value: "two_room",   label: "투룸",     icon: "🏠", desc: "2개 방" },
  { value: "three_plus", label: "3룸 이상", icon: "🏘️", desc: "방 3개~" },
  { value: "etc",        label: "기타",     icon: "✨", desc: "그 외" },
];

const HOUSING_TYPES = [
  { value: "apartment", label: "공동주택", icon: "🏢", desc: "아파트·빌라·오피스텔" },
  { value: "house",     label: "단독주택", icon: "🏡", desc: "단독·전원주택" },
  { value: "etc",     label: "기타", icon: "✨", desc: "그 외" },
];

const YARD_OPTIONS = [
  { value: "yes", label: "있음", icon: "🌳" },
  { value: "no",  label: "없음", icon: "🚫" },
];

const FAMILY_SIZES = [
  { value: "1", label: "1인", icon: "🙋" },
  { value: "2", label: "2인", icon: "👫" },
  { value: "3-4", label: "3~4인", icon: "👨‍👩‍👧" },
  { value: "5+", label: "5인 이상", icon: "👨‍👩‍👧‍👦" },
];

const FAMILY_MEMBERS = [
  { value: "infant", label: "영유아", icon: "👶", desc: "0~6세" },
  { value: "child", label: "미성년 자녀", icon: "🧒", desc: "7~18세" },
  { value: "senior", label: "어르신", icon: "👴", desc: "65세 이상" },
  { value: "none", label: "해당없음", icon: "✨", desc: "성인만 거주" },
];

export default function Step1BasicInfo({ onNext }) {
  const { answers, updateAnswers } = useSurvey();
  const [form, setForm] = useState({
    ...answers.step1,
    age:           answers.step1?.age           || "",
    gender:        answers.step1?.gender        || "",
    familyMembers: answers.step1?.familyMembers || [],
    roomCount:     answers.step1?.roomCount     || "",
    housingType:   answers.step1?.housingType   || "",
    hasYard:       answers.step1?.hasYard       || "",
    familySize:    answers.step1?.familySize    || "",
  });

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleMember = (value) => {
    setForm((prev) => {
      const current = prev.familyMembers || [];

      // "해당없음" 클릭 시 → 다른 거 다 해제하고 "해당없음"만 선택
      if (value === "none") {
        return { ...prev, familyMembers: ["none"] };
      }

      // 다른 항목 클릭 시 → "해당없음" 자동 해제
      const filtered = current.filter((v) => v !== "none");

      return {
        ...prev,
        familyMembers: filtered.includes(value)
          ? filtered.filter((v) => v !== value)
          : [...filtered, value],
      };
    });
  };

  const isValid =
    form.age &&
    form.gender &&
    // form.roomCount &&  // 방 개수 문항 비활성화로 인해 유효성 검사에서 제외
    form.housingType &&
    form.hasYard &&
    form.familySize &&
    form.familyMembers?.length > 0;

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
            value={form.age || ""}
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

      {/* 2-1. 방 개수 (임시 비활성화 - 주석 처리)
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🚪 거주하고 계신 집의 방 개수가 몇 개이신가요?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ROOM_COUNTS.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleChange("roomCount", type.value)}
              className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-1
                ${
                  form.roomCount === type.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200 hover:bg-yellow-50"
                }`}
            >
              <span className="text-3xl mb-1">{type.icon}</span>
              <span className="text-sm font-bold text-amber-900">
                {type.label}
              </span>
              <span className="text-xs text-amber-700/60">{type.desc}</span>
            </button>
          ))}
        </div>
      </div>
      */}

      {/* 2-2. 거주 형태 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🏠 거주하고 계신 형태가 어떻게 되시나요?
        </label>
        <div className="grid grid-cols-3 gap-3"> 
          {HOUSING_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleChange("housingType", type.value)}
              className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-1
                ${
                  form.housingType === type.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200 hover:bg-yellow-50"
                }`}
            >
              <span className="text-3xl mb-1">{type.icon}</span>
              <span className="text-sm font-bold text-amber-900">
                {type.label}
              </span>
              <span className="text-xs text-amber-700/60">{type.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-3. 마당 유무 */}
      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🌿 마당이 있으신가요?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {YARD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleChange("hasYard", opt.value)}
              className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-1
                ${
                  form.hasYard === opt.value
                    ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                    : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200 hover:bg-yellow-50"
                }`}
            >
              <span className="text-3xl mb-1">{opt.icon}</span>
              <span className="text-sm font-bold text-amber-900">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 가족 구성원 - 인원수 */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          👨‍👩‍👧 가족은 몇 명인가요? (본인 포함)
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

      {/* 4. 함께 사는 구성원 (다중 선택) */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-amber-900 mb-1">
          🏡 함께 사는 구성원이 있나요?
        </label>
        <p className="text-xs text-amber-700/60 mb-3">
          중복 선택 가능해요 ✨
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FAMILY_MEMBERS.map((m) => {
            const isSelected = form.familyMembers?.includes(m.value);
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => toggleMember(m.value)}
                className={`relative p-3 rounded-2xl border-2 transition 
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
                <span className="text-2xl">{m.icon}</span>
                <span className="text-xs font-bold text-amber-900">{m.label}</span>
                <span className="text-[10px] text-amber-700/60">{m.desc}</span>
              </button>
            );
          })}
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