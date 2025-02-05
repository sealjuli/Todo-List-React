import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ModalWindow } from "./ModalWindow";
import "../App.css";

export function LoginPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [errText, setErrText] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(
      "https://todo-redev.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const json = await response.json();
      // пользователь залогинен
      localStorage.setItem("token", json.token);
      navigate("/Todo-List-React/todo");
    } else if (response.status === 400) {
      const resp = await response.json();
      setShowModal(true);
      setErrText(resp.message);
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
  };

  const onClickLogout = () => {
    navigate("/Todo-List-React/register");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group login">
          <label>email</label>
          <input
            type="email"
            placeholder="dino_saur_cream@gmail.com"
            {...register("email", {
              required: "email required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "Enter correct email",
              },
            })}
          />
        </div>
        <div className="form-group login">
          <label>password</label>
          <input
            type="password"
            placeholder="secret_Info123"
            {...register("password", {
              required: "password required",
            })}
          />
        </div>
        <p style={{ color: "red" }}>
          {errors.email?.message || errors.password?.message}
        </p>
        <button type="submit">Log In</button>
      </form>

      <ModalWindow
        showModal={showModal}
        setShowModal={setShowModal}
        text={errText}
      />

      <p className="logout" onClick={onClickLogout}>
        "Don't have an account? Sign Up"
      </p>
    </div>
  );
}
