import { Button, Form } from "react-bootstrap";
import AlertComponent from "../components/AlertComponent";
import { UploadAnexosRequerimiento } from "../services/AnexoRequerimientoService";
import { CreateRequirement } from "../services/RequirementService";
import { useEffect, useRef, useState } from "react";
import { KeyboardReturnOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { GetUserById } from "../services/UserService";
import { UsuarioType } from "../types/UsuarioType";
import { CreatePostulation } from "../services/PostulationService";
import { UploadAnexosPostulacion } from "../services/AnexoPostulacionService";

function PostularView() {
  const location = useLocation();
  const id_usuario = Number(localStorage.getItem("id_usuario"));
  const {
    idRequerimiento: id_requerimiento,
    nombreRequerimiento,
    detalle_postulacion,
  } = location.state;

  const postForm = useRef<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [usuario, setUsuario] = useState<UsuarioType>();

  useEffect(() => {
    (async () => {
      setUsuario(await GetUserById(id_usuario));
    })();
  }, []);

  const [formData, setFormData] = useState({
    id_postulacion: 0,
    detalle_postulacion,
    id_requerimiento,
    id_usuario,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postularHandler = async (e: any) => {
    console.log(formData);

    e.preventDefault();
    const response = await CreatePostulation(formData);
    console.log(response);

    if (response.status == "success") {
      const responseAnexos = await UploadAnexosPostulacion(
        selectedFiles,
        response.data.insertId
      );

      if (responseAnexos.status == "success") {
        if (postForm.current) {
          postForm.current.reset();
          setShowAlert(true);
        }
      }
    }
  };

  const handleFileChange = (event: any) => {
    setSelectedFiles(event.target.files);
  };

  return (
    <>
      <AlertComponent
        variant="success"
        visible={showAlert}
        title={"Exito!"}
        description={"Ha enviado su postulacion exitosamente"}
        actionClose={() => {
          navigate("/main/posts");
        }}
      ></AlertComponent>
      <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <a href="/main/posts">
            <KeyboardReturnOutlined></KeyboardReturnOutlined>
          </a>
          <h4 className="text-end">
            Postular a:{" "}
            <span className="text-secondary"> {nombreRequerimiento}</span>
          </h4>
        </div>
        <Form ref={postForm} className="mt-4" onSubmit={postularHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Ruc</Form.Label>
            <Form.Control
              disabled
              type="number"
              required
              defaultValue={usuario?.ruc}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4">
            <Form.Label>Razon social</Form.Label>
            <Form.Control
              type="text"
              disabled
              required
              defaultValue={usuario?.razon_social}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-4">
            <Form.Label>Directorio fiscal</Form.Label>
            <Form.Control
              type="text"
              disabled
              required
              defaultValue={usuario?.directorio_fiscal}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-4">
            <Form.Label>NUmero de cuenta bancaria</Form.Label>
            <Form.Control
              type="number"
              disabled
              required
              defaultValue={usuario?.numero_cuenta}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-4">
            <Form.Label>Anexos</Form.Label>
            <Form.Control
              accept=".doc,.docx,.pdf"
              type="file"
              multiple
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-4">
            <Form.Label>Detalle</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleChange}
              name="detalle_postulacion"
              required
              defaultValue={detalle_postulacion}
            />
          </Form.Group>

          <Button className="d-block" type="submit" variant="primary">
            Postular
          </Button>
        </Form>
      </div>
    </>
  );
}

export default PostularView;
