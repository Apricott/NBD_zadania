import requests


def log(text):
    with open('/tasks/zestaw_6/komunikaty.txt', 'a') as logger:
        logger.writelines(text)
        logger.writelines('\n')


def update_object(key, new_val, riak_node, bucket, **kwargs):
    put_object(key, new_val, riak_node, bucket, **kwargs)


def get_object(key, riak_node, bucket):
    url = '{0}/buckets/{1}/keys/{2}'.format(riak_node, bucket, key)
    response = requests.get(url)
    headers = response.headers
    json_val = False
    for header in headers:
        if header == 'content-type':
            if headers[header] == 'application/json':
                json_val = True
            break

    log('Status code: {0}\n{1}\n'.format(response.status_code, response.text))

    if response.ok:
        print('Status code: {0}'.format(response.status_code))
        if json_val:
            json_doc = response.json()
            print('Fetched json doc:\n{0}\n'.format(json_doc))
        else:
            print('Fetched object is not a .json doc')
    else:
        print('Error! Status code received: {0}'.format(response.status_code))


def put_object(key, val, riak_node, bucket, **kwargs):
    headers = None
    for kw in kwargs:
        if kw == 'headers':
            headers = kwargs[kw]
            break

    url = '{0}/buckets/{1}/keys/{2}'.format(riak_node, bucket, key)
    response = requests.put(url, data=val, headers=headers)
    log('Status code: {0}\n{1}'.format(response.status_code, response.text))

    print('Status code: {0}'.format(response.status_code))
    print('Content:\n{0}'.format(response.text))


def delete_object(key, riak_node, bucket):
    url = '{0}/buckets/{1}/keys/{2}'.format(riak_node, bucket, key)
    response = requests.delete(url)
    log('Status code: {0}\n{1}'.format(response.status_code, response.text))

    print('Status code: {0}'.format(response.status_code))
    print('Content:\n{0}'.format(response.text))


def main():
    """
    1. create sample json doc
    2. put doc in riak
    3. fetch and print doc from riak
    4. modify doc in riak
    5. fetch and print doc from riak
    6. delete doc in riak
    7. try to fetch doc from riak
    """


    RIAK_NODE = 'http://172.17.0.2:8098'
    BUCKET = '/movies'

    # 1
    doc = '{"title": "The Lion King", "directors": ["Roger Allers", "Rob Minkoff"], "rating": 85}'
    key = 'thelionking'
    header = {"content-type": "application/json"}

    #2
    log('Put doc in riak')
    put_object(key, doc, RIAK_NODE, BUCKET, headers=header)

    #3
    log('Fetch doc from riak')
    get_object(key, RIAK_NODE, BUCKET)

    #4
    log('Modify doc in riak (rating: 100)')
    doc = '{"title": "The Lion King", "directors": ["Roger Allers", "Rob Minkoff"], "rating": 100}'
    update_object(key, doc, RIAK_NODE, BUCKET, headers=header)

    #5
    log('Fetch doc from riak')
    get_object(key, RIAK_NODE, BUCKET)

    #6
    log('Delete doc from riak')
    delete_object(key, RIAK_NODE, BUCKET)

    #7
    log('Try to fetch deleted doc from riak')
    get_object(key, RIAK_NODE, BUCKET)


if __name__ == "__main__":
    main()
