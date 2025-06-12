import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ErrorHandle from "./error";
import { AdRoutes } from "./pages";

export default function AppRoutes() {
  const withFallback = (Component: any) => {
    return (
      <Suspense fallback={<></>}>
        <Component />
      </Suspense>
    );
  };

  return (
    <Suspense fallback={<p> Loading...</p>}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorHandle}>
          <Routes>
            <Route path="*" element={withFallback(AdRoutes)} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  );
}
