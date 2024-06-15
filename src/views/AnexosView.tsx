import { useContext, useEffect, useState } from "react";
import { AnexoType } from "../types/AnexoType";
import docxIcon from "./../assets/extensions/docx.webp";
import pdfIcon from "./../assets/extensions/pdf.jpeg";
import {
  GetAnexosRequerimiento,
  GetUrlAnexoRequerimiento,
} from "../services/AnexoRequerimientoService";
import { useLocation } from "react-router";
import { KeyboardReturnOutlined } from "@mui/icons-material";
import { MyContext } from "../context/Context";

function AnexosView() {
  const location = useLocation();
  const { idRequerimiento, nombreRequerimiento } = location.state;

  const [anexos, setAnexos] = useState<AnexoType[]>([]);
  const { anexoSelected, setAnexoSelected } = useContext(MyContext);

  useEffect(() => {
    (async () => {
      const results = await GetAnexosRequerimiento(idRequerimiento);
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
        <a href="/main/posts">
          <KeyboardReturnOutlined></KeyboardReturnOutlined>
        </a>
        <h4 className="text-end">
          Anexos de:{" "}
          <span className="text-secondary">{nombreRequerimiento}</span>
        </h4>
      </div>
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
          src={GetUrlAnexoRequerimiento(anexoSelected)}
          width="100%"
          height="100%"
          title="Visualizador de PDF"
        />
      ) : (
        <div className="h-50 d-flex justify-content-center align-items-center">
          <a
            href={GetUrlAnexoRequerimiento(anexoSelected)}
            className="btn btn-primary mt-5 px-5 py-2"
          >
            Descargar anexo
          </a>
        </div>
      )}
    </div>
  );
}

export default AnexosView;
