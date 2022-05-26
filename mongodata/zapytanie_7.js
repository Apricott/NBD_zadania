db.people.deleteMany(
    {
        "height": {$gt: "190"}
    }
)

printjson(
    db.people.find(
        {
            "height": {$gt: "190"}
        }
    ).toArray()
)