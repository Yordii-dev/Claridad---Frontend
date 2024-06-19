import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/Context";
import { GetUserById } from "../services/UserService";
import { UsuarioType } from "../types/UsuarioType";
import ProveedorImg from "../assets/proveedor.png";

import Municipio from "./../assets/municipio.png";
function SidebarComponent() {
  const navigate = useNavigate();
  const { selectedOption, setSelectedOption } = useContext(MyContext);
  const [usuario, setUsuario] = useState<UsuarioType>();
  useEffect(() => {
    (async () => {
      const idUsuario = Number(localStorage.getItem("id_usuario"));
      setUsuario(await GetUserById(idUsuario));
    })();
  }, []);
  const clickHanlder = (e: any) => {
    if (e.target.text) {
      setSelectedOption(e.target.text);
    }
  };
  const cerrarSesionHandler = (e: any) => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="container-sidebar px-2 bg-white">
      <div className="container-photo mt-3 mx-auto text-center">
        {usuario?.id_rol == 1 ? (
          <img src={Municipio} alt="" />
        ) : (
          <img src={ProveedorImg} alt="" />
        )}

        <h5 className="mt-2">{usuario?.nombre}</h5>
        <p className="text-success">
          {usuario?.id_rol == 1 ? "Municipio" : "Proveedor"}
        </p>
      </div>
      <div className="mt-5">
        <div
          className={`option rounded mb-3 ${
            selectedOption == "Publicaciones" && "active-option"
          }`}
          role="button"
          onClick={clickHanlder}
        >
          <p className="py-2 px-3 m-0">
            <Link
              to="posts"
              style={{ color: "#212529", fontWeight: "normal" }}
              className="d-block text-decoration-none"
            >
              Publicaciones
            </Link>
          </p>
        </div>
        {usuario?.id_rol == 1 && (
          <div
            className={`option rounded mb-3 ${
              selectedOption == "Publicar" && "active-option"
            }`}
            role="button"
            onClick={clickHanlder}
          >
            <p className="py-2 px-3 m-0">
              <Link
                to="postear"
                style={{ color: "#212529", fontWeight: "normal" }}
                className="d-block text-decoration-none"
              >
                Publicar
              </Link>
            </p>
          </div>
        )}
        {usuario?.id_rol == 2 && (
          <div
            className={`option rounded mb-3 ${
              selectedOption == "Notificaciones" && "active-option"
            }`}
            role="button"
            onClick={clickHanlder}
          >
            <p className="py-2 px-3 m-0">
              <Link
                to="notify"
                style={{ color: "#212529", fontWeight: "normal" }}
                className="d-block text-decoration-none"
              >
                Notificaciones
              </Link>
            </p>
          </div>
        )}
        <div
          className={`option rounded mx-2 mb-3 cerrar-sesion-option ${
            selectedOption == "Cerrar sesion" && "active-option"
          }`}
          role="button"
          onClick={cerrarSesionHandler}
        >
          <p className="py-2 px-3 m-0">Cerrar sesion</p>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
