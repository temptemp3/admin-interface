import React, { useState } from "react";
import { loadStdlib } from "@reach-sh/stdlib";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner"
import Toast from "react-bootstrap/Toast";
import * as config from "../../config";

const FaucetModal = ({ account, setBalance, show, setShow, unit }) => {

    const stdlib = loadStdlib(config.network);

    const [clicked, setClicked] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [lastAmt, setLastAmt] = useState(0);

    const handleClose = () => setShow(false);

    const faucetMoney = async () => {
        setClicked(true);
        try {
            const amountText = document.querySelector("#faucet-form").value;

            setLastAmt(amountText);

            const amount = stdlib.parseCurrency(amountText);
            await stdlib.fundFromFaucet(account, amount);

            const balance = stdlib.formatCurrency(await stdlib.balanceOf(account), 4);
            setBalance(balance);
            console.log(`Faucet successful, new balance is ${balance} ${config.network}`);

            setShowToast(true);
            setClicked(false);
            handleClose();
        } catch (err) {
            console.error(err);
            handleClose();
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Faucet {unit}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter faucet amount</p>
                    <InputGroup>
                        <Form.Control
                            id="faucet-form"
                            aria-describedby="unit-append"
                            type="number"
                            step="0.1" />
                        <InputGroup.Append>
                            <InputGroup.Text id="unit-append">{unit}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={faucetMoney}>
                        {
                            clicked
                                ? <Spinner as="span" size="sm" animation="border" variant="light" />
                                : "Faucet"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>

            <FaucetToast
                show={showToast}
                onClose={() => setShowToast(false)}
                amount={lastAmt} />
        </>
    );
}

const FaucetToast = ({ show, onClose, amount }) => {

    const screenHeight = window.innerHeight;

    const faucetToastStyle = {
        top: `${screenHeight * .8}px`,
        left: "2em",
    };
    return (
        <Toast
            className="position-absolute m-3"
            style={faucetToastStyle}
            onClose={onClose}
            show={show}
            delay={2000}
            autohide>

            <Toast.Header>
                <strong className="mr-auto">Faucet Successful</strong>
            </Toast.Header>

            <Toast.Body>
                Fauceted {amount} {config.network} successfully!
            </Toast.Body>
        </Toast>
    );
}

export default FaucetModal;