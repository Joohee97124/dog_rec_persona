// src/components/survey/Step3Preference.jsx
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";
import NavButtons from "../common/NavButtons";

const PERSONALITY = [
  { value: "extrovert", label: "외향적", icon: "🎉", desc: "활발한 게 좋아요" },
  { value: "introvert", label: "내향적", icon: "🌙", desc: "조용한 게 좋아요" },
  { value: "balanced", label: "둘 다", icon: "☯️", desc: "상황에 따라 달라요" },
];

const SIZES = [
  { value: "small", label: "소형", icon: "🐕", desc: "~10kg" },
  { value: "medium", label: "중형", icon: "🐕‍🦺", desc: "10~25kg" },
  { value: "large", label: "대형", icon: "🦮", desc: "25kg~" },
  { value: "any", label: "상관없음", icon: "💛", desc: "다 좋아요" },
];

const AGES = [
  { value: "puppy", label: "퍼피", icon: "🍼", desc: "0~1살" },
  { value: "young", label: "청년", icon: "⚡", desc: "1~5살" },
  { value: "adult", label: "성견", icon: "🌳", desc: "5~8살" },
  { value: "senior", label: "시니어", icon: "🌅", desc: "8살 이상" },
];

const INTERACTION = [
  { value: "active", label: "활발한 놀이", icon: "🎾", desc: "산책·놀이 많이" },
  { value: "calm", label: "차분한 교감", icon: "🛋️", desc: "함께 쉬고 싶어요" },
  { value: "training", label: "훈련 중심", icon: "🎓", desc: "배우는 걸 좋아해요" },
  { value: "free", label: "자유로운", icon: "🌈", desc: "각자 편하게" },
];

export default function Step3Preference({ onNext, onPrev }) {
  const { answers, updateAnswers } = useSurvey();
  const [form, setForm] = useState(answers.step3 || {});

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.personality && form.size && form.age && form.interaction;

  const handleSubmit = () => {
    if (!isValid) return;
    updateAnswers("step3", form);
    onNext();
  };

  // 반복되는 카드 그리드 컴포넌트
  const renderGrid = (items, key, cols = 4) => (
    <div className={`grid grid-cols-2 md:grid-cols-${cols} gap-3`}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => handleChange(key, item.value)}
          className={`p-4 rounded-2xl border-2 transition flex flex-col items-center gap-1
            ${
              form[key] === item.value
                ? "border-yellow-400 bg-yellow-100 scale-105 shadow-md"
                : "border-yellow-100 bg-yellow-50/30 hover:border-yellow-200"
            }`}
        >
          <span className="text-3xl mb-1">{item.icon}</span>
          <span className="text-sm font-bold text-amber-900">{item.label}</span>
          {item.desc && (
            <span className="text-xs text-amber-700/60">{item.desc}</span>
          )}
        </button>
      ))}
    </div>
  );

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

      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🌟 본인의 성향은?
        </label>
        {renderGrid(PERSONALITY, "personality", 3)}
      </div>

      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          📏 선호하는 크기는?
        </label>
        {renderGrid(SIZES, "size")}
      </div>

      <div className="mb-7">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🎂 선호하는 나이대는?
        </label>
        {renderGrid(AGES, "age")}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-amber-900 mb-3">
          🤝 어떻게 시간을 보내고 싶어요?
        </label>
        {renderGrid(INTERACTION, "interaction")}
      </div>

      <NavButtons onPrev={onPrev} onNext={handleSubmit} isValid={isValid} />
    </div>
  );
}
