var bigInt = require("big-integer");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth;

    if (nth < 0) {
        context.res = {
            status: 400,
            body: "Input 'nth' must be a non-negative integer."
        };
        return;
    }

    let memo = {};

    function fibonacci(n) {
        if (n in memo) {
            return memo[n];
        }

        // Casos base
        if (n === 0) {
            return bigInt.zero;
        }
        if (n === 1) {
            return bigInt.one;
        }

        let result = fibonacci(n - 1).add(fibonacci(n - 2));
        memo[n] = result;

        return result;
    }

    let result = fibonacci(nth);

    context.res = {
        body: result.toString()
    };
};
