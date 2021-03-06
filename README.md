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
npm install -g docker-machine-config-dump
```

## Usage

### export

```
docker-machine-config-dump > ~/Downloads/docker-machines.json
```

### import

```
envsubst '$HOME' < ~/Downloads/docker-machines.json | docker-machine-config-dump
```

few notes:

- on mac in order to have `envsubst` command you need to install gettext utils:

```
brew install gettext
brew link --force gettext
```

- if you already have machines, it might be a good idea to backup your certs
  before importing someone else's machines:

```
docker-machine-config-dump > ~/backup-docker-machine.json
```

then if you want to restore them later just import from ~/backup-docker-machine.json:

```
docker-machine-config-dump < ~/backup-docker-machine.json
```

## LICENSE

MIT

