printjson(
    db.people.find(
        {
            "weight": {
                $gt: "68",
                $lt: "71.5"
            }
        }
    ).toArray()
)