import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { Context } from "../../Context";

const DeployScreen = () => {
    const [copied, setCopied] = useState(false);
    const { contractInfo } = useContext(Context);
    const history = useHistory();

    const getUrl = (contract) => {
        switch (contract) {
            case "Swap":
                return "creator";
            case "Airdrop":
                return "approver";
            case "Token":
                return "minter";
            default:
                return "?";
        }
    }

    const preStyle = {
        backgroundColor: "#ddd",
        boxShadow: "-10px 10px #f2f3f4 "
    }

    const handleProceed = () => { history.push("/app/" + getUrl(contractInfo[1])) }
    const handleCopy = () => { setCopied(true) }

    return (
        <Container className="mt-3 text-left">
            <h2>Contract Details of {contractInfo[1]} Contract: </h2>
            <pre className="mt-4 p-4" style={preStyle}>
                {contractInfo[0]}
            </pre>
            <CopyToClipboard onCopy={handleCopy} text={contractInfo[0]}>
                <Button variant="primary">
                    {copied ? "Copied" : "Copy to clipboard"}
                </Button>
            </CopyToClipboard>
            <Button
                className="ml-3"
                variant="secondary"
                onClick={handleProceed}>
                Proceed to Application
            </Button>
        </Container>
    );
}

export default DeployScreen;