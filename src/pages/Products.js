import { faCheck, faInfo, faPen, faPlus, faSearch, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";

const Products = () => {
    const [dssp, setDssp] = useState([]);

    const [sp, setSp] = useState({});

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(res => setDssp(res.data.products));
    }, []);
// muốn search hàm gần đúng dùng includes
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setIdToDelete(id);
    }

    const [idToDelete, setIdToDelete] = useState();

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSp({ ...sp, [name]: value });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        axios.post('https://dummyjson.com/products/add', sp)
            .then(res => setDssp([...dssp, res.data]));
    }

    const handleDelete = (id) => {
        axios.delete(`https://dummyjson.com/products/${id}`)
            .then(() => setDssp(dssp.filter(item => item.id !== id)));
        handleClose();
    }
    const [keyword, setKeyword] = useState("");
    const HandleSearch = (e) => {
        e.preventDefault(); // form cơ chế html là tự đọng load lại khi enter
        let relsuft = dssp.filter(item => item.title.includes(keyword));
        setDssp(relsuft);
    }
    // state: total lưu tổng giá tiền
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let tong = 0;
        axios.get("https://dummyjson.com/products")
        .then(res => setDssp(res.data.products))
        dssp.forEach(item => tong += item.price);
        setTotal(tong);
        let max = 0;
        dssp.forEach(item => {tong += item.price
            if (item.price > max){
            max = item.price;  
            }    
            setMaxtotal(max);
            });
    })

    const [maxtotal, setMaxtotal] = useState(0);


    return (
        <>
            <Container>
                <h1>Danh sách sản phẩm </h1>
                <Form onSubmit={HandleSearch}>
                    <Form.Control type="text" onChange={(e) => setKeyword(e.target.value)}></Form.Control> 
                    <Button  onClick={HandleSearch}>
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>Tìm kiếm
                    </Button>
                </Form>
                <p>Tổng giá tiền: {total},000 VNĐ</p>
                <p>Sản phẩm có giá tiền max: {maxtotal},000 VNĐ</p>
                <Row>
                    <Col md={3}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Mã số:</Form.Label>
                                <Form.Control type="text" name="id" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên SP:</Form.Label>
                                <Form.Control type="text" name="title" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Giá tiền:</Form.Label>
                                <Form.Control type="text" name="price" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tồn kho:</Form.Label>
                                <Form.Control type="text" name="stock" onChange={handleChange} />
                            </Form.Group>
                            <Button variant="success" type="submit" onClick={handleAdd}>
                                <FontAwesomeIcon icon={faPlus} /> Thêm
                            </Button>
                        </Form>
                    </Col>

                    <Col md={9}>
                        <h1>Danh sách sản phẩm</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Mã số</th>
                                    <th>Tên SP</th>
                                    <th>Giá tiền</th>
                                    <th>Tồn kho</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dssp.map(item => (
                                        <tr>
                                            <td>
                                                <img src={item.thumbnail} style={{ width: '100px' }} />
                                            </td>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>{item.stock}</td>
                                            <td>
                                                <Button variant="info">
                                                    <FontAwesomeIcon icon={faInfo} />
                                                </Button>
                                                <Button variant="warning">
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                                <Button variant="danger" onClick={() => handleShow(item.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(idToDelete)}>
                        <FontAwesomeIcon icon={faCheck} /> Xóa
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Products;