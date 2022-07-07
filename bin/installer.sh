#!/bin/bash

echo "installing..."

npm install

cd src-capacitor && npm install

if [[ "$OSTYPE" == "darwin"* ]]; then
    cd ios && cd App && pod install 
fi


