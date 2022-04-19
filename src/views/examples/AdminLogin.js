import { useState, useEffect } from 'reactn'
import { useHistory, useLocation } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

import { login } from 'hooks/useApi';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "", isAdmin: true });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if(localStorage.usertoken && localStorage.user_role === "admin") {
      history.push("/admin/home")
    } else if(localStorage.usertoken && localStorage.user_role === "customer") {
      history.push("/customer/home");
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    if (location.pathname.includes("admin")) {
      login("post", "/admin/login", formData).then(res => {
        if (res) history.push("/admin/home");
        else console.log("error")
      })
    } else {
      console.log("customer login")
    }
  }

  return (
    <>
      <Col lg="4" md="6" style={{ margin: "auto" }}>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              {location.pathname === "/admin/login" ?
                "ADMINISTRATOR"
                : "CUSTOMER SERVICE"}
            </div>
            <Form role="form" onSubmit={onSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="mt-5 float-left"
                  color="primary"
                  type="button"
                  onClick={() => history.push("/")}
                >
                  Go Back
                </Button>
                <Button className="mt-5 float-right" color="primary" type="submit">
                  Sign In
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
