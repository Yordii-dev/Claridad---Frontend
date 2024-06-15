import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { GetDataByRuc } from "../services/SunatService";
import AlertComponent from "../components/AlertComponent";
import { Signin } from "../services/UserService";

function RegisterView() {
  const registerBtn = useRef<any>(null);
  const registerForm = useRef<any>(null);

  const [alert, setAlert] = useState({
    variant: "",
    visible: false,
    title: "",
    description: "",
  });

  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
    dni: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    ruc: "",
    razon_social: "",
    directorio_fiscal: "",
    numero_cuenta: "",
  });
  const [ctrlErrorVisible, setCtrlErrorVisible] = useState({
    name: "",
    visible: false,
  });

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    if (name == "ruc") {
      if (value.length == 11) {
        if (registerBtn.current) {
          registerBtn.current.disabled = false;
        }
        setCtrlErrorVisible({
          name,
          visible: false,
        });

        const response = await GetDataByRuc(value);

        if (response.status == "success") {
          setFormData((prevData) => ({
            ...prevData,
            razon_social: response.data.sunatData.razonSocial,
          }));
          setAlert({
            ...alert,
            visible: false,
          });
        } else {
          setFormData((prevData) => ({
            ...prevData,
            razon_social: "",
          }));

          setAlert({
            variant: "error",
            visible: true,
            title: response.status,
            description: response.statusText || response.data.message,
          });
        }
      } else {
        if (registerBtn.current) {
          registerBtn.current.disabled = true;
        }

        setCtrlErrorVisible({
          name,
          visible: true,
        });
        setFormData((prevData) => ({
          ...prevData,
          razon_social: "",
        }));
      }
    }

    if (name == "dni") {
      if (value.length == 8) {
        if (registerBtn.current) {
          registerBtn.current.disabled = false;
        }
        setCtrlErrorVisible({
          name,
          visible: false,
        });
      } else {
        if (registerBtn.current) {
          registerBtn.current.disabled = true;
        }
        setCtrlErrorVisible({
          name,
          visible: true,
        });
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registrarHandler = async (e: any) => {
    e.preventDefault();

    const json = await Signin(formData);

    if (json.status && json.status == "success") {
      if (registerForm.current) {
        registerForm.current.reset();
        setFormData((prevData) => ({
          ...prevData,
          razon_social: "",
        }));
      }
    }

    setAlert({
      variant: json.status == "success" ? "success" : "error",
      visible: json.status == "success",
      title: json.status,
      description:
        json.status == "success"
          ? "Se ha registrado correctamente"
          : json.statusText || json.data.message,
    });
  };

  return (
    <div>
      <AlertComponent
        variant={alert.variant}
        visible={alert.visible}
        title={alert.title}
        description={alert.description}
      ></AlertComponent>

      <div className="bg-white w-50 mx-auto mt-4 p-4 rounded">
        <h4 className="text-center">Registrate</h4>
        <Form ref={registerForm} className="mt-4" onSubmit={registrarHandler}>
          <div className="d-flex align-items-top justify-content-between">
            <div className="mx-1 d-flex flex-column w-50">
              <div className="">
                <Form.Text className="h2">Informacion de cuenta</Form.Text>

                <Form.Group
                  className="mb-3 mt-4"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="correo"
                    onChange={handleChange}
                    type="email"
                    placeholder="Correo electronico"
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="contrasena"
                    onChange={handleChange}
                    type="password"
                    placeholder="Contraseña"
                    required
                  />
                </Form.Group>
              </div>

              <div className="mt-1">
                <Form.Text className="h2">Informacion empresarial</Form.Text>

                <Form.Group
                  className="mb-3 mt-4"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="ruc"
                    onChange={handleChange}
                    type="number"
                    placeholder="Ruc"
                    required
                  />
                  <Form.Text className="d-block text-end text-danger">
                    {ctrlErrorVisible.name == "ruc" &&
                      ctrlErrorVisible.visible &&
                      "Debe contener 11 digitos"}
                  </Form.Text>
                </Form.Group>

                <Form.Group
                  className="mb-3 mt-4"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="razon_social"
                    onChange={handleChange}
                    defaultValue={formData.razon_social}
                    disabled
                    type="text"
                    placeholder="Razon social"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="directorio_fiscal"
                    onChange={handleChange}
                    type="text"
                    placeholder="Directorio fiscal"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="numero_cuenta"
                    onChange={handleChange}
                    type="number"
                    placeholder="Numero de cuenta bancaria"
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <div className="mx-1 w-50">
              <Form.Text className="h2">Informacion personal</Form.Text>

              <Form.Group
                className="mb-3 mt-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="dni"
                  onChange={handleChange}
                  type="number"
                  placeholder="Dni"
                  required
                />
                <Form.Text className="d-block text-end text-danger">
                  {ctrlErrorVisible.name == "dni" &&
                    ctrlErrorVisible.visible &&
                    "Debe contener 8 digitos"}
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="nombre"
                  onChange={handleChange}
                  type="text"
                  placeholder="Nombre"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="apellido"
                  onChange={handleChange}
                  type="text"
                  placeholder="Apellido"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="direccion"
                  onChange={handleChange}
                  type="text"
                  placeholder="Direccion"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="telefono"
                  onChange={handleChange}
                  type="number"
                  placeholder="Telefono"
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center justify-content-between">
            <p className="mt-4 text-center">
              ¿Ya tienes una cuenta?
              <Link to="/login" className="text-primary mx-1" role="button">
                Inicia sesion
              </Link>
              .
            </p>

            <Button
              className="d-block"
              ref={registerBtn}
              type="submit"
              variant="primary"
            >
              Registrarse
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterView;
