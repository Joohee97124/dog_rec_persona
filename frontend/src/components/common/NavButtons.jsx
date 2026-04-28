// src/components/common/NavButtons.jsx
export default function NavButtons({ onPrev, onNext, isValid, nextLabel = "다음으로 가볼까요? 🐾" }) {
  return (
    <div className="flex gap-3">
      {onPrev && (
        <button
          onClick={onPrev}
          className="px-6 py-4 rounded-2xl font-bold text-amber-700 bg-yellow-50 
                     border-2 border-yellow-200 hover:bg-yellow-100 transition"
        >
          ← 이전
        </button>
      )}
      <button
        onClick={onNext}
        disabled={!isValid}
        className={`flex-1 py-4 rounded-2xl font-bold text-base transition-all
          ${
            isValid
              ? "bg-gradient-to-r from-yellow-300 to-amber-300 text-amber-900 " +
                "shadow-[0_4px_0_0_#F59E0B] hover:translate-y-0.5 " +
                "hover:shadow-[0_2px_0_0_#F59E0B] active:translate-y-1 active:shadow-none"
              : "bg-yellow-50 text-amber-300 cursor-not-allowed border-2 border-yellow-100"
          }`}
      >
        {isValid ? nextLabel : "모든 항목을 입력해주세요"}
      </button>
    </div>
  );
}
