import { Route, Routes } from 'react-router-dom';
import { SurveyContainer } from './components/containers';
import SurveyNotFound from './components/pages/SurveyNotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/surveys/:id" element={<SurveyContainer />} />
      <Route path="*" element={<SurveyNotFound />} />
    </Routes>
  );
}
