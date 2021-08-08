import React, { useContext } from "react";
import * as config from "../../config";
import { Context } from "../../Context";

/**
 * @dev Shows the user's balance throughout the app
 * For best performance you should update balance 
 * after each balance-related function (or after every function)
 */
const Balance = () => {

    const { account, balance } = useContext(Context);

    return (
        Object.keys(account).length !== 0
            ? (<span className=" ml-3 p-2" style={{
                backgroundColor: "white",
                boxShadow: "2px 2px #ddd",
            }}>
                <strong>{balance} {config.network}</strong>
            </span>)
            : <div />
    );
}

export default Balance;