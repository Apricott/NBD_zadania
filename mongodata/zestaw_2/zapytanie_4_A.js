printjson(
    db.people.aggregate([
        {
            $project: {
                "nationality": 1,
                "BMI": {
                    $divide: [
                        {
                            $convert: { "input": "$weight", "to": "decimal" },
                        },
                        {
                            $multiply: [
                                {
                                    $convert: { "input": "$height", "to": "decimal" }
                                },
                                {
                                    $convert: { "input": "$height", "to": "decimal" }
                                }
                            ]
                        }
                    ]
                }
            }
        },
        {
            $group : {
                _id: "$nationality",
                min_BMI: {
                    $min: "$BMI"
                },
                average_BMI: {
                    $avg: "$BMI"
                },
                max_BMI: {
                    $max: "$BMI"
                }
            }
        }
    ]).toArray()
)
