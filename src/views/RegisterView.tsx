import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'

function RegisterView(){
    return <div className="bg-white w-50 mx-auto mt-4 p-4 rounded">
        <h4 className='text-center'>Registrate</h4>
        <Form className='mt-4'>
            <div className='d-flex align-items-center justify-content-between'>                
            
                <div className='mx-1 d-flex flex-column w-50'>
                    <div className='mt-2'>
                        <Form.Text className='h2'>Informacion de cuenta</Form.Text>

                        <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">                            
                            <Form.Control type="password" placeholder='Contraseña'/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                             
                            <Form.Control type="password" placeholder='Repetir contraseña'/>
                        </Form.Group>
                    </div>

                    <div>
                        <Form.Text className='h2'>Informacion empresarial</Form.Text>

                        <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">                        
                            <Form.Control type="number" placeholder='Ruc'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                            <Form.Control type="email" placeholder='Correo electronico'/>
                        </Form.Group>
                    </div> 
                        
                </div>     
                <div className='mx-1 w-50'>                
                    <Form.Text className='h2'>Informacion personal</Form.Text>

                    <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">                        
                        <Form.Control type="number" placeholder='Dni'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                        <Form.Control type="text" placeholder='Nombre'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                        <Form.Control type="text" placeholder='Apellido'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                        <Form.Control type="text" placeholder='Direccion'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                        <Form.Control type="number" placeholder='Telefono'/>
                    </Form.Group>
                </div>                             
            </div>
            <div className='mt-3 d-flex align-items-center justify-content-between'>
                <p className='mt-4 text-center'>
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className='text-primary mx-1' role='button'>Inicia sesion</Link>
                .</p>

                <Button className='d-block' variant="primary">Registrarse</Button>
            </div>
        </Form>
    </div>
}

export default RegisterView