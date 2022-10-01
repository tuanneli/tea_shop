import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';

function ColorSchemesExample() {
    return (
        <>
            <Navbar bg="black" variant="dark">
                <Container className={'navbar-container'}>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className={'navbar-item'} href="/">Home</Nav.Link>
                        <Nav.Link className={'navbar-item'} href="#features">Features</Nav.Link>
                        <Nav.Link className={'navbar-item'} href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className={'navbar-item'} href="/login">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default ColorSchemesExample;