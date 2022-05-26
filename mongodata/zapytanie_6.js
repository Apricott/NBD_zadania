db.people.insertOne(
    {
        "sex": "Male",
        "first_name": "Michal",
        "last_name": "Krol",
        "job": "Data Engineer",
        "email": "firstlast@email.com",
        "location": {
            "city": "Warsaw",
            "address": {
                "streetname": "Targowa",
                "streetnumber": "72"
            }
        },
        "description": "vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris",
        "height": "185",
        "weight": "85",
        "birth_date": "1999-01-05T00:00:00Z",
        "nationality": "Poland",
        "credit": [
            {
                "type" : "switch",
                "number" : "12345678901234567890",
                "currency" : "PLN",
                "balance" : "42.00"
            }
        ]
    }
)


printjson(
    db.people.findOne(
        {
            "first_name": "Michal",
            "last_name": "Krol",
        }
    )
)