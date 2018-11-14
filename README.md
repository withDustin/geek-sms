# Geek SMS

[![NPM](https://nodei.co/npm/geek-sms.png)](https://nodei.co/npm/geek-sms/)

[![dependencies Status](https://david-dm.org/Targeek/geek-sms/status.svg)](https://david-dm.org/Targeek/geek-sms)
[![devDependencies Status](https://david-dm.org/Targeek/geek-sms/dev-status.svg)](https://david-dm.org/Targeek/geek-sms?type=dev)
![GeekSMS](https://img.shields.io/github/license/Targeek/geek-sms.svg)
[![Coverage Status](https://coveralls.io/repos/github/Targeek/geek-sms/badge.svg)](https://coveralls.io/github/Targeek/geek-sms) [![Build Status](https://travis-ci.org/Targeek/geek-sms.svg?branch=master)](https://travis-ci.org/Targeek/geek-sms)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![npm type definitions](https://img.shields.io/npm/types/chalk.svg)

A javascript library that supports multiple Vietnamese SMS service provider APIs.

## Supported services

- [x] [eSMS.vn](http://esms.vn)
- [ ] [Vietguys.biz](https://www.vietguys.biz)
- [ ] [Mobifone.vn](http://smsbrandname.mobifone.vn)
- [ ] [Smarketing.vn](http://smarketing.vn/)

> If you really need a service above or another else, you can push us by creating an issue or make a PR. We are very welcome your contributions.

# Getting Started

## Installation

```bash
yarn add geek-sms
// or
npm install --save geek-sms
```

## Usage

```javascript
import { ESMS } from 'geek-sms'

const esms = new ESMS(
  {
    API_KEY: 'AN_API_KEY',
    SECRET_KEY: 'A_SECRET_KEY',
  },
  {
    loglevel: 'trace',
  },
)

esms.getBalance()
esms.getBrandNameList()
esms.sendMessage(messageInfo)
```

# Running the tests

## Run tests once

```bash
yarn test
// or
npm run test
```

## Run tests in watch mode

```bash
yarn test:watch
// or
npm run test:watch
```

# API Reference

> The documentation below is written in [ECMAScript 6](http://es6-features.org). If you have any issue please create an issue so we can help.

## eSMS.vn

### Initialize a new instance

```javascript
new ESMS(
  {
    API_KEY, // Your API key.
    SECRET_KEY, // Your secret key.
  },
  {
    loglevel, // Could be one of 'trace', 'error', 'debug', 'info', 'silent'. Defaults to 'silent'.
    baseUrl, // Overrides eSMS API URL (w/o trailing slash (`/`)).
    useHttp, // Default API URL is https. Set this value to `true` if you want to use http.
  },
)
```

Example:

```javascript
import { ESMS } from 'geek-sms'

const esms = new ESMS(
  {
    API_KEY: 'AN_API_KEY',
    SECRET_KEY: 'A_SECRET_KEY',
  },
  {
    loglevel: 'trace',
    baseUrl: 'http://another-url.esms.vn/MainService.svc/json',
  },
)
```

### Get account balance

Returns the remaining money in your account.

Example:

```javascript
const balance = await esms.getBalance()
// => 4000000
```

### Get brand name list

Returns the list of registered brand names.

Example:

```javascript
const brandnames = await esms.getBrandNameList()

/* Resolves
[ { name: 'QCAO_ONLINE', type: 2 },
  { name: 'STORELAMMOC', type: 1 },
  { name: 'STORELAMMOC', type: 2 } ]
*/
```

### Send SMS message(s)

```javascript
const messageInfo = {
  phone: '0979000001', // A list of numbers to send SMS.
  message: 'Test message jest',
  type: ESMSMessageType,
  brandName: 'STORELAMMOC',
  sandBox: true,
}

await esms.sendMessage(messageInfo)

// with
enum ESMSMessageType {
  /** Advertising message using brand name (send to >= 20 numbers). */
  AdvertisingBrandName = 1,
  /** Customer care message using brand name (send to 1 or more numbers). */
  CustomerCareBrandName = 2,
  /** For both advertising or customer care, using a static phone number to send. */
  StaticNumber = 4,
  /** Static 6394 number. Used for customer care or confirmation. */
  StaticConfirmation = 6,
  /** Use a static 10-digit number for customer care. Must registry message content first. */
  Static10Digit = 8,
}

/* Resolves
{
  id: '871a70d0-0c6c-4b47-9664-5745603da2d0169',
  phone: '0979000001',
  message: 'Test message jest',
  type: 2,
  brandName: 'STORELAMMOC',
  sandBox: true,
}
*/
```

# Contributing

Please read [CONTRIBUTING.md](https://github.com/Targeek/geek-sms/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

# Authors

- Dương Đỗ - [Targeek Solution](https://www.targeek.io)

See also the list of [contributors](https://github.com/Targeek/geek-sms/graphs/contributors) who participated in this project.

# License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Targeek/geek-sms/blob/master/LICENSE.md) file for details
