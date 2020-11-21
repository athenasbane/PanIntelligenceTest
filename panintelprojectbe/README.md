# PanTravel - Back End API

## Introduction

PanTravel API is organised around REST. It returns JSON-encoded responses and uses standard HTTP response codes

## Authentication

I decided against authentication on this project as no customer data is passed

### EndPoints:

Here are both endpoints"

**_Endpoint:_**

```
    GET /airports
```

This endpoint delivers the names of the airports. The data is derived from the FLIGHTS constant that can be found and edited in src/journeyCalc/journeyCalc.constants.js. Adding or subtracting flights from that array will update endpoint results.

**_Response:_**

```
    [
        "A",
        "B",
        "C",
        ...
    [
}
```

**_Endpoint:_**

```
    POST /
```

This endpoint receives the travel data then outputs the results

**_Request:_**

```
{
    "passengers": 50,
    "start": "B",
    "finish": "F",
    "disToAirport": 6
}
```

**_Response:_**

```
{
    "inboundCost": 5000,
    "outboundCost": 2000,
    "inboundRoute": [
        "FD200",
        "DE300",
        "EB500"
    ],
    "outboundRoute": [
        "BF400"
    ],
    "vehicle": "Taxi",
    "vehicleReturnCost": 62.400000000000006,
    "totalCost": 7062.4
}
```
