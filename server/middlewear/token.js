const jwt = require('jsonwebtoken');
exports.GenerateToken = (payload) => {
    {
        const token = jwt.sign({ payload }, process.env.KEY, { expiresIn: '1h' }) // expires in 1 hour
        const obj = {
            success: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    }
}
exports.verify = (request, res) => {
    console.log("Verifies request");///verifies request 
    jwt.verify(token, process.env.KEY, (err, result) => {
        if (err) res.status(422).send({ message: "token is not correct" });
        else {
            request.decoded = result;
        }
    })

}