import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Requerimiento } from "../../types/Requerimiento";

function PostsComponent() {
  const [requerimientos, setRequerimientos] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/server/requerimientos", {
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
          Authorization: `Bearer ${token}`, // Encabezado de autorización
        },
      });
      const json = await res.json();

      if (json.status == "success") {
        setRequerimientos(json.data.requerimientos);
        console.log(json.data.requerimientos);
      }
    })();
  }, []);

  return (
    <Table striped className="mt-5">
      <thead>
        <tr>
          <th>Requerimiento</th>
          <th>Monto</th>
          <th>Estado</th>
          <th>Anexos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {requerimientos.map((req: Requerimiento) => {
          if (req.estado == "Terminado")
            return (
              <tr key={req.id_requerimiento}>
                <td className="text-secondary">{req.nombre}</td>
                <td className="text-secondary">{req.costo}</td>
                <td className="text-secondary">{req.estado}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            );
          return (
            <tr key={req.id_requerimiento}>
              <td>{req.nombre}</td>
              <td>{req.costo}</td>
              <td>{req.estado}</td>
              <td>
                <Link to="/">Ver</Link>
              </td>
              <td>
                <Link to="/">Ver propuestas</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default PostsComponent;
