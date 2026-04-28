// src/context/SurveyContext.jsx
import { createContext, useContext, useState } from "react";

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({
    step1: { age: "", gender: "", houseType: "", familySize: "" },
    step2: {},
    step3: {},
    step4: {},
  });

  const updateAnswers = (step, data) => {
    setAnswers((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  return (
    <SurveyContext.Provider value={{ answers, updateAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => useContext(SurveyContext);
