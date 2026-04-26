import { Navigate } from 'react-router-dom';

export default function Home() {
  // Redirect root to resume analyzer as the main entry point
  return <Navigate to="/resume-analyzer" replace />;
}
