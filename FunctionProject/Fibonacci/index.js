var bigInt = require("big-integer");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth;

    // Validar que el valor de 'nth' sea un número positivo
    if (nth < 0) {
        context.res = {
            status: 400,
            body: "Input 'nth' must be a non-negative integer."
        };
        return;
    }

    // Crear un objeto para almacenar los resultados ya calculados (memoization)
    let memo = {};

    // Función recursiva con memoization
    function fibonacci(n) {
        // Si el valor ya está calculado, lo devolvemos directamente
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

        // Calcular Fibonacci(n) de manera recursiva, y guardar el resultado en memo
        let result = fibonacci(n - 1).add(fibonacci(n - 2));
        memo[n] = result; // Guardamos el resultado para futuras llamadas

        return result;
    }

    // Llamamos a la función fibonacci con el valor de nth
    let result = fibonacci(nth);

    // Devolver el resultado como una cadena
    context.res = {
        body: result.toString()
    };
};
