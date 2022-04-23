import React, { useEffect, useRef, useState } from "reactn";

import {
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
} from "reactstrap";
import Swal from "sweetalert2";


import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

import routes from "routes.js";

import { getAdmin, deleteAdmin } from 'hooks/useApi'

const DeleteAdmin = (props) => {
    const [allAdmins, setAllAdmins] = useState([]);
    const mainContent = useRef(null);
    useEffect(() => {
        getAdmin("post", "/admin/get-admin")
            .then(res => {
                setAllAdmins(res.data);
            })
    }, [])

    const removeAdmin = (username) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAdmin("post", "/admin/remove-admin", { username: username })
                    .then(res => {
                        if (res && res.data && res.data.alladmin) {
                            setAllAdmins(res.data.alladmin);
                        }
                    })
            }
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
                </div>
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Administrator Listing</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Index</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>First Name</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Last Name</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Username</th>
                                            <th scope="col" className="text-center" style={{ cursor: "pointer" }}>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allAdmins.map((each, index) => {
                                            return (<tr key={index}>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{index + 1}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{each.fName}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{each.lName}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }}>{each.username}</td>
                                                <td className="text-center" style={{ cursor: "pointer" }} onClick={() => removeAdmin(each.username)}>X</td>
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

export default DeleteAdmin;