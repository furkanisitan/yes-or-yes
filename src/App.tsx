import { EscapeBox } from "./components/boxes";

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-tr from-yellow-300 via-orange-400 to-red-400 text-white px-4 pt-12">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">🎲 Eğlenceli Quiz 🎲</h1>

      <div className="w-full max-w-5xl text-center mt-4">
        <div className="mb-2 text-lg opacity-90">Soru 1 / 3</div>

        <div className="mb-6 text-3xl font-semibold drop-shadow-md">En sevdiğin renk hangisi?</div>

        <div className="flex justify-center gap-4 flex-wrap">
          <EscapeBox label="Sarı" />
          <EscapeBox label="Kırmızı" />
          <EscapeBox label="Mavi" />
          <EscapeBox label="Yeşil" />
        </div>
      </div>
    </div>
  );
}
