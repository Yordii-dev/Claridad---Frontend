import PostsComponent from "../components/PostsComponent";
import { Filter1Rounded, KeyboardReturnOutlined } from "@mui/icons-material";
import FilterComponent from "../components/FilterComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { PostulacionType } from "../types/PostulacionType";
import { ObtenerPostulacionesDeRequerimiento } from "../services/PostulationService";
import { PostulacionComponent } from "../components/PostulacionComponent";

function PropuestasView() {
  const location = useLocation();
  const [postulaciones, setPostulaciones] = useState<PostulacionType[]>();
  const { idRequerimiento, nombreRequerimiento, detalle_requerimiento } =
    location.state;

  useEffect(() => {
    (async () => {
      const res = await ObtenerPostulacionesDeRequerimiento(idRequerimiento);

      if (res.status == "success") {
        setPostulaciones(res.data.postulaciones_requerimiento);
      }
    })();
  }, []);
  return (
    <>
      <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <a href="/main/posts">
            <KeyboardReturnOutlined></KeyboardReturnOutlined>
          </a>

          <h4 className="text-end">
            Cotizaciones de:{" "}
            <span className="text-secondary"> {nombreRequerimiento}</span>
          </h4>
        </div>

        <div className="mt-4">
          <h6>Detalle del requerimiento</h6>
          <p>{detalle_requerimiento}</p>
          <div className="mt-4 container-postulations">
            {postulaciones?.map((postulacion: PostulacionType, i) => (
              <PostulacionComponent
                key={i}
                id_postulacion={postulacion.id_postulacion}
                detalle_postulacion={postulacion.detalle_postulacion}
                nombre={postulacion.nombre}
                ruc={postulacion.ruc}
                razon_social={postulacion.razon_social}
                requerimientoData={location.state}
                id_usuario_postulante={postulacion.id_usuario}
              ></PostulacionComponent>
            ))}
          </div>
        </div>
        {postulaciones?.length == 0 && (
          <p className="text-center text-secondary mt-4 fst-italic">
            Aun no hay postulaciones para este requerimiento.
          </p>
        )}
      </div>
    </>
  );
}

export default PropuestasView;
