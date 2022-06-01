printjson(
    db.people.aggregate([
        {
            $group : {
                _id: "$sex",
                average_weight: {
                    $avg: {
                        $convert: { "input": "$weight", "to": "decimal" }
                    } 
                },
                average_height: {
                    $avg: {
                        $convert: { "input": "$height", "to": "decimal" }
                    }
                }
            }
        }
    ]).toArray()
)
