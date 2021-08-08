'reach 0.1';
'use strict';
/* eslint-disable */

/**
 * Creator pays x tokens to the contract and specifies prices
 * Swapper pays ALGO and receives token. It gets transferred to Creator
 * Creator can change the price
 */
export const main = Reach.App(() => {
  // Token - Price per token - Supply
  const Swap = Tuple(Token, UInt, UInt);

  const Creator = Participant('Creator', {
    getSwap: Fun([], Swap),
    gotSwap: Fun([], Null)
  });

  const Swapper = ParticipantClass('Swapper', {
    getToken: Fun([Swap], UInt),
  });


  deploy();

  Creator.only(() => {
    const [token, price, supply] = declassify(interact.getSwap());
  });
  Creator.publish(token, price, supply).pay([[supply, token]]);

  Creator.interact.gotSwap();

  const remainingBalance = parallelReduce(supply)
    .invariant(balance() == 0 && balance(token) == remainingBalance)
    .while(remainingBalance > 0)
    .case(Swapper,
      (() => {
        // Swapper publishes how many tokens they want to buy
        const amt = declassify(interact.getToken([token, price, remainingBalance]));

        assume(remainingBalance >= amt && amt > 100000);
        return {
          msg: amt
        };
      }),
      ((amt) => amt * price),
      ((amt) => {
        require(balance(token) >= amt);

        transfer(amt, token).to(this);
        transfer(amt * price).to(Creator);

        return remainingBalance - amt;
      })
    )
    .case(Creator,
      (() => ({})),
      (() => 0),
      (() => {
        return remainingBalance;
      })
    )
    .timeout(60000, () => {
      Anybody.publish();
      return remainingBalance;
    });

  commit();
  exit();
});
