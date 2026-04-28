// src/App.jsx
import { SurveyProvider } from "./context/SurveyContext";
import Survey from "./pages/Survey";

function App() {
  return (
    <SurveyProvider>
      <Survey />
    </SurveyProvider>
  );
}

export default App;
