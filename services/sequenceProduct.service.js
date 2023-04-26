var config = require('config.json');
var Q = require('q');
var lodash = require('lodash');
const ObjectID = require('mongodb').ObjectID;

var service = {};
service.iterative = iterative;
service.recursive = recursive;
service.product = product;

module.exports = service;

function product(parameters) {
    var deferred = Q.defer();

    if(!parameters.m) {
        deferred.reject('Campo m faltando no body.')
    }
    if(!parameters.n) {
        deferred.reject('Campo n faltando no body.')
    }
    if(!parameters.type) {
        deferred.reject('Campo type faltando no body.');
    }
    if(parameters.m > parameters.n) {
        deferred.reject('O valor de m não pode ser maior que o valor de n');
    }
    if(parameters.m < 1 || parameters.n < 1) {
        deferred.reject('Apenas valores maiores ou igual a 1 são aceitos');
    }

    if(parameters.type === 'ITERATIVE') {
        var productResult = iterative(parameters.m, parameters.n);
        deferred.resolve('Iterativo => ' + productResult);
    }
    else if(parameters.type === 'RECURSIVE') {
        var productResult = recursive(parameters.m, parameters.n);
        deferred.resolve('Recursivo => ' + productResult);
    }

    return deferred.promise;
}

function iterative(m, n) {
    var value = 1;
    for(var i = m; i <= n; i++) {
        value = value * (i + 1/i);
    }
    return value;
}

function recursive(m, n) {
    var value = (m + 1/m);
    if(m < n) {
        return value * recursive(m + 1, n);
    } 
    
    return value;
}