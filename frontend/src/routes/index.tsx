import { createBrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';

import MainLayout from '../components/layout/MainLayout';
import LoaderSkeleton from '../components/feature/LoaderSkeleton';

const ResumeAnalyzer = React.lazy(() => import('../pages/ResumeAnalyzer'));
const AskAI = React.lazy(() => import('../pages/AskAI'));
const JobMatcher = React.lazy(() => import('../pages/JobMatcher'));
const CareerAgent = React.lazy(() => import('../pages/CareerAgent'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex h-full w-full items-center justify-center">
        <LoaderSkeleton />
      </div>
    }
  >
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/career-agent" replace />,
      },
      {
        path: '/resume-analyzer',
        element: (
          <SuspenseWrapper>
            <ResumeAnalyzer />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/ask',
        element: (
          <SuspenseWrapper>
            <AskAI />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/job-matcher',
        element: (
          <SuspenseWrapper>
            <JobMatcher />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/career-agent',
        element: (
          <SuspenseWrapper>
            <CareerAgent />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
