const mathjs = require("mathjs");

const sanatizer = /^[\s\d\.+-/*)(]*$/
exports.calculus = (req, res) => {
    // Extract "query" parameter from the URL query string.
    const query = req.query.query;
    try {
        if (!query) throw new Error("You must provide a math expression in the query parameter");
        
        // Decode string (mathjs can't do Buffers)
        const decodedQuery = Buffer.from(query, 'base64').toString('ascii');
        // Avoid exposing the full mathjs functionality, there could be an expression of doom somewhere
        if (!sanatizer.test(decodedQuery)) throw new Error("Only () + - / * and numbers are supported");
        // Run it as a maths expression (may throw)
        const result = mathjs.eval(decodedQuery);
        // Ensure we don't have a symbolic expression (may throw)
        const numericalResult = Number.parseFloat(result);
        
        res.status(200).send({
            error: false,
            result: numericalResult
        });
    } catch (err) {
        res.status(/* Bad Request */ 400).send({
            error: true,
            message: err.message
        });
    }
};