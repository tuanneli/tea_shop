import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import {AccountCircle, EmojiFoodBeverage, Person, PersonAddAlt1, Engineering} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {Context, IContext} from "../../index";
import {observer} from "mobx-react-lite";


const ColorSchemesExample = observer(() => {

    const {user} = useContext(Context) as IContext;

    const handleExit = () => {
        user.setIsAuth(false);
        localStorage.setItem('token', "");
    }

    return (
        <>
            <Navbar bg="black" variant="dark" className="navbar-box">
                <Container className={'navbar-container'}>
                    <Nav className="me-auto">
                        <Nav className='navbar-item border-start border-white'> <Link className="link-style"
                                                                                      to={'/info'}>Информация
                            о
                            песетителе &nbsp;{<Person/>}</Link> </Nav>
                        <Nav className={'navbar-item'}> <Link className="link-style" to={"/addclient"}>Добавить
                            постетителя &nbsp;{<PersonAddAlt1/>}</Link>
                        </Nav>
                        <Nav className={'navbar-item'}> <Link className="link-style" to={"/goodslist"}>Список
                            товаров &nbsp;{<EmojiFoodBeverage/>}</Link>
                        </Nav>
                        <Nav className={'navbar-item'}> <Link className="link-style" to={"/workers"}>Работники &nbsp;{
                            <Engineering/>}</Link>
                        </Nav>
                    </Nav>
                    {!user.isAuth ? <Nav>
                            <Nav className='navbar-item border-start border-white'> <Link className="link-style"
                                                                                          to={"/register"}>{
                                <AccountCircle/>} Регистрация </Link></Nav>
                        </Nav> :
                        <Nav className='navbar-item border-start border-white'>
                            <Link to={'/home'} className="link-style" onClick={handleExit}>Выйти</Link>
                        </Nav>
                    }

                </Container>
            </Navbar>
        </>
    );
})

export default ColorSchemesExample;