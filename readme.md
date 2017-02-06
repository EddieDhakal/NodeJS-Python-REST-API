## Intro
This is a sample API written in NodeJS to handle the HTTP POST requests. I have tried 
 to follow the idea of Test Driven Development and pure functions with no side effects 
 (like in Haskell) as far as I can. As a consequence the unit tests are much simpler.

## Setup
`nodemon` is only a development time dependency to auto restart the server when the files change.
```
$ npm install -g nodemon
$ npm install
```

## Starting the server
Feel free to configure it to your IDE for easier debugging or just use a command line.
```
$ npm start
```

## Running unit tests
```
$ npm test
```

## Integration tests
Although this is a NodeJS application, the end to end APIs can literally be 
 tested in pretty much any languages and tools out there.
 I have used a [Cucumber Gherkin](https://cucumber.io/) and 
 [Python Behave](http://pythonhosted.org/behave/) for black box
 testing the end to end HTTP API calls.

### Setting up the environment
It is recommended to set up in an isolated Python virtual environment.
`pyenv` is a good one if you are using a POSIX system.
```
$ python setup.py develop
```

### Running the integration tests
Make sure the REST server is running
```
$ npm start
```

Once the server is running try
```
$ behave tests/integration
```

## Manual testing
I have used [Advanced REST client](https://github.com/jarrodek/ChromeRestClient) 
 (a Google Chrome tool) but please feel free to use any tools.
