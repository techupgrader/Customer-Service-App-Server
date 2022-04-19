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
import Select from 'react-select'

import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

import { editCompany, getAllCompany } from "hooks/useCustomerApi";
import Swal from "sweetalert2";

const EditCompany = (props) => {
    const [formData, setFormData] = useState({ 
        name: "", 
        cancellationDate: "", 
        activationToDate: "",
        activationDate: "",
        contactFName: "", 
        contactLName: "", 
        contactEmail: "", 
        contactPhone: "" ,
        code: ""
    });
    const [originList, setOriginList] = useState([])
    const [selectOption, setSelectOption] = useState({ 
        clearable: true, 
        value: "", 
        searchable: true, 
        label: "", 
        selectValue: "" 
    })
    const [listOption, setListOption] = useState([]);
    const [today, setToday] = useState("")
    const [selected, setSelected] = useState([]);

    const location = useLocation()

    const mainContent = useRef(null);

    useEffect(() => {
        getAllCompany("post", "/customer/get-company")
            .then(res => {
                if (res && res.length) {
                    let newListOption = []
                    setOriginList(res);
                    res.map((each) => {
                        newListOption.push({ value: each.name, label: each.name })
                    })
                    setListOption(newListOption);
                    if (location.pathname.indexOf("id") > -1) {
                        let pathNameArray = location.pathname.split("/")
                        res.map((each) => {
                            if (each.id == pathNameArray[pathNameArray.length - 1]) {
                                console.log(each)
                                setSelectOption({ ...selectOption, value: each.name })
                                setSelected([each]);
                                updateValue({ label: each.name, value: each.name })
                                return;
                            }
                        })
                    }
                }
            })
    }, [])

    useEffect(() => {
        if (selected.length) {
            setFormData({
                name: selected[0].name,
                cancellationDate: selected[0].cancellationDate ? selected[0].cancellationDate : "",
                activationToDate: selected[0].activationToDate ? selected[0].activationToDate : "",
                contactFName: selected[0].contactFName,
                contactLName: selected[0].contactLName,
                contactEmail: selected[0].contactEmail,
                contactPhone: selected[0].contactPhone,
                code: selected[0].code,
                activationDate: selected[0].activationDate,
            })
        }
    }, [selected])

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

    const updateValue = (e) => {
        console.log(e)
        let filtered = {}
        filtered = originList.filter(each => each.name === e.value);
        console.log(originList)
        filtered ? setSelected(filtered) : setSelected({})
        let today = new Date();
        let thisMonth = today.getMonth() + 1;
        thisMonth < 10 ?
            setToday(today.getFullYear() + "-" + "0" + thisMonth + "-" + today.getDate())
            :
            setToday(today.getFullYear() + "-" + thisMonth + "-" + today.getDate())
    }

    const cancelActivate = () => {
        if (selected && selected.length && selected[0].isCancelled) {
            return;
        } else if (selected && selected.length && !selected[0].isCancelled) {
            setFormData({ ...formData, cancellationDate: today })
        }
    }

    const extendActivate = () => {
        if (formData && formData.activationToDate) {
            return;
        } else if (formData && !formData.activationToDate) {
            let today = new Date();
            let thisDay = today.getDate();
            let thisMonth = today.getMonth() + 1;
            if (thisMonth < 10) thisMonth = "0" + thisMonth
            let nextYear = today.getFullYear() + 1;
            let fullExtendDate = nextYear + "-" + thisMonth + "-" + thisDay;
            setFormData({ ...formData, activationToDate: fullExtendDate })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) {
            Swal.fire({
                icon: 'error',
                title: 'Notification',
                text: "Please select the company to update!"
            });
            return;
        }
        else {
            editCompany("post", "/customer/edit-company", formData)
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
                        <CardBody>
                            <Form onSubmit={onSubmit}>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            {location.pathname.indexOf("id") > -1 ?

                                                <>
                                                    <Label>Enter Company Name:</Label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    />
                                                </>
                                                :
                                                <>
                                                    <Label>Company Name:</Label>
                                                    <Select
                                                        id="state-select"
                                                        onBlurResetsInput={false}
                                                        onSelectResetsInput={false}
                                                        autoFocus
                                                        options={listOption}
                                                        simpleValue
                                                        clearable={selectOption.clearable}
                                                        name="selected-state"
                                                        onChange={(e) => updateValue(e)}
                                                        searchable={selectOption.searchable}
                                                    />
                                                </>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>8-digit code is:</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                value={formData.code}
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Activation Date:</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                value={formData.activationDate}
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Today:</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                value={today}
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup 
                                            className="border border-warning text-center pt-1 pb-1" 
                                            style={{ cursor: "pointer" }} 
                                            onClick={cancelActivate}
                                        >
                                            <span>Click To Cancel</span>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Cancellation Date:</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                value={formData.cancellationDate}
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup 
                                            className="border border-info text-center pt-1 pb-1" 
                                            style={{ cursor: "pointer" }} 
                                            onClick={extendActivate}
                                        >
                                            <span>Click To Extend Activation 1 Year</span>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>New Activation Expiration Date:</Label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                value={formData.activationToDate}
                                                readOnly
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
                                                        defaultValue={formData.contactFName}
                                                        onChange={(e) => setFormData({ ...formData, contactFName: e.target.value })}
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        required
                                                        placeholder="Last"
                                                        defaultValue={formData.contactLName}
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
                                                defaultValue={formData.contactEmail}
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
                                                value={formData.contactPhone}
                                                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <Row>
                                            <Col md="6">
                                                <Button color="primary" size="lg" type="submit" style={{ width: "100%" }}>Accept Setting</Button>
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

export default EditCompany;