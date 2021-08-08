'reach 0.1';
/* eslint-disable */

export const main = Reach.App(() => {
    const Minter = Participant('Minter', {
        getParams: Fun([], Object({
            name: Bytes(32),
            symbol: Bytes(8),
            supply: UInt
        })),
        seeToken: Fun([Object({
            token: Token,
            amount: UInt,
        })], Null),
        payBack: Fun([], Bool)
    });

    deploy();

    Minter.only(() => {
        const _prms = interact.getParams();
        const [name, symbol, supply] = [
            declassify(_prms.name),
            declassify(_prms.symbol),
            declassify(_prms.supply)
        ];

        assume(supply > 0, "Supply is 0");
    });
    Minter.publish(name, symbol, supply);
    require(supply > 0, "Supply is 0");

    const tok = new Token({ name, symbol, supply });
    transfer(supply, tok).to(Minter);

    Minter.interact.seeToken({
        token: tok,
        amount: supply
    });

    commit();

    Minter.only(() => {
        const _m = interact.payBack();
    });
    Minter.publish().pay([[supply, tok]]);

    tok.burn();
    tok.destroy();
    commit();
});
