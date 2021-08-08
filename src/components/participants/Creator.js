import { loadStdlib } from "@reach-sh/stdlib";
import { Component } from "react";

import * as Backend from "../../contracts/build/swap.main.mjs";

import { Context } from "../../Context";

import * as config from "../../config";
import CreatorViews from "./views/CreatorViews";

class Creator extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            view: "",
            args: {},
            resolver: null
        };

        this.callResolve = this.callResolve.bind(this);
    }

    componentDidMount() {
        const { contracts } = this.context;

        Backend.Creator(contracts[0], this);
    }

    async updateBalance() {
        const stdlib = loadStdlib(config.network);
        const { account, setBalance } = this.context;

        const balance = stdlib.formatCurrency(await stdlib.balanceOf(account), 4);
        setBalance(balance);
    }

    async getSwap() {
        const stdlib = loadStdlib(config.network);
        const { account, token } = this.context;
        if (!token) return console.log("Token is undefined");
        if (!account) return console.log("Account is undefined");

        await account.tokenAccept(token);

        const ratio = 1 / 25_000;
        const price = stdlib.parseCurrency(ratio);

        // TODO: Check it
        const totalSupply = 50_000_000_000 // 50 Billion 

        this.setState({
            view: "getSwap",
            args: {
                price: stdlib.formatCurrency(price, 10),
                totalSupply: totalSupply
            }
        });

        return [token, price, totalSupply];
    }

    async gotSwap() {
        this.setState({
            view: "gotSwap"
        });
    }

    callResolve(view, arg) {
        if (!this.state.resolver) return console.log("Resolve is empty for", view);
        console.log("[DEBUG] calling", view, "resolver with", arg);
        this.state.resolver(arg);
    }

    render() {
        return (
            <CreatorViews args={this.state.args} view={this.state.view} resolver={this.callResolve} />
        );
    }
}

export default Creator;