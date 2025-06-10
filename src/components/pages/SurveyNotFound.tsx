import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyNotFound = () => {
  const [surveyId, setSurveyId] = useState<string>('');
  const navigate = useNavigate();

  const handleRedirect = () => {
    const trimmed = surveyId.trim();
    if (trimmed !== '') {
      navigate(`/surveys/${trimmed}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Anket Bulunamadı</h1>
        <p className="text-gray-400 mb-6">Belirttiğiniz ankete ulaşılamadı ya da URL eksik olabilir.</p>

        <input
          type="text"
          placeholder="Anket numarası girin"
          value={surveyId}
          onChange={(e) => setSurveyId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRedirect();
          }}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button onClick={handleRedirect} className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200">
          Ankete Git
        </button>
      </div>
    </div>
  );
};

export default SurveyNotFound;
