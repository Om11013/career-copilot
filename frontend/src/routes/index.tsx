import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import ResumeAnalyzer from '../pages/ResumeAnalyzer';
import AskAI from '../pages/AskAI';
import PlaceholderPage from '../pages/PlaceholderPage';
import JobMatcher from '../pages/JobMatcher';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/resume-analyzer" replace />,
      },
      {
        path: '/dashboard',
        element: <PlaceholderPage title="Dashboard" />,
      },
      {
        path: '/resume-analyzer',
        element: <ResumeAnalyzer />,
      },
      {
        path: '/ask',
        element: <AskAI />,
      },
      {
        path: '/job-matcher',
        element: <JobMatcher />,
      },
      {
        path: '/resume-tailor',
        element: <PlaceholderPage title="Resume Tailor" />,
      },
      {
        path: '/career-agent',
        element: <PlaceholderPage title="Career Agent" />,
      },
      {
        path: '/insights',
        element: <PlaceholderPage title="Insights" />,
      },
      {
        path: '/resume-versions',
        element: <PlaceholderPage title="Resume Versions" />,
      },
      {
        path: '/application-tracker',
        element: <PlaceholderPage title="Application Tracker" />,
      },
    ],
  },
]);
