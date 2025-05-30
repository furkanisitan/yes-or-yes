import { EscapeBox } from "./components/boxes";
import { AnswerContainer, QuestionContainer } from "./components/containers";
import SurveyContainer from "./components/containers/SurveyContainer";

export default function App() {
  return (
    <SurveyContainer>
      <QuestionContainer>
        <AnswerContainer>
          <EscapeBox label="Sarı" />
          <EscapeBox label="Kırmızı" />
          <EscapeBox label="Mavi" />
          <EscapeBox label="Yeşil" />
        </AnswerContainer>
      </QuestionContainer>
    </SurveyContainer>
  );
}
