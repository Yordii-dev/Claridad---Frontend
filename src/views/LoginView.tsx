import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'

function LoginView(){
    return <div className="bg-white w-50 mx-auto mt-4 p-4 rounded">
        <h4 className='text-center'>Login</h4>
        <Form className='mt-4'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                
                <Form.Control type="number" placeholder='Dni'/>
            </Form.Group>
            <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlTextarea1">                
                <Form.Control type="password"  placeholder='Contraseña'/>
                <a className='d-block text-end' role='button'>Olvide mi contraseña</a>
            </Form.Group>            
        </Form>
        <Button className='mx-auto d-block' variant="primary">Iniciar sesion</Button>
        <p className='mt-4 text-center'>
            ¿Deseas una cuenta? 
            <Link to="/register" className='text-primary mx-1' role='button'>Registrate</Link> 
            como proveedor.</p>
    </div>
}

export default LoginView