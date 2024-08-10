import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Auth from "@/pages/auth";
import Home from "@/pages/home";

import { ProtectedRoute } from "./components/protected-route";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Auth />} path="/auth" />
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          path="/"
        />
      </Switch>
    </BrowserRouter>
  );
}
