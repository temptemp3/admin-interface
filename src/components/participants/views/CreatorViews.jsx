import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const CreatorViews = ({ view, args, resolver }) => {
    switch (view) {
        case "getSwap":
            return (
                <GetSwap totalSupply={args.totalSupply} price={args.price} />
            );
        case "gotSwap":
            return (
                <GotSwap />
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

const GetSwap = ({ totalSupply, price }) => {
    return (
        <Container>
            <h2>Opening RJN token for swap</h2>
            <h3>Total supply: {totalSupply} </h3>
            <h3>Price: {price} ALGO/RJN </h3>
        </Container>
    )
}

const GotSwap = () => {
    return (
        <Container>
            <h2>Swap is ready, you can now close the window</h2>
        </Container>
    );
}

export default CreatorViews;