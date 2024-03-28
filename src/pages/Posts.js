import { faAdd, faCheck, faInfo, faPen, faPlus, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";

const Posts = () => {
    const [dssp, setDssp] = useState([]);

    const [sp, setSp] = useState({});

    useEffect(() => {
        axios.get('https://dummyjson.com/post')
            .then(res => setDssp(res.data.posts));
    }, []);

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
        axios.post('https://dummyjson.com/post/add', sp)
            .then(res => setDssp([...dssp, res.data]));
    }

    const handleDelete = (id) => {
        axios.delete(`https://dummyjson.com/post/${id}`)
            .then(() => setDssp(dssp.filter(item => item.id != id)));
        handleClose();
    }

    const [supermode, setSuppermode] = useState(false) // mode = true show add modal , mode  = fasle show edit modal
    const Handleadd = setSuppermode(true);
    const Handleeditor = setSuppermode(false);
    return (
        <>
                        {/* <Form>
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
                        </Form> */}
                        <Button variant="success"><FontAwesomeIcon icon={faAdd}> </FontAwesomeIcon> Add</Button>
                        <h1>Danh sách post</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tieu de</th>
                                    <th>Mieu ta</th>
                                    <th>Ma nguoi dung</th>
                        
                                    <th>Reactions</th>
                                </tr>
                            </thead>
                            <tbody style={{border: "3px"}}>
                                {
                                    dssp.map(item => (
                                        <tr>
                                            
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.body}</td>
                                            <td>{item.userId}</td>
                                            <td>{item.reactions}</td>
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

export default Posts;