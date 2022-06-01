var map = function() {
    var key = this.nationality;
    var height = parseFloat(this.height)
    var weight = parseFloat(this.weight)
    var BMI = weight/height**2
    var value = {
        count: 1,
        total_bmi: BMI,
        min_bmi: BMI,
        max_bmi: BMI
    }
    emit(key, value);
};

var reduce = function(key, values) {
    var reducedVal = {
        count: 0,
        total_bmi: 0,
        min_bmi: 0,
        max_bmi: 0
    }
    reducedVal.min_bmi = values[0].min_bmi
    reducedVal.max_bmi = values[0].max_bmi
    for (var i = 0; i < values.length; i++) {
        reducedVal.count += values[i].count
        reducedVal.total_bmi += values[i].total_bmi
        if (values[i].min_bmi < reducedVal.min_bmi) {
            reducedVal.min_bmi = values[i].min_bmi
        }
        if (values[i].max_bmi > reducedVal.max_bmi) {
            reducedVal.max_bmi = values[i].max_bmi
        }
    }
    return reducedVal;
};

var finalize = function(key, reducedVal) {
    var finalVal = {min_bmi: 0, avg_bmi: 0, max_bmi: 0}
    finalVal.avg_bmi = reducedVal.total_bmi/reducedVal.count
    finalVal.min_bmi = reducedVal.min_bmi
    finalVal.max_bmi = reducedVal.max_bmi
    return finalVal;
};

var result = db.people.mapReduce(
    map,
    reduce,
    {
        out: {replace: "wyniki_4_MR"},
        finalize: finalize
    }
)

printjson(
    db.wyniki_4_MR.find({}).toArray()
)