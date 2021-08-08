import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const MinterViews = ({ view, args }) => {
    switch (view) {
        case "seeToken":
            return (
                <SeeToken tokenStr={args.tokenStr} amount={args.amount} />
            );

        default:
            break;
    }
    return (
        <Container className="mt-4">
            <h2>Waiting for contract</h2>
            <Spinner animation="border" />
        </Container>
    );
}

const SeeToken = ({ tokenStr, amount }) => {
    return (
        <Container>
            <h1>Token Minted</h1>
            <h3>Token Name: RAJINI Token</h3>
            <p>ID: {tokenStr}</p>
            <p>Current Balance: {amount} RJN</p>
        </Container>
    );
}

export default MinterViews;