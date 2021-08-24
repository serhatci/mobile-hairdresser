# https://mobilerfriseur.net

A web platform developed with MEVN stack where mobile hairdressers can create their own portfolios and share with their potential customers.

## Motivation

There are considerable amounts of mobile hairdressers&freelancers in Germany who serve different types of customer groups at their own places such as old people, disabled people, or special events such as weddings, parties, etc. Pandemic situations increase the awareness of people and I expect this business to grow more. I aimed to create a web platform where mobile hairdressers can create their portfolios and share with their potential customers.

## Features

Hairdressers:

- Receive real time notifications when a customer made a request in their location
- Can create own portfolio with photos & references
- Can search & read customer requests
- Can reply customer requests
- PM messaging

Customers:

- Receive real-time notifications when a new hairdresser is joined in customer's location
- Can create customer requests
- Can ask a professional style advice
- Can review hairdressers
- PM messaging

## Tech Stack

Backend:
Node.js,
socket.io
Express.js,
MongoDB,
Mongoose

Frontend: HTML5, CSS3, Vue.js,Bootstrap5, PUG

Testing: Jest

## Screenshots

![Application image](https://github.com/serhatci/mobile-hairdresser/blob/main/backend/dev-data/screenshots/screenshots.jpg)

## Installation

Clone this repository to your local machine

In the root folder in your terminal compose up docker files

```
> docker-compose up
```

after that you can see the running application in your browser:

```
http://myapp.localhost/

```

## Architecture

ULM class diagram

![Application image](https://github.com/serhatci/mobile-hairdresser/blob/main/backend/architecture/class-diagram/class-diagram.svg)

ULM use case diagram

![Application image](https://github.com/serhatci/mobile-hairdresser/blob/main/backend/architecture/use-case-diagram/use-case.svg)
