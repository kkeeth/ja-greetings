[![npm version](https://badge.fury.io/js/ja-greetings.svg)](https://badge.fury.io/js/ja-greetings)
[![Build Status](https://travis-ci.org/k-kuwahara/ja-greetings.svg?branch=master)](https://travis-ci.org/k-kuwahara/ja-greetings)
[![Code Climate](https://codeclimate.com/github/k-kuwahara/ja-greetings/badges/gpa.svg)](https://codeclimate.com/github/k-kuwahara/ja-greetings)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# ja-greetings

```
_______________
            あ
      今  おけ
    よ年  めま
    ろも  でし
    し    とて
  おく    う
  願    ご
  い    ざ
  し    い
  ま    ま
  す    す
  。    。
---------------
```

`ja-greetings` is a cli tool that displays the greetings of each season in Japan.


## Install
・local install

```
$ npm i ja-greetings
```

・global install

```
$ npm i ja-greetings -g
```
※The corresponding version of nodejs is version 6 or higher!


## Usage

Please add the following to `package.json`.
```
…
  "scripts": {
    "greet": "ja-greetings"
  },
…
```

Just run the command! (the following is an example)
```
$ npm run greet new
```

If you have globally installed, you can execute with the following command.

```
$ ja-greetings new
```

__Commands:__
```
  a, all    : show all greetings
  n, new    : new years greeting
  s, summer : summer greeting
  w, winter : winter greeting
  l, last   : end of years greeting
  t, thx    : thanks greeting
  so, sorry : sorry  greeting
```

__Optios:__
```
  -d, --dialect   Greeting from each prefecture dialect
  -s, --surround  Decoration of the surround
  -v, --version   Show version
  -h, --help      Show help
```


__Dialects:__
```
kyoto osaka okinawa hiroshima
```

__Surrounds:__
```
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
[MIT](https://github.com/k-kuwahara/ja-greetings/blob/master/LICENSE)


## Others
I'm waiting for you at any time, including code reviews, bug reports, feature additions, questions and more!
