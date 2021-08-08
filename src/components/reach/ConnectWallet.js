import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { loadStdlib } from "@reach-sh/stdlib";

import Algorand from "../../assets/algorand.png";

import { Context } from "../../Context";
import * as config from "../../config";


const ConnectWallet = () => {
    console.log("Connecting to", config.network);
    const stdlib = loadStdlib(config.network);

    const { account, setAccount, setBalance } = useContext(Context);

    const connectWallet = async () => {
        const acc = await stdlib.getDefaultAccount();

        // TEST
        // await stdlib.fundFromFaucet(acc, stdlib.parseCurrency(3));

        const balAtomic = await stdlib.balanceOf(acc);
        const bal = stdlib.formatCurrency(balAtomic, 4);

        setAccount(Object.assign({}, acc));

        setBalance(bal);
    }

    const buttonStyle = {
        bottom: "2em",
        right: "2em",
    }



    return Object.keys(account).length === 0 ? (
        <Button variant="dark"
            style={buttonStyle}
            className="position-absolute m-3"
            onClick={connectWallet}
            size="lg">
            <img src={Algorand} alt="Algorand Logo" width="30" />
            {" "}<p className="d-inline-block mb-1 ml-1">Connect Wallet</p>
        </Button>
    ) : <div />;
}

export default ConnectWallet;