import { Route, Routes } from 'react-router-dom';
import { SurveyContainer } from './components/containers';

export default function App() {
  return (
    <Routes>
      <Route path="/surveys/:id" element={<SurveyContainer />} />
    </Routes>
  );
}
