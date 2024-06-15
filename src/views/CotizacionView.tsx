import { useContext, useEffect, useState } from "react";
import { AnexoType } from "../types/AnexoType";
import docxIcon from "./../assets/extensions/docx.webp";
import pdfIcon from "./../assets/extensions/pdf.jpeg";
import { useLocation } from "react-router";
import { KeyboardReturnOutlined, CheckCircle } from "@mui/icons-material";
import { MyContext } from "../context/Context";
import {
  GetAnexosPostulacion,
  GetUrlAnexoPostulacion,
} from "../services/AnexoPostulacionService";
import { Link } from "react-router-dom";
import WinComponent from "../components/WinComponent";

function CotizacionView() {
  const location = useLocation();
  const {
    id_postulacion,
    detalle_postulacion,
    nombre,
    ruc,
    razon_social,
    id_usuario_postulante,
    requerimientoData,
  } = location.state;

  const [anexos, setAnexos] = useState<AnexoType[]>([]);
  const { anexoSelected, setAnexoSelected } = useContext(MyContext);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    (async () => {
      const results = await GetAnexosPostulacion(id_postulacion);
      setAnexos(results.data.anexos);
      setAnexoSelected(results.data.anexos[0].nombre);
    })();
  }, []);

  const ObtenerIcono = (extension: string) => {
    if (extension == "pdf") return pdfIcon;
    if (extension == "docx" || extension == "doc") return docxIcon;
  };

  const GetExtension = (anexoSelected: string) => {
    let extension = anexoSelected.split(".")[1];

    return extension;
  };

  return (
    <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white  overflow-y-hidden">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/main/propuestas" state={requerimientoData}>
          <KeyboardReturnOutlined></KeyboardReturnOutlined>
        </Link>

        <button
          className="btn btn-primary text-end d-flex align-items-center"
          onClick={() => setModalShow(true)}
        >
          <CheckCircle></CheckCircle>
          <span className="mx-2">Seleccionar cotizacion</span>
        </button>
      </div>
      <div className="mt-3 d-flex align-items-start">
        <div className="w-50">
          <div className="">
            <h6 className="m-0 p-0">Nombre proveedor: </h6>
            <p className="p-0 m-0 mt-2">{nombre}</p>
          </div>
          <br />
          <div className="">
            <h6 className="m-0 p-0">Ruc: </h6>
            <p className="p-0 m-0 mt-2">{ruc}</p>
          </div>
        </div>

        <div className="mx-5">
          <div className="">
            <h6 className="m-0 p-0">Razon social: </h6>
            <p className="p-0 m-0 mt-2">{razon_social}</p>
          </div>
          <br />
          <div className="">
            <h6 className="m-0 p-0">Detalle de la postulacion: </h6>
            <p className="p-0 m-0 mt-2">{detalle_postulacion}</p>
          </div>
        </div>
      </div>
      <br />
      <h6 className="m-0 p-0">Anexos subidos por el proveedor: </h6>
      <div className="anexos d-flex mt-3 overflow-x-auto">
        {anexos.map((anexo: AnexoType, i) => (
          <div
            key={i}
            role="button"
            onClick={() => setAnexoSelected(anexo.nombre)}
            className={`anexo d-flex flex-column align-items-center justify-content-center p-2 border border-1 mx-1 text-center ${
              anexoSelected == anexo.nombre && "anexo-active"
            }`}
          >
            <img src={ObtenerIcono(anexo.extension)} alt="" />
            <span className="mt-3">{anexo.nombre}</span>
          </div>
        ))}
      </div>
      {GetExtension(anexoSelected) == "pdf" ? (
        <iframe
          className="mt-3"
          src={GetUrlAnexoPostulacion(anexoSelected)}
          width="100%"
          height="100%"
          title="Visualizador de PDF"
        />
      ) : (
        <div className="h-50 d-flex justify-content-center align-items-center">
          <a
            href={GetUrlAnexoPostulacion(anexoSelected)}
            className="btn btn-primary mt-5 px-5 py-2"
          >
            Descargar anexo
          </a>
        </div>
      )}
      <WinComponent
        idRequerimiento={requerimientoData.idRequerimiento}
        idUsuarioPostulante={id_usuario_postulante}
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></WinComponent>
    </div>
  );
}

export default CotizacionView;
