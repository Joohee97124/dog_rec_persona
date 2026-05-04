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
  { value: "puppy", label: "유년", icon: "🍼", desc: "~1살" },
  { value: "young", label: "청년", icon: "⚡", desc: "1~7살" },
  { value: "senior", label: "중년", icon: "🌳", desc: "7~10살" },
  { value: "geriatric", label: "노년", icon: "🌅", desc: "10살 이상" },
];

const AGE_ANY = { value: "any", label: "상관없음", icon: "💛", desc: "다 좋아요" };

const PERSONALITY_TAGS = [
  { value: "affectionate", label: "애교쟁이", icon: "🥰", desc: "사람을 좋아하고\n곁에 꼭 붙어요" },
  { value: "independent", label: "꾸러기", icon: "😎", desc: "호기심이 많고\n장난감을 좋아해요" },
  { value: "active", label: "독립심짱", icon: "🛋️", desc: "한결같이 든든해요" },
  { value: "calm", label: "산책최고", icon: "🎾", desc: "산책을 좋아하고\n에너지가 넘쳐요" },
  { value: "friendly", label: "똑똑이", icon: "🎓", desc: "훈련을 잘 받고\n눈치가 빨라요" },
  { value: "social", label: "순둥이", icon: "🛡️", desc: "적응을 잘하고\n사람을 좋아해요"},
  { value: "smart", label: "조용조용", icon: "🤗", desc: "혼자만의 시간을\n잘 보내요" },
  { value: "loyal", label: "친구조아", icon: "🐾", desc: "강아지 친구 OK\n모두와 친해요" },
];

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
