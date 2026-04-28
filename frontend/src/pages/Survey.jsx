// src/pages/Survey.jsx
import { useState } from "react";
import ProgressBar from "../components/survey/ProgressBar";
import Step1BasicInfo from "../components/survey/Step1BasicInfo";
import Step2PetExperience from "../components/survey/Step2PetExperience";
import Step3Preference from "../components/survey/Step3Preference";
import Step4Concerns from "../components/survey/Step4Concerns";
import { useSurvey } from "../context/SurveyContext";

export default function Survey() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const { answers } = useSurvey();

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleComplete = () => {
    console.log("🎉 설문 완료!", answers);
    // TODO: Result 페이지로 이동 (지금은 콘솔 확인)
    alert("설문이 완료되었어요! 콘솔(F12)에서 결과를 확인해보세요 🐶");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-orange-50">
      <div className="fixed top-10 left-10 text-4xl opacity-20 animate-float">🐾</div>
      <div className="fixed top-32 right-16 text-3xl opacity-20 animate-float-delay">🦴</div>

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <ProgressBar current={step} total={totalSteps} />

        {step === 1 && <Step1BasicInfo onNext={handleNext} />}
        {step === 2 && <Step2PetExperience onNext={handleNext} onPrev={handlePrev} />}
        {step === 3 && <Step3Preference onNext={handleNext} onPrev={handlePrev} />}
        {step === 4 && <Step4Concerns onComplete={handleComplete} onPrev={handlePrev} />}
      </div>
    </div>
  );
}
