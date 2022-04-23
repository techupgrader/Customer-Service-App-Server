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
    Button,
} from "reactstrap";

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import jsPDF from "jspdf";
import "jspdf-autotable";

import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

import { getAllCompany } from "hooks/useCustomerApi";


const CompanyList = (props) => {
    const [allCompany, setAllCompany] = useState([]);
    const mainContent = useRef(null);
    const history = useHistory();

    const { ExportCSVButton } = CSVExport;
    const { SearchBar } = Search;

    useEffect(() => {
        getAllCompany("post", "/customer/get-company")
            .then(res => {
                if (res.length) {
                    res.map((each, index) => {
                        if(!each.cancellationDate) each.cancellationDate = "";
                        each.users = 8;
                        each.action = "Details"
                    })
                    setAllCompany(res);
                }
            })
    }, [])

    const columns = [{
        dataField: 'name',
        text: 'Name',
        sort: true,
        headerStyle: {
            fontSize: '14px',
            fontWeight: 'bold'
        },
        style: () => {
            return {
                overflow: "hidden",
                textOverflow: "ellipsis",
            }
        }
    }, {
        dataField: 'code',
        text: 'ACTION CODE',
        sort: true,
        headerStyle: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    }, {
        dataField: 'created_at',
        text: 'CREATED',
        sort: true,
        headerStyle: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    }, {
        dataField: 'activationDate',
        text: 'ACTIVATED',
        sort: true,
        headerStyle: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    }, {
        dataField: 'cancellationDate',
        text: 'EXPIRATION',
        sort: true,
        headerStyle: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    }, {
        dataField: 'users',
        text: 'USERS',
        sort: true,
        headerStyle: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    }, {
        dataField: 'action',
        text: 'ACTION',
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                companyToDetail(row.id);
            },
        },
        style: (cell, row, rowIndex, colIndex) => {
            return {
                cursor: "pointer",
                color: "#5e72e4"
            }
        },
        headerStyle: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    }];

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

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Company Listing";
        const headers = [["NAME", "ACTION CODE", "CREATED DATE", "ACTIVATED DATE", "EXPIRATION DATE", "USERS"]];

        const data = allCompany.map(elt => [elt.name, elt.code, elt.created_at, elt.activationDate, elt.cancellationDate, elt.users]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
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
                                <CardHeader className="border-0 pb-0">
                                    <h3 className="mb-0">Company Listing</h3>
                                </CardHeader>
                                <ToolkitProvider
                                    keyField="id"
                                    data={allCompany}
                                    columns={columns}
                                    exportCSV
                                    search

                                >
                                    {
                                        props => (
                                            <div>
                                                <div className="d-flex mb-3 mt-3">
                                                    <ExportCSVButton {...props.csvProps} className="ml-3 " style={{ width: "10vw", border: "none", background: "rgb(94, 114, 228)" }}>Export CSV</ExportCSVButton>
                                                    <Button onClick={exportPDF} className="ml-3 text-white" style={{ width: "10vw", border: "none", background: "rgb(94, 114, 228)" }}>Export PDF</Button>
                                                    <SearchBar {...props.searchProps} className="position-absolute" style={{ right: "1vw", width: "18vw" }} />
                                                </div>
                                                <BootstrapTable {...props.baseProps} pagination={paginationFactory()} id="listTable" />
                                            </div>
                                        )
                                    }
                                </ToolkitProvider>

                                <CardFooter className="py-4">

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