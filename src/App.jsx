import { Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/Todo-List-React" element={<Layout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="todo" element={<Todo />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
