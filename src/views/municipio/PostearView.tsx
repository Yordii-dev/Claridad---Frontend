import { Button, Form } from "react-bootstrap";
import AlertComponent from "../../components/AlertComponent";
import { useRef, useState } from "react";

function PostearView() {
  const postForm = useRef<any>(null);
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    id_requerimiento: 0,
    nombre: "",
    fecha_publicacion: "01-01-01",
    fecha_fin: "",
    costo: "",
    tipo: "",
    estado: "Vigente",
    detalle: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postHandler = async (e: any) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/server/requerimientos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error en enviar la solicitud de postear");
      }

      const json = await res.json();

      if (json.status == "success") {
        if (postForm.current) {
          postForm.current.reset();
          setShowAlert(true);
        }
      }
    } catch (error: any) {}
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
            <Form.Label>Fecha finalizacion</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="fecha_fin"
              type="date"
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
            <Form.Control type="file" required />
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
