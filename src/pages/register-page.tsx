import type { FC } from "react";
import { useNavigate, Link } from "react-router-dom";

export const RegisterPage: FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // заглушка
    localStorage.setItem("access_token", "123fake");
    navigate("/chat");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Регистрация</h2>
        <input type="text" placeholder="Имя пользователя" className="input input-bordered w-full mb-2" />
        <input type="password" placeholder="Пароль" className="input input-bordered w-full mb-2" />
        <input type="password" placeholder="Повторите пароль" className="input input-bordered w-full mb-4" />
        <button className="btn btn-primary w-full mb-2" onClick={handleRegister}>
          Зарегистрироваться
        </button>
        <p className="text-center">
          Уже есть аккаунт? <Link to="/login" className="link link-primary">Войти</Link>
        </p>
      </div>
    </div>
  );
}
