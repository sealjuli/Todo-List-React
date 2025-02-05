import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ModalWindow } from "./ModalWindow";
import "../App.css";

export function RegisterPage() {
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
      "https://todo-redev.herokuapp.com/api/users/register",
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
      // пользователь зарегистрирован, залогиньтесь
      navigate("/Todo-List-React/login");
    } else if (response.status === 400) {
      const resp = await response.json();
      setShowModal(true);
      setErrText(resp.message);
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
  };

  const onClickLogout = () => {
    navigate("/Todo-List-React/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="label_register">username</label>
          <input
            placeholder="Dino_saur_cream"
            {...register("username", {
              required: "username required",
            })}
          />
        </div>
        <div className="form-group">
          <label className="label_register">email</label>
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
        <div className="form-group">
          <label className="label_register">password</label>
          <input
            type="password"
            placeholder="secret_Info123"
            {...register("password", {
              required: "password required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message:
                  "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
              },
            })}
          />
        </div>
        <div className="form-group">
          <label className="gender">gender</label>
          <span>Male</span>
          <input
            className="gender_input"
            type="radio"
            {...register("gender", { required: "Choose your gender" })}
            value="male"
          />
          <span>Female</span>
          <input
            className="gender_input"
            type="radio"
            {...register("gender", { required: "Choose your gender" })}
            value="female"
          />
        </div>
        <div className="form-group">
          <label className="label_register">age</label>
          <input
            placeholder="48"
            {...register("age", {
              required: "age required",
            })}
          />
        </div>
        <p style={{ color: "red" }}>
          {errors.name?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.gender?.message ||
            errors.age?.message}
        </p>
        <button type="submit">Sign Up</button>
      </form>

      <ModalWindow
        showModal={showModal}
        setShowModal={setShowModal}
        text={errText}
      />

      <p className="logout" onClick={onClickLogout}>
        "Already have an account? Log in"
      </p>
    </div>
  );
}
