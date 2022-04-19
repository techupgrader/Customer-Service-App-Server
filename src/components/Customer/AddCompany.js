import React, { useEffect, useRef, useState } from "reactn";
import { useLocation } from "react-router-dom";
import {
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Container,
    Label,
    Card,
    CardBody,
    Button
} from "reactstrap";
import InputMask from "react-input-mask";


import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

import { addNewCompany } from "hooks/useCustomerApi";
import Swal from "sweetalert2";

const CustomerDashboard = (props) => {
    const [formData, setFormData] = useState({ name: "", contactFName: "", contactLName: "", contactEmail: "", contactPhone: "", code: "" })
    const mainContent = useRef(null);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return "DASHBOARD";
    };

    const generateCode = () => {
        let result = '';
        let characters = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setFormData({ ...formData, code: result })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!formData.code) {
            Swal.fire({
                title: "Information",
                text: "Please Generate Code"
            })
        } else {
            addNewCompany("post", "/customer/add-company", formData).then(res => {
                if (res) console.log(res);
                else console.log("hererere")
            })
        }
    }

    return (
        <>
            <Sidebar
                {...props}
                routes={routes}
            />
            <div className="main-content" ref={mainContent}>

                <AdminNavbar
                    {...props}
                    brandText={getBrandText(props.location.pathname)}
                />
                <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                    <Container>
                    </Container>
                </div>
                <Container className="mt--7" fluid>
                    <Card className="card-stats mb-4 mb-lg-0" style={{ background: "white" }}>
                        <CardBody>
                            <Form onSubmit={onSubmit}>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Enter Company Name:</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                required
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Label>8-digit code</Label>
                                                <span className="bold pl-8 pr-8 pt-2 pb-2 mb-1 text-right border border-primary" style={{ cursor: "pointer" }} onClick={generateCode}>Generate</span>
                                            </div>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                readOnly
                                                required
                                                value={formData.code}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Company Contact</Label>
                                            <Row>
                                                <Col md="6">
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        required
                                                        placeholder="First"
                                                        onChange={(e) => setFormData({ ...formData, contactFName: e.target.value })}
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        required
                                                        placeholder="Last"
                                                        onChange={(e) => setFormData({ ...formData, contactLName: e.target.value })}
                                                    />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Contact Email</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="email"
                                                required
                                                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Contact Telephone</Label>
                                            <InputMask
                                                className="form-control-alternative form-control"
                                                mask="+1 999 999 999"
                                                required
                                                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="4">
                                        <Button color="primary" size="lg" type="submit" style={{ width: "100%" }}>Add</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
}

export default CustomerDashboard;