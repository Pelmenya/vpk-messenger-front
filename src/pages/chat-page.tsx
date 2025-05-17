import { useNavigate } from "react-router-dom";

export const  ChatPage = () =>  {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-base-100">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать в чат!</h1>
      <button className="btn btn-primary" onClick={logout}>Выйти</button>
    </div>
  );
}
