import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import {
    Button,
    Modal,
} from "reactstrap";

export default function LoginDashboard() {

    const [defaultModal, setDefaultModal] = useState(false);
    const [signInType, setSignInType] = useState(1);
    const history = useHistory();

    const toggleModal = () => {
        setDefaultModal(!defaultModal);
    }

    useEffect(() => {
        toggleModal();
    }, [])

    const signIn = () => {
        signInType === 1 ? history.push("/admin") : history.push("/customer");
    }

    return (
        <>
            <Modal
                className="modal-dialog-centered"
                isOpen={defaultModal}
                toggle={() => toggleModal()}
                backdrop="static"
            >
                <div className="modal-header">
                    <h2 className="modal-title" id="modal-title-default">
                        Sign In As
                    </h2>
                </div>
                <div className="modal-body">
                    <div className="custom-control custom-control-alternative custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            id="customRadio1"
                            name="custom-radio-1"
                            defaultChecked
                            type="radio"
                            onChange={() => setSignInType(1)}
                        />
                        <label className="custom-control-label signin-label" htmlFor="customRadio1">
                            Administrator
                        </label>
                    </div>
                    <div className="custom-control custom-control-alternative custom-radio mb-3">
                        <input
                            className="custom-control-input"
                            id="customRadio2"
                            name="custom-radio-1"
                            type="radio"
                            onChange={() => setSignInType(2)}
                        />
                        <label className="custom-control-label signin-label" htmlFor="customRadio2">
                            Customer Service
                        </label>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button color="primary" type="button" onClick={signIn}>
                        Go!
                    </Button>
                </div>
            </Modal>
        </>
    )
}
