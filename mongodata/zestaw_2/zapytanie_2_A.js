printjson(
    db.people.aggregate([
        {
            $unwind: "$credit"
        },
        {
            $group : {
                _id: "$credit.currency",
                total_balance : {
                    $sum: {
                        $convert: { "input": "$credit.balance", "to": "decimal" }
                    }
                }
            }
        }
    ]).toArray()
)
