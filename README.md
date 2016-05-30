## What

This is for sharing remote docker-machines across dev team

## Why

Because we want to access same remote server created by `docker-machine create`
from different machines and we want to do it right now, while proper
implementation is [in progress](https://github.com/docker/machine/issues/23)

Sharing private keys is bad idea, don't do it in production. This solution is 
for testing purposes only.

## Installation

```
npm install -g docker-machine-share
```

## Usage

### export

```
docker-machine-share > ~/docker-machines.json
```

### import

```
docker-machine-share < ~/docker-machines.json
```

## LICENSE

MIT

