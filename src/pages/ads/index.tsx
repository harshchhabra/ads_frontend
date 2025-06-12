import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const AdsList = lazy(() => import("./list"));

export default function AdRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdsList />} />
    </Routes>
  );
}
