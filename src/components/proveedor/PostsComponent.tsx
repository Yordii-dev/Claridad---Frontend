import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'

function PostsComponent() {
  return (
    <Table striped className='mt-5'>
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
        <tr>
          <td>Servicio de transporte</td>
          <td>3500</td>
          <td>Vigente</td>
          <td>
            <Link to='/'>Ver</Link>
          </td>
          <td>
            <Link to='/'>Postular</Link>
          </td>
        </tr>
        <tr>
          <td>Servicio de gasfiteria</td>
          <td>800</td>
          <td>Vigente</td>
          <td>
            <Link to='/'>Ver</Link>
          </td>
          <td>
            <Link to='/'>Postular</Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default PostsComponent;