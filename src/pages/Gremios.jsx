import { useState } from "react"; //hace que se almacene el estado y se actualice cuando cambie
import {obtenerGremios, guardarGremios} from "../data/seedData";

import {Container, Form, Button, Card, Row, Col} from "react-bootstrap"; //importa los componentes de react-bootstrap

export default function Gremios() {

    const [gremios, setGremios] = useState(obtenerGremios); //lista de gremios

    const[nombre, setNombre] = useState(""); //nombre del gremio
    const[descripcion, setDescripcion] = useState(""); //descripcion del gremio
    

//manejador del formulario 

const manejarEnvio = (e) => {
    e.preventDefault(); //evita que se recargue la pagina al enviar el formulario
    
    if(!nombre.trim() || !descripcion.trim()){ //si el nombre o la descripcion estan vacios, no se hace nada
        return;
    }

    const nuevoGremio = {
        id: Date.now(), 
        nombre: nombre,
        descripcion: descripcion
    };

    const listaActualizada = [...gremios, nuevoGremio]; //se crea una nueva lista de gremios con el nuevo gremio agregado
    setGremios(listaActualizada);
    guardarGremios(listaActualizada); 
    setNombre("");
    setDescripcion("");
 };

 //Lista de gremios ya visualmente
return (
<Container className="mt-3">
    <h2>Registro de Gremios</h2>

<Form onSubmit={manejarEnvio} className="mb-4">
    <Form.Group className="mb-2">
<Form.Label>Nombre del Gremio</Form.Label>
<Form.Control type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
</Form.Group>

<Form.Group className="mb-2">
<Form.Label>Descripcion del Gremio</Form.Label>
<Form.Control type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
    </Form.Group>

    <Button variant="primary" type="submit">Registrar Gremio</Button>
    </Form>

    <h3>Gremios Registrados</h3>

    <Row>
        {gremios.map((gremio) => (
            <Col key={gremio.id} sm={12} md={6} lg={4} className="mb-2">
                <Card>
                    <Card.Body>
                        <Card.Title>{gremio.nombre}</Card.Title>
                        <Card.Text>{gremio.descripcion}</Card.Text>
                    </Card.Body>    
                </Card>
            </Col>
        ))
        }
    </Row>
    </Container>
 );
}