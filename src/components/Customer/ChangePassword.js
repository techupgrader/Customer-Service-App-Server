import React, { useRef, useState } from "reactn";
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
    Button,
} from "reactstrap";

import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

import { changePassword } from "hooks/useCustomerApi";
import Swal from "sweetalert2";

const ChangePassword = (props) => {
    const [formData, setFormData] = useState({ origin: "", newPassword: "", confirmPassword: "" });
    const mainContent = useRef(null);

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "DASHBOARD";
    };

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if (formData.newPassword !== formData.confirmPassword) {
            Swal.fire({
                icon: "info",
                text: "Confirm Password must be equal!",
            })
        } else {
            changePassword("post", "/customer/change-password", {...formData, username: localStorage.name})
            .then(res => {
                console.log(res)
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
                        <CardBody
                            className="pt-5 pb-5"
                        >
                            <Form onSubmit={onSubmit}>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Original Password::</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="password"
                                                defaultValue={formData.origin}
                                                required
                                                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>New Password::</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="password"
                                                defaultValue={formData.newPassword}
                                                required
                                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Confirm Password::</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="password"
                                                defaultValue={formData.confirmPassword}
                                                required
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <Row>
                                            <Col md="6">
                                                <Button color="primary" size="lg" type="submit" style={{ width: "100%" }}>Change Password</Button>
                                            </Col>
                                            <Col md="6">
                                                <Button color="primary" size="lg" type="button" style={{ width: "100%" }}>Cancel</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default ChangePassword;