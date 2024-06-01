import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function FilterComponent(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>Filtros de publicaciones</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center">
          <Form.Label className="h5">Tipos de publicacion: </Form.Label>
          <Form.Select className="mx-3 w-25" size="lg">
            <option>Todos</option>
            <option>Servicios</option>
            <option>Bienes</option>
          </Form.Select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancelar
        </Button>
        <Button onClick={props.onHide}>Listo</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilterComponent;
