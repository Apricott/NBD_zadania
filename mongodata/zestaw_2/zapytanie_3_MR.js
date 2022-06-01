var map = function() {
    var key = this.job;
    var value = 1;

    emit(key, value);
};

var reduce = function(key, values) {
    var reducedVal = 0
    for (var i = 0; i < values.length; i++) {
        reducedVal += values[i];
    }
    return reducedVal;
};

var finalize = function(key, reducedVal) {
        return null;
};

var result = db.people.mapReduce(
    map,
    reduce,
    {
        out: {replace: "wyniki_3_MR"},
        finalize: finalize
    }
)

printjson(
    db.wyniki_3_MR.find({}, {"_id": 1}).toArray()
)
