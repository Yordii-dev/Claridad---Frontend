import { Link, useNavigate } from "react-router-dom";
function SidebarComponent() {
  const navigate = useNavigate();
  const cerrarSesionHandler = (e: any) => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="container-sidebar px-2 bg-white">
      <div className="container-photo mt-3 mx-auto text-center">
        <img src="http://via.placeholder.com/640x360" alt="" />
        <h5 className="mt-2">Municipio XXXX</h5>
        <p className="text-success">Municipio</p>
      </div>
      <div className="mt-5">
        <div className="active-option rounded mb-3" role="button">
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
        <div className="active-option rounded mb-3" role="button">
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
        <div
          className="active-option rounded mx-2 mb-3 cerrar-sesion-option"
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
