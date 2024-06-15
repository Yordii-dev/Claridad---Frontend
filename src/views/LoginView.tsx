import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";
import { Login } from "../services/UserService";

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

    const json = await Login(formData);

    if (json.status == "success") {
      navigate("/main");
      localStorage.setItem("token", json.data.token);
      localStorage.setItem("id_usuario", json.data.user.id_usuario);
    } else {
      setShowAlert(true);
    }
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
