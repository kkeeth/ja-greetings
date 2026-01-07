[![npm version](https://badge.fury.io/js/ja-greetings.svg)](https://badge.fury.io/js/ja-greetings)
[![Build Status](https://travis-ci.org/k-kuwahara/ja-greetings.svg?branch=master)](https://travis-ci.org/k-kuwahara/ja-greetings)
[![Code Climate](https://codeclimate.com/github/kkeeth/ja-greetings/badges/gpa.svg)](https://codeclimate.com/github/kkeeth/ja-greetings)
![node](https://img.shields.io/badge/node-%3E%3D%2022.19.0-brightgreen.svg?style=social)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# ja-greetings

```bash
___________
　　　　　明
　　今　おけ
　　年　めま
　　も　でし
　　よ　とて
　おろ　う
　願し　ご
　いく　ざ
　し　　い
　ま　　ま
　す　　す
　。　　。
-----------
```

`ja-greetings` is a cli tool that displays the greetings of each season in Japan.

## Install

```bash
$ npm i ja-greetings -g
```

※The corresponding version of nodejs is version 6 or higher!

## Usage

Just run the command! (the following is an example)

```bash
$ ja-greetings new

# shortcut
$ jgr new
```

**Commands:**

```bash
  a, all    : show all greetings
  n, new    : new years greeting
  s, summer : summer greeting
  w, winter : winter greeting
  l, last   : end of years greeting
  t, thx    : thanks greeting
  so, sorry : sorry  greeting
```

**Optios:**

```bash
  -d, --dialect   Greeting from each prefecture dialect
  -s, --surround  Decoration of the surround
  -l, --language  Select language
  -v, --version   Show version
  -h, --help      Show help
```

**Dialects:**

```bash
kyoto, osaka, okinawa, hiroshima
```

**Languages**

```bash
en, ch
```

**Surrounds:**

```bash
no        Do not surround text
w-star    ☆
b-star    ★
asterisk  ＊
w-tri     top: ▽  , bottom: △
b-tri     top: ▼  , bottom: ▲
slash     top: /￣, bottom: ＿/
```

## Test

```bash
$ chmod +x cli.js
$ npm t
```

## License

[MIT](https://github.com/kkeeth/ja-greetings/blob/master/LICENSE)

## Others

I'm waiting for you at any time, including code reviews, bug reports, feature additions, questions and more!
