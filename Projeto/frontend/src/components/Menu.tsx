import { NavLink } from "react-router-dom";
import "./menu.css";

export function Menu() {
  return (
    <nav className="menu">
      <NavLink to="/" end>
        Listar
      </NavLink>

      <NavLink to="/cadastrar">
        Cadastrar
      </NavLink>

      <NavLink to="/buscar">
        Buscar
      </NavLink>
    </nav>
  );
}
