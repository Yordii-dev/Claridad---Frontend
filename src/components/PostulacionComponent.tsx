import { useNavigate } from "react-router";

export function PostulacionComponent({
  id_postulacion,
  detalle_postulacion,
  nombre,
  ruc,
  razon_social,
  id_usuario_postulante,
  requerimientoData,
}: any) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/main/cotizacion", {
      state: {
        id_postulacion,
        detalle_postulacion,
        nombre,
        ruc,
        razon_social,
        id_usuario_postulante,
        requerimientoData,
      },
    });
  };
  return (
    <div
      role="button"
      className="postulacion-card card mb-3"
      style={{ maxWidth: "18rem" }}
      onClick={handleClick}
    >
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center justify-content-between">
          <p className="p-0 m-0 text-success">Proveedor</p>
          <small>{nombre}</small>
        </h5>
        <hr />
        <p className="card-text">{detalle_postulacion}</p>
        <p className="card-text">
          <strong>Ruc:</strong> {ruc}
        </p>
        <p className="card-text">
          <strong>Razon social:</strong> {razon_social}
        </p>
      </div>
    </div>
  );
}
