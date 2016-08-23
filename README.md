# YAML 2 JSON

Hosted @ http://yaml2json.cfapps.io/

## How to

### POST YAML

Post the YAML and retrieve the JSON response
```unix
curl 'http://yaml2json.cfapps.io/' --data-binary $'some_key:\n  description: A list of addresses which will be checked for TCP connectivity and\n    features\n  default:\n  - 10.244.14.2\n' --compressed | jq "."

O/p
{
  "some_key": {
    "description": "A list of addresses which will be checked for TCP connectivity and features",
    "default": [
      "10.244.14.2"
    ]
  }
}
```


### Get YAML from URL and convert

GET request with the parameter url pointing to the YAML that has to be converted

```unix

curl http://yaml2json.cfapps.io/?url=https://raw.githubusercontent.com/sks/specs/master/cf-release/v240.spec | jq ".version"

{
  "description": "'version' attribute in the /v2/info endpoint",
  "default": 0
}

```
