import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import ConnectWallet from "../reach/ConnectWallet";
import { Context } from "../../Context";
import { DeployAirdropButton, DeployButton, DeploySwapButton } from "../reach/DeployAttach";

const Home = () => {

    const { account } = useContext(Context);

    return Object.keys(account).length > 0 ? (
        <Container className="h-100">
            <div className="mt-5">
                <Row>
                    <Col>
                        <Card className="p-3">
                            <Card.Title>Deploy Token Contract</Card.Title>
                            <hr className="mt-1" />
                            <Card.Text>
                                Deploy your own application
                            </Card.Text>

                            <DeployButton />
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-3">
                            <Card.Title>Deploy Airdrop Contract</Card.Title>
                            <hr className="mt-1" />
                            <Card.Text>
                                Lorem ipsum
                            </Card.Text>
                            <DeployAirdropButton />
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-3">
                            <Card.Title>Deploy Swap Contract</Card.Title>
                            <hr className="mt-1" />
                            <Card.Text>
                                Lorem ipsum
                            </Card.Text>
                            <DeploySwapButton />
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    ) : (
        <Container className="mt-5">
            <h1>Please connect your wallet</h1>
            <ConnectWallet />
        </Container>
    );
}

export default Home;