import { Link } from 'react-router-dom';
import NotFoundHeader from '../components/layout/NotFoundHeader.jsx';

export default function NotFound() {
  return (
    <>  
    <NotFoundHeader />
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back to Home
      </Link>
    </main>
    </>
  );
}