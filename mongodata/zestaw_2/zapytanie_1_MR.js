var map = function() {
    var key = this.sex;
    var height = parseFloat(this.height)
    var weight = parseFloat(this.weight) 
    var value = {
        count: 1,
        height: height,
        weight: weight
    }
    emit(key, value);
};

var reduce = function(key, values) {
    reducedVal = {count: 0, height: 0, weight: 0}
    for (var i = 0; i < values.length; i++) {
        reducedVal.count += values[i].count;
        reducedVal.height += values[i].height;
        reducedVal.weight += values[i].weight;
    }
    return reducedVal;
};

var finalize = function(key, reducedVal) {
    var finalVal = {avg_height: 0, avg_weight: 0}
    finalVal.avg_height = reducedVal.height/reducedVal.count;
    finalVal.avg_weight = reducedVal.weight/reducedVal.count;
    return finalVal;
};

var result = db.people.mapReduce(
    map,
    reduce,
    {
        out: {replace: "wyniki_1_MR"},
        finalize: finalize
    }
)

printjson(
    db.wyniki_1_MR.find({}).toArray()
)