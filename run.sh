#!/bin/bash

if [ $ENV == "prod" ];
then
  npm run start:prod
else
  npm run dev
fi