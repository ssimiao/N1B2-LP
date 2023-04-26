var express = require('express');
var router = express.Router();
var productService = require('services/sequenceProduct.service');

router.post('/', sequenceProduct);

module.exports = router;

async function sequenceProduct(req, res) {
    const parameters = req.body;
    productService.product(parameters)
    .then(result => {
        res.status(200).send(
            {
                "resultado": result
            }
        );
    })
    .catch(error => {
        res.status(400).send({
            "error_message" : error
        });
    })
}