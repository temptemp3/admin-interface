/**
 * @dev Context API in React helps you to access variables anywhere
 * you want in your project. Here we have some variables you'll most likely
 * want to know in your project.
 * 
 * account: Holds the account data of the website user
 * balance: Holds the wallet balance of the user
 * ctcInfo: This the information you'll use to attach to the contract
 * ctc: Holds all of contract's functionality
 * ctcArgs: Holds any argument that could be provided while deploying the contract
 *          such as the wager in the Rock-Paper-Scissors code.
 * 
 * Context API:
 * @see https://reactjs.org/docs/context.html#gatsby-focus-wrapper
 * 
 * React Hooks:
 * @see https://reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper
 * 
 * @note You could also use Redux Store for this kind of functionality. It's
 * totally up to your choice.
 */

import React, { useState, createContext } from "react";

export const Context = createContext(null);

export const ContextProvider = props => {
    const [account, setAccount] = useState({});
    const [balance, setBalance] = useState(0);
    const [contracts, setContracts] = useState([]);
    const [contractInfo, setContractInfo] = useState([]);
    const [token, setToken] = useState(null);

    return (<Context.Provider value={
        {
            account, setAccount,
            balance, setBalance,
            contracts, setContracts,
            contractInfo, setContractInfo,
            token, setToken
        }
    }>
        {props.children}
    </Context.Provider>);
};