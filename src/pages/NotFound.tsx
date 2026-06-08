import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ocean-50 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-ocean-100 flex items-center justify-center mx-auto mb-5">
          <i className="ri-anchor-line text-ocean-500 text-2xl" />
        </div>
        <h1 className="font-display font-bold text-6xl text-ocean-900 mb-2">404</h1>
        <p className="text-ocean-500 text-base mb-6">
          Page introuvable — retournez à terre
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-ocean-900 text-white rounded-full font-medium text-sm hover:bg-ocean-800 transition-all whitespace-nowrap flex items-center gap-2 mx-auto"
        >
          <i className="ri-home-5-line" />
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}