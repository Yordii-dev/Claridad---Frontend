import { Button, Form } from "react-bootstrap";
import AlertComponent from "../components/AlertComponent";
import { UploadAnexosRequerimiento } from "../services/AnexoRequerimientoService";
import { CreateRequirement } from "../services/RequirementService";
import { useRef, useState } from "react";

function PostearView() {
  const postForm = useRef<any>(null);
  const [showAlert, setShowAlert] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState(null);

  const sumarDiasSinFinDeSemana = (fechaInicial: any, dias: any) => {
    const fecha = new Date(fechaInicial);
    let diasRestantes = dias;

    while (diasRestantes > 0) {
      // Sumar un día
      fecha.setDate(fecha.getDate() + 1);

      // Excluir sábados (día 6) y domingos (día 0)
      if (fecha.getDay() !== 6 && fecha.getDay() !== 0) {
        diasRestantes--;
      }
    }

    return formatDate(fecha);
  };

  const formatDate = (now: Date) => {
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;

    return formattedDate;
  };
  const obtenerFechaActual = () => {
    const now = new Date();

    return formatDate(now);
  };

  const [formData, setFormData] = useState({
    id_requerimiento: 0,
    nombre: "",
    fecha_publicacion: obtenerFechaActual(),
    fecha_fin: sumarDiasSinFinDeSemana(obtenerFechaActual(), 10),
    costo: "",
    tipo: "",
    estado: "Vigente",
    detalle: "",
    id_usuario_ganador: null,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postHandler = async (e: any) => {
    console.log(formData);

    e.preventDefault();
    const response = await CreateRequirement(formData);

    if (response.status == "success") {
      const responseAnexos = await UploadAnexosRequerimiento(
        selectedFiles,
        response.data.insertId
      );

      if (responseAnexos.status == "success") {
        if (postForm.current) {
          postForm.current.reset();
          setShowAlert(true);
        }
      }
      console.log(responseAnexos);
    }
    console.log(response);
  };

  const handleFileChange = (event: any) => {
    setSelectedFiles(event.target.files);
  };
  return (
    <>
      <AlertComponent
        variant="success"
        visible={showAlert}
        title={"Publicado!"}
        description={"El requerimiento se ha publicado correctamente"}
      ></AlertComponent>
      <div className="h-100 flex-grow-1 align-self-start mx-3 p-4 bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <h3>Publicar servicios o bienes</h3>
        </div>
        <Form ref={postForm} className="mt-4" onSubmit={postHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de requerimiento</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="nombre"
              type="text"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4">
            <Form.Label>Costo</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="costo"
              type="number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-4">
            <Form.Label>Tipo</Form.Label>
            <Form.Select name="tipo" onChange={handleChange}>
              <option value=""></option>
              <option value="Servicios">Servicios</option>
              <option value="Bienes">Bienes</option>
            </Form.Select>
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
              name="detalle"
              required
            />
          </Form.Group>

          <Button className="d-block" type="submit" variant="primary">
            Publicar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default PostearView;
