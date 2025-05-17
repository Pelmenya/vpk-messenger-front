// src/pages/Login.jsx
import type { FC} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage:FC = () =>  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.message || "Неверные данные");
        setShake(true);
        setTimeout(() => { setShake(false); }, 500);
        return;
      }

      if (data.token && data.user) {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("current_user", JSON.stringify(data.user));
        navigate("/chat");
      }
    } catch (err) {
      setAuthError("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="auth-page">
      <div className="background-container">
        <div className="background-overlay"></div>
        <div className="background-text">
          <h1>Добро пожаловать в Swift Chat</h1>
          <p>Общайтесь с друзьями и коллегами в реальном времени</p>
        </div>
      </div>

      <div className="container auth animate__animated animate__fadeInDown">
        <h2 className="animate__animated animate__fadeInUp">Добро пожаловать!</h2>
        <p className="animate__animated animate__fadeInUp">Введите данные для входа</p>

        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => { setUsername(e.target.value); }}
          className="animate__animated animate__fadeInUp"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          className="animate__animated animate__fadeInUp"
        />

        <button onClick={loginUser} className="btn btn-primary ">
          Войти
        </button>

        <p>
          Нет аккаунта? <a href="/register">Создайте его</a>
        </p>

        {authError && (
          <div className={`error animate__animated ${shake ? "animate__shakeX" : ""}`}>
            {authError}
          </div>
        )}
      </div>
    </div>
  );
}


/* 
// src/pages/Login.jsx
import type { FC} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage:FC = () =>  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.message || "Неверные данные");
        setShake(true);
        setTimeout(() => { setShake(false); }, 500);
        return;
      }

      if (data.token && data.user) {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("current_user", JSON.stringify(data.user));
        navigate("/chat");
      }
    } catch (err) {
      setAuthError("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="auth-page">
      <div className="background-container">
        <div className="background-overlay"></div>
        <div className="background-text">
          <h1>Добро пожаловать в Swift Chat</h1>
          <p>Общайтесь с друзьями и коллегами в реальном времени</p>
        </div>
      </div>

      <div className="container auth animate__animated animate__fadeInDown">
        <h2 className="animate__animated animate__fadeInUp">Добро пожаловать!</h2>
        <p className="animate__animated animate__fadeInUp">Введите данные для входа</p>

        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => { setUsername(e.target.value); }}
          className="animate__animated animate__fadeInUp"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          className="animate__animated animate__fadeInUp"
        />

        <button onClick={loginUser} className="btn btn-primary ">
          Войти
        </button>

        <p>
          Нет аккаунта? <a href="/register">Создайте его</a>
        </p>

        {authError && (
          <div className={`error animate__animated ${shake ? "animate__shakeX" : ""}`}>
            {authError}
          </div>
        )}
      </div>
    </div>
  );
}



 */