import { Routes, Route, Navigate } from "react-router-dom";
import { RoutesClass } from "./helpers/Routes";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./components/Layout";
import { Todo } from "./components/Todo";

import "./App.css";

export function App() {
  return (
    <div>
      <Routes>
        <Route path={RoutesClass.root} element={<Layout />}>
          <Route index element={<Navigate to={RoutesClass.login} replace />} />
          <Route path={RoutesClass.register} element={<RegisterPage />} />
          <Route path={RoutesClass.login} element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={RoutesClass.todos} element={<Todo />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
