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

import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

import routes from "routes.js";

import { addCustomService } from "hooks/useApi";

const AdminDashboard = (props) => {
    const [formData, setFormData] = useState({ fName: "", lName: "", username: "", password: "" })
    const mainContent = useRef(null);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const onSubmit = (e) => {
        e.preventDefault();
        addCustomService("post", "/admin/add-cs", formData).then(res => {
            if (res) console.log(res);
            else console.log("hererere")
        })
    }

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
                                            <Label>First Name</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                required
                                                onChange={(e) => setFormData({ ...formData, fName: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Last Name</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                required
                                                onChange={(e) => setFormData({ ...formData, lName: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>UserName</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                required
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="password"
                                                required
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

export default AdminDashboard;