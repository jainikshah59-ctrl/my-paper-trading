# PaperTrade India

A virtual-money paper trading app for NSE/BSE equities. It uses Yahoo Finance's unofficial chart feed, which may be delayed and is not suitable for live execution.

## Deploy

Import this repository into Vercel. The API routes in `/api` are deployed as serverless functions.

## API contract

- `/api/quotes?symbols=RELIANCE.NS,TCS.NS` → quote map
- `/api/chart?symbol=RELIANCE.NS&range=1d&interval=1m` → candles and current price
- `/api/search?q=reliance` → NSE/BSE equity search results

Virtual money only. Not investment advice.
