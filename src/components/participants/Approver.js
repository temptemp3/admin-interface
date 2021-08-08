import { Component } from "react";

import * as Backend from "../../contracts/build/airdrop.main.mjs";

import { Context } from "../../Context";
import ApproverViews from "./views/ApproverViews";

class Approver extends Component {
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

        Backend.Approver(contracts[0], this);
    }

    async getParams() {
        const { account, token } = this.context;
        if (!token) return console.log("Token is undefined");
        if (!account) return console.log("Account is undefined");

        await account.tokenAccept(token);

        const params = await new Promise(resolve => {
            this.setState({
                view: "getParams",
                args: {},
                resolver: resolve
            });
        });

        return { token: token, ...params }
    };

    async getAddress() {
        this.setState({
            view: "getAddress",
        });

        let address;

        // getAddressFromDB() & deleteIt()
        return address ? ['Some', address] : ['None', null];
    }

    async seeFinish() {
        this.setState({
            view: "seeFinish"
        });
    }

    callResolve(view, arg) {
        if (!this.state.resolver) return console.log("Resolve is empty for", view);
        console.log("[DEBUG] calling", view, "resolver with", arg);
        this.state.resolver(arg);
    }

    render() {
        return (
            <ApproverViews view={this.state.view} args={this.state.args} resolver={this.callResolve} />
        );
    }
}

export default Approver;