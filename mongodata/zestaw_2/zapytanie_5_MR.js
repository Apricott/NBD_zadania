var map = function() {
    var credit = this.credit
    for (var i = 0; i < credit.length; i++){
        var key = credit[i].currency;
        var balance = parseFloat(credit[i].balance);
        var value = {
            count: 1,
            balance: balance
        }
        emit(key, value);
    }
};

var reduce = function(key, values) {
    reducedVal = {count: 0, balance: 0}
    for (var i = 0; i < values.length; i++) {
        reducedVal.count += values[i].count
        reducedVal.balance += values[i].balance
    }
    return reducedVal;
};

var finalize = function(key, reducedVal) {
    var finalVal = {avg_balance: 0, total_balance: 0}
    finalVal.avg_balance = reducedVal.balance/reducedVal.count
    finalVal.total_balance = reducedVal.balance
    return finalVal;
};

var result = db.people.mapReduce(
    map,
    reduce,
    {
        out: {replace: "wyniki_5_MR"},
        query: {sex: "Female", nationality: "Poland"},
        finalize: finalize
    }
)

printjson(
    db.wyniki_5_MR.find({}).toArray()
)
