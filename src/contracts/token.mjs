import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/token.main.mjs';

(async () => {
    const stdlib = await loadStdlib('ETH');
    const startingBalance = stdlib.parseCurrency(100);

    const alice = await stdlib.newTestAccount(startingBalance);
    const bob = await stdlib.newTestAccount(startingBalance);

    const ctcAlice = alice.deploy(backend);
    const ctcBob = bob.attach(backend, ctcAlice.getInfo());

    const readBal = async (acc, name, token) => {
        const bal = await stdlib.balanceOf(acc, token);
        console.log(name, "has", bal.toString(), "RJN");
    }

    let tryCount = 0;

    await Promise.all([
        backend.Minter(ctcAlice, {
            tokenParams: () => {
                return {
                    name: "RAJINI",
                    symbol: "RJN",
                    supply: 300000000000
                }
            },
            seeToken: (id) => {
                console.log("Minter minted token with ID", id.toString());
            }
        }),
        backend.User(ctcBob, {
            getTokens: async (tok) => {
                await readBal(bob, "Bob", tok);
                if (tryCount < 5) {
                    console.log("Bob requests 150,000,000,000 RJN of ID", tok);
                    tryCount += 1;
                    return 30_000_000_000;
                }
                return await new Promise(res => { });
            },
            seeTxn: () => {
                console.log("Bob saw the txn")
            }
        }),
    ]);

    await readBal(alice, "Alice");
    await readBal(bob, "Bob");
})();
