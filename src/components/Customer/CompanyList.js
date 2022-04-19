import React, { useEffect, useRef, useState } from "reactn";
import { useHistory } from "react-router-dom";
import {
    Row,
    Container,
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
} from "reactstrap";

import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

import { getAllCompany } from "hooks/useCustomerApi";

const CompanyList = (props) => {
    const [allCompany, setAllCompany] = useState([]);
    const mainContent = useRef(null);
    const history = useHistory();

    useEffect(() => {
        getAllCompany("post", "/customer/get-company")
        .then(res => {
            if(res.length) setAllCompany(res)
        })
    }, [])

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

    const companyToDetail = (id) => {
        history.push(`/customer/edit-company/id/${id}`);
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
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Administrator table</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Name</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Activation Code</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Created</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Activated</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Expiration</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Users</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allCompany.map((each, index) => {
                                            return (<tr key={index}>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{each.name}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{each.code}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{each.created_at}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{each.activationDate}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{each.cancellationDate}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }}>8</td>
                                                <td className="text-center text-primary" style={{ cursor: "pointer" }} onClick={() => companyToDetail(each.id)}>
                                                    Details
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default CompanyList;