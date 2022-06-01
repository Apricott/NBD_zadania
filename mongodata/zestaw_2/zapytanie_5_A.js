printjson(
    db.people.aggregate([
        {
            $match:
            {
                sex: "Female",
                nationality: "Poland"
            }
        },
        {
            $unwind: "$credit"
        },
        {
            $group : {
                _id: "$credit.currency",
                avg_balance : {
                    $avg: {
                        $convert: { "input": "$credit.balance", "to": "decimal" }
                    }
                },
                total_balance : {
                    $sum: {
                        $convert: { "input": "$credit.balance", "to": "decimal" }
                    }
                }
            }
        }
    ]).toArray()
)
