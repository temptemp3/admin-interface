/* eslint-disable */
'reach 0.1';

export const main = Reach.App(() => {
    const Approver = Participant('Approver', {
        getParams: Fun([], Object({
            token: Token,
            supply: UInt,
            airdropAmount: UInt
        })),
        getAddress: Fun([], Maybe(Address)),
        seeFinish: Fun([], Null)
    });
    deploy();

    Approver.only(() => {
        const _params = interact.getParams();
        const [token, supply, amount] = declassify([_params.token, _params.supply, _params.airdropAmount]);
    });
    Approver.publish(token, supply, amount).pay([[supply, token]]);

    var [finished, totalAirdrops] = [false, 0];
    invariant(balance() == 0 && balance(token) == supply - (totalAirdrops * amount));
    while (!finished && balance(token) >= amount) {
        commit();

        Approver.only(() => {
            const addr = declassify(interact.getAddress());
        });
        Approver.publish(addr);

        if (isNone(addr)) {
            [finished, totalAirdrops] = [true, totalAirdrops];
            continue;
        }
        else {
            transfer(amount, token).to(fromSome(addr, Approver));
            [finished, totalAirdrops] = [false, totalAirdrops + 1];
            continue;
        }
    }

    commit();
    Approver.only(() => interact.seeFinish());
    Approver.publish();

    transfer(balance(token), token).to(Approver);

    commit();
    exit();
});
