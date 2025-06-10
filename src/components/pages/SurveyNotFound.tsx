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
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{
        backgroundImage: "url('/images/stars.jpeg')",
        backgroundSize: 'cover',
      }}
    >
      <div className="bg-gray-800 rounded-2xl p-2 xs:p-4 sm:p-6 md:p-8 text-center">
        <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-white">Anket Bulunamadı</h1>
        <p className="text-xs xs:text-sm sm:text-base md:text-lg mb-4 text-gray-400">
          Belirttiğiniz ankete ulaşılamadı ya da URL eksik olabilir.
        </p>

        <input
          type="text"
          placeholder="Anket numarası girin"
          value={surveyId}
          onChange={(e) => setSurveyId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRedirect();
          }}
          className="w-full px-2 py-2 sm:px-3 mb-3 sm:mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-base"
        />

        <button
          onClick={handleRedirect}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200 text-xs sm:text-base"
        >
          Ankete Git
        </button>
      </div>
    </div>
  );
};

export default SurveyNotFound;
