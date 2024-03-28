import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to='/' className="nav-link">Trang chủ</Link>
                            <Link to='/login' className="nav-link">Đăng nhập</Link>
                            <Link to='/products' className="nav-link">Sản phẩm</Link>
                            <Link to='/users' className="nav-link">Tài khoản</Link>
                            <Link to='/posts' className="nav-link">Posts</Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Outlet />
            </Container>
        </>
    );
}

export default Layout;