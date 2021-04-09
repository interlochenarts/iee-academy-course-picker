#!/bin/bash

NODE_VERSION=14
NG_CLI_VERSION=v7-lts

cd ..;

# check if nvm is installed. If not, install it.
if [ ! -f "$HOME/.nvm/nvm.sh" ]; then
    # May need to be updated with the latest nvm release
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
fi

# lets us use the nvm commands
source "$HOME/.nvm/nvm.sh"
nvm install $NODE_VERSION

# get our dependencies
npm install;
npm install --save-dev;

# check for angular-cli and install if not found
if ! command -v ng &>/dev/null; then
  npm install -g @angular/cli@$NG_CLI_VERSION
fi

ng build --prod --aot --output-hashing=none
