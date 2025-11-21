import { useCallback, type FC } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../session";

export const Navbar: FC<{ title: string }> = ({ title }) => {
  const {
    session: { name },
  } = useSession();
  const navigate = useNavigate();

  const doLogout = useCallback(() => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <header className="navbar">
        <section className="navbar-section">
          <span className="navbar-brand mr-2 p-2 text-ellipsis">
            The Last of Guss
          </span>
        </section>
        <section className="navbar-center text-ellipsis">
          <h5 className="m-0">{title}</h5>
        </section>
        <section className="navbar-section">
          <div className="hide-sm">{name}</div>
          <div className="divider-vert hide-sm"></div>
          <button className="btn" onClick={doLogout}>
            Выход
          </button>
        </section>
      </header>
      <div className="divider mt-0"></div>
    </>
  );
};

export default Navbar;
