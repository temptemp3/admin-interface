import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const ApproverViews = ({ view, args, resolver }) => {
    switch (view) {
        case "getParams":
            return (
                <GetParams resolver={resolver} />
            );
        case "getAddress":
            return (
                <GetAddress />
            );
        case "seeFinish":
            return (
                <SeeFinish />
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

const GetParams = ({ resolver }) => {
    // const [tokenId, setTokenId] = useState(0);
    // const handleTokenId = (e) => setTokenId(e.target.value);
    const [supply, setSupply] = useState(100000);
    const handleSetSupply = (e) => setSupply(e.target.value);
    const [amount, setAmount] = useState(10000);
    const handleSetAmount = (e) => setAmount(e.target.value);

    const resolveGetParams = () => {
        if (!resolver) return console.log("Resolver is undefined");
        resolver("GetTokens", { /* token: tokenId, */ supply: supply, airdropAmount: amount });
    }

    return (
        <Container>
            {/* <label htmlFor="tokenId">Token ID</label>
            <input id="tokenId" name="tokenId" type="number" value={tokenId} onChange={handleTokenId} />

            <br /> */}

            <label htmlFor="supply">Total Supply (How much you'll spend for the airdrop?)</label>
            <input id="supply" name="supply" type="number" value={supply} onChange={handleSetSupply} />

            <br />

            <label htmlFor="amount">Airdrop Amount (How much each user will get in the airdrop?)</label>
            <input id="amount" name="amount" type="number" value={amount} onChange={handleSetAmount} />

            <br />

            <button onClick={resolveGetParams}>Set Parameters for Airdrop</button>
        </Container>
    )
}

const GetAddress = () => {
    return (
        <Container>
            <h2>Getting addresses from database. This can take a while.</h2>
        </Container>
    )
}

const SeeFinish = () => {
    return (
        <Container>
            <h2>Airdrop finished. You can now close the window</h2>
        </Container>
    );
}

export default ApproverViews;