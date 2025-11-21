import {
  useCallback,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useNavigate } from "react-router";

import "./style.css";
import { useSession } from "../../session";
import parseAuthToken from "../../utils/parseAuthToken";

export const Login = () => {
  const { setSession } = useSession();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [requestError, setRequestError] = useState("");

  const changeUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (requestError) setRequestError("");
      if (usernameError) setUsernameError("");
      setUsername(e.target.value);
    },
    [
      requestError,
      usernameError,
      setRequestError,
      setUsername,
      setUsernameError,
    ]
  );

  const changePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (requestError) setRequestError("");
      if (passwordError) setPasswordError("");
      setPassword(e.target.value);
    },
    [
      requestError,
      passwordError,
      setRequestError,
      setPassword,
      setPasswordError,
    ]
  );

  const doLogin = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setRequestError("");

      const params = {
        username: username.trim(),
        password: password,
      };
      if (!params.username) return setUsernameError("Обязательное поле");
      if (!params.password) return setPasswordError("Обязательное поле");

      if (usernameError || passwordError) return;

      fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(params),
      }).then((response) => {
        const authToken =
          response.status === 200 && response.headers.get("authorization");

        if (!authToken)
          return setRequestError(
            response.status === 401
              ? "Неверное имя пользователя или пароль."
              : `Ошибка запроса: ${response.statusText}`
          );

        sessionStorage.setItem("authToken", authToken);
        setSession(parseAuthToken(authToken));
        navigate("/");
      });
    },
    [
      username,
      password,
      usernameError,
      passwordError,
      navigate,
      setSession,
      setRequestError,
    ]
  );

  return (
    <form id="login-form">
      <div className="card">
        <div className="card-header">
          <div className="card-title h5 text-center">
            <h4>The Last of Guss</h4>
            <div>Аутентификация</div>
          </div>
        </div>
        <div className="card-body">
          <div className={`form-group ${usernameError ? "has-error" : ""}`}>
            <label className="form-label" htmlFor="input-example-1">
              Имя пользователя
            </label>
            <input
              className="form-input"
              type="text"
              id="username"
              value={username}
              onChange={changeUsername}
            />
            {usernameError && (
              <p className="form-input-hint">{usernameError}</p>
            )}
          </div>
          <div className={`form-group ${passwordError ? "has-error" : ""}`}>
            <label className="form-label" htmlFor="input-example-1">
              Пароль
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              value={password}
              onChange={changePassword}
            />
            {passwordError && (
              <p className="form-input-hint">{passwordError}</p>
            )}
          </div>
        </div>
        <div className="card-footer text-center">
          {requestError && (
            <div className="toast toast-error mb-2 text-left">
              {requestError}
            </div>
          )}
          <button className="btn btn-primary" onClick={doLogin}>
            Отправить
          </button>
        </div>
      </div>
    </form>
  );
};
