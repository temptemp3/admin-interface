import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import * as AirdropBackend from "../../contracts/build/airdrop.main.mjs";
import * as TokenBackend from "../../contracts/build/token.main.mjs";
import * as SwapBackend from "../../contracts/build/swap.main.mjs";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { Context } from "../../Context";

export const DeployButton = () => {
    const { account, setContractInfo, setContracts } = useContext(Context);
    const [show, setShow] = useState(false);
    // In order to redirect you need to use this hook
    const history = useHistory();

    const deploy = async () => {
        if (!account) return console.log("[DEBUG] account is undefined");
        // Show the loading screen
        setShow(true);

        const ctc = account.deploy(TokenBackend);

        if (ctc) console.log("[DEBUG] Deployed Token Backend");

        // To use in participant page pass contract to Context
        setContracts([ctc]);

        // Stringify the contract info and set the state so that you can copy it.
        const ctcInfo = JSON.stringify(await ctc.getInfo(), null, 2);
        setContractInfo([ctcInfo, "Token"]);

        // Proceed to deployment page
        history.push('/deploy');
    }

    return (
        <>
            <Button variant="primary" onClick={deploy}>Deploy</Button>
            <DeployModal show={show} />
        </>
    );
}

export const DeployAirdropButton = () => {
    const { account, setContractInfo, setContracts } = useContext(Context);
    const [show, setShow] = useState(false);
    // In order to redirect you need to use this hook
    const history = useHistory();

    const deploy = async () => {
        // Show the loading screen
        setShow(true);

        const ctcAirdrop = account.deploy(AirdropBackend);

        if (ctcAirdrop) console.log("[DEBUG] Deployed Airdrop Backend");

        // To use in participant page pass contract to Context
        setContracts([ctcAirdrop]);

        // Stringify the contract info and set the state so that you can copy it.
        const ctcInfoAirdrop = JSON.stringify(await ctcAirdrop.getInfo(), null, 2);
        setContractInfo([ctcInfoAirdrop, "Airdrop"]);

        // Proceed to deployment page
        history.push('/deploy');
    }
    return (
        <>
            <Button variant="primary" onClick={deploy}>Deploy</Button>
            <DeployModal show={show} />
        </>
    );
}

export const DeploySwapButton = () => {
    const { account, setContractInfo, setContracts } = useContext(Context);
    const [show, setShow] = useState(false);
    // In order to redirect you need to use this hook
    const history = useHistory();

    const deploy = async () => {
        // Show the loading screen
        setShow(true);

        // const ctcAirdrop = account.deploy(AirdropBackend);
        const ctcSwap = account.deploy(SwapBackend);

        if (ctcSwap) console.log("[DEBUG] Deployed Swap Backend");

        // To use in participant page pass contract to Context
        setContracts([ctcSwap]);

        // Stringify the contract info and set the state so that you can copy it.
        const ctcInfoSwap = JSON.stringify(await ctcSwap.getInfo(), null, 2);
        setContractInfo([ctcInfoSwap, "Swap"]);

        // Proceed to deployment page
        history.push('/deploy');
    }
    return (
        <>
            <Button variant="primary" onClick={deploy}>Deploy</Button>
            <DeployModal show={show} />
        </>
    );
}

export const DeployRJNButton = () => {
    const { account, setContractInfo, setContracts } = useContext(Context);
    const [show, setShow] = useState(false);
    // In order to redirect you need to use this hook
    const history = useHistory();

    const deploy = async () => {
        // Show the loading screen
        setShow(true);

        const ctcAirdrop = account.deploy(AirdropBackend);
        const ctcSwap = account.deploy(SwapBackend);

        // To use in participant page pass contract to Context
        setContracts([ctcAirdrop, ctcSwap]);

        // Stringify the contract info and set the state so that you can copy it.
        const ctcInfoAirdrop = JSON.stringify(await ctcAirdrop.getInfo(), null, 2);
        const ctcInfoSwap = JSON.stringify(await ctcSwap.getInfo(), null, 2);
        setContractInfo([ctcInfoAirdrop, ctcInfoSwap]);

        // Proceed to deployment page
        history.push('/deploy');
    }
    return (
        <>
            <Button variant="primary" onClick={deploy}>Deploy</Button>
            <DeployModal show={show} />
        </>
    );
}

export const AttachButton = () => {
    const { account, setContracts } = useContext(Context);
    const [show, setShow] = useState(false);
    const history = useHistory();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const attach = async (ctcInfo) => {
        // Attach to the contract you know the info of
        const ctc = await account.attach(TokenBackend, JSON.parse(ctcInfo));

        // To use in participant page pass contract to Context
        setContracts([ctc]);

        console.log("Attached to the contract");

        // Proceed to the participant page
        history.push("/app/user");
    }

    return (
        <>
            <Button onClick={handleShow}>Attach</Button>
            <AttachModal
                show={show}
                handleClose={handleClose}
                attach={attach} />
        </>
    );
}

const AttachModal = ({ show, handleClose, attach }) => {
    const handleAttach = () => {
        // Fetch the contract information
        const info = document.querySelector("#ctcArea").value;
        attach(info);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Attach to Contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    id="ctcArea"
                    as="textarea"
                    rows="10"
                    placeholder="Paste contract info here" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAttach}>
                    Attach
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const DeployModal = ({ show }) => {
    return (
        <Modal show={show} centered className="text-center">
            <Modal.Body>
                <h2>Deploying the contract</h2>
                <Spinner animation="border" />
            </Modal.Body>
        </Modal>
    );
}