import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";

function LoginView() {
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/server/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Error en enviar la solicitud de login");
      }

      const json = await res.json();
      console.log(json);

      if (json.status == "success") {
        if (json.data.user.id_rol == 1) navigate("/municipio");
        if (json.data.user.id_rol == 2) navigate("/proveedor");

        localStorage.setItem("token", json.data.token);
      } else {
        setShowAlert(true);
      }
    } catch (error: any) {}
  };
  return (
    <div>
      <AlertComponent
        variant="error"
        visible={showAlert}
        title={"Incorrecto"}
        description={"Usuario desconocido"}
      ></AlertComponent>
      <div className="bg-white w-50 mx-auto mt-4 p-4 rounded">
        <h4 className="text-center">Login</h4>
        <Form className="mt-4" onSubmit={loginHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              onChange={handleChange}
              name="correo"
              type="email"
              placeholder="Correo"
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 mt-4"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              onChange={handleChange}
              name="contrasena"
              type="password"
              placeholder="Contraseña"
              required
            />
            <a className="d-block text-end" role="button">
              Olvide mi contraseña
            </a>
          </Form.Group>

          <Button className="mx-auto d-block" type="submit" variant="primary">
            Iniciar sesion
          </Button>
          <p className="mt-4 text-center">
            ¿Deseas una cuenta?
            <Link to="/register" className="text-primary mx-1" role="button">
              Registrate
            </Link>
            como proveedor.
          </p>
        </Form>
      </div>
    </div>
  );
}

export default LoginView;
