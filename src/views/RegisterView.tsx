import {Alert, AlertTitle} from '@mui/material';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'

function RegisterView(){
    const registerBtn = useRef<any>(null);
    const registerForm = useRef<any>(null);

    const [showAlertSuccess, setShowAlertSuccess]= useState(false)

    const [formData, setFormData] = useState({
        correo:"",
        contrasena:"",
        dni:"",
        nombre:"",
        apellido:"",
        direccion:"",
        telefono:"",
        ruc:"",
        razon_social:"",
        numero_cuenta:""
      });
    const [ctrlErrorVisible, setCtrlErrorVisible] = useState({
        name:"",
        visible:false
    })

    const handleChange = (e:any) => {
        const { name, value } = e.target;        
        if(name == "ruc"){
            if(value.length == 11) {
                if (registerBtn.current) {
                    registerBtn.current.disabled = false;                    
                }
                setCtrlErrorVisible({
                    name,
                    visible:false
                })
            }else{  
                if (registerBtn.current) {
                    registerBtn.current.disabled = true;                    
                }

                setCtrlErrorVisible({
                    name,
                    visible:true
                })
            }
        }

        if(name == "dni"){
            if(value.length == 8) {
                if (registerBtn.current) {
                    registerBtn.current.disabled = false;                    
                }
                setCtrlErrorVisible({
                    name,
                    visible:false
                })
            }else{
                if (registerBtn.current) {
                    registerBtn.current.disabled = true;                    
                }
                setCtrlErrorVisible({
                    name,
                    visible:true
                })
            }
            return;
        }

        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    const registrarHandler = async (e:any) => {      
        
        e.preventDefault();
        try {
          const res = await fetch('http://localhost:3000/server/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (!res.ok) {
            throw new Error('Error en enviar la solicitud de registro');
          }  
          
          const json = await res.json()

          if(json.status == "success"){
            if (registerForm.current) {
                registerForm.current.reset()
            }
          }

          setShowAlertSuccess(json.status == "success")          

        } catch (error : any) {          
        }
      };

    return <div>
        {showAlertSuccess &&
        (           
            <div className='d-flex justify-content-end pt-4 px-5 fixed-top'>
                <Alert severity="success">
                    <div className='d-flex justify-content-between align-align-items-center'>
                        <AlertTitle>Exito</AlertTitle>
                        <span role='button' onClick={()=>setShowAlertSuccess(false)}>X</span>
                    </div>
                    Se ha registrado de forma exitosa.
                </Alert>        

            </div>)
        }
        <div className="bg-white w-50 mx-auto mt-4 p-4 rounded">
            <h4 className='text-center'>Registrate</h4>
            <Form ref={registerForm} className='mt-4' onSubmit={registrarHandler}>
                <div className='d-flex align-items-top justify-content-between'>                
                
                    <div className='mx-1 d-flex flex-column w-50'>
                        <div className=''>
                            <Form.Text className='h2'>Informacion de cuenta</Form.Text>

                            <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">                        
                                <Form.Control name="correo" onChange={handleChange} type="email" placeholder='Correo electronico' required/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                            
                                <Form.Control name="contrasena" onChange={handleChange} type="password" placeholder='Contraseña' required/>
                            </Form.Group>
                        </div>

                        <div className='mt-1'>
                            <Form.Text className='h2'>Informacion empresarial</Form.Text>

                            <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">                        
                                <Form.Control name="ruc" onChange={handleChange} type="number" placeholder='Ruc' required/>
                                <Form.Text className='d-block text-end text-danger'>{ctrlErrorVisible.name == "ruc" && ctrlErrorVisible.visible && 'Debe contener 11 digitos'}</Form.Text>
                            </Form.Group>      

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                                <Form.Control name="numero_cuenta" onChange={handleChange} type="number" placeholder='Numero de cuenta' required/>
                            </Form.Group>              
                        </div> 
                            
                    </div>     
                    <div className='mx-1 w-50'>                
                        <Form.Text className='h2'>Informacion personal</Form.Text>

                        <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">                        
                            <Form.Control name="dni" onChange={handleChange} type="number" placeholder='Dni' required/>
                            <Form.Text className='d-block text-end text-danger'>{ctrlErrorVisible.name == "dni" && ctrlErrorVisible.visible && 'Debe contener 8 digitos'}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                            <Form.Control name="nombre" onChange={handleChange} type="text" placeholder='Nombre' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                            <Form.Control name="apellido" onChange={handleChange} type="text" placeholder='Apellido' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                            <Form.Control name="direccion" onChange={handleChange} type="text" placeholder='Direccion' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                        
                            <Form.Control name="telefono" onChange={handleChange} type="number" placeholder='Telefono' required/>
                        </Form.Group>
                    </div>                             
                </div>
                <div className='mt-3 d-flex align-items-center justify-content-between'>
                    <p className='mt-4 text-center'>
                        ¿Ya tienes una cuenta?
                        <Link to="/login" className='text-primary mx-1' role='button'>Inicia sesion</Link>
                    .</p>

                    <Button className='d-block' ref={registerBtn} type='submit' variant="primary">Registrarse</Button>
                </div>
            </Form>
        </div>
    </div>
}

export default RegisterView