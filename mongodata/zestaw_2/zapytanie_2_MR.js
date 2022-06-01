var map = function() {
    var credit = this.credit
    for (var i = 0; i < credit.length; i++){
        var key = credit[i].currency;
        var value = parseFloat(credit[i].balance);
        emit(key, value);
    }
};

var reduce = function(key, values) {
    reducedVal = 0
    for (var i = 0; i < values.length; i++) {
        reducedVal += values[i];
    }
    return reducedVal;
};

var finalize = function(key, reducedVal) {
    var finalVal = {total_balance: 0}
    finalVal.total_balance = reducedVal;
    return finalVal;
};

var result = db.people.mapReduce(
    map,
    reduce,
    {
        out: {replace: "wyniki_2_MR"},
        finalize: finalize
    }
)

printjson(
    db.wyniki_2_MR.find({}).toArray()
)
