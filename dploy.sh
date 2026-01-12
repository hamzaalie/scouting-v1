#!/bin/bash

WORKDIR_FRONT="/home/brainci-user/htdocs/brainci.org/current"
WORKDIR_API="/home/brainci-api-admin/htdocs/api-admin.brainci.org/current"
APP_NAME_FRONT="front"
APP_NAME_API="api"
API_USER="brainci-api-admin"
FRONT_USER="brainci-user"
CURRENT_USER=$(whoami)

echo "//******************************* DEPLOY FROM MAIN ****************************************************************//"

sleep 10

dploy deploy main

echo "//------------------------------- DELETE OLD PM2 INSTANCE AND SAVE ------------------------------------------------//"

sleep 10

if [ "$CURRENT_USER" == "$API_USER" ]; then
    cd $WORKDIR_API
else
    cd $WORKDIR_FRONT
fi

pm2 delete 0 && pm2 save

echo "//------------------------------- INSTALLING DEPENDENCIES AND RUN BUILD ------------------------------------------------//"

sleep 10

if [ "$CURRENT_USER" == "$API_USER" ]; then
    sleep 10
    echo "/****************************** CHANGE TO $WORKDIR_API *******************************************************************"
    cd $WORKDIR_API
else
    sleep 10
    echo "/****************************** CHANGE TO $WORKDIR_FRONT *******************************************************************"
    cd $WORKDIR_FRONT
fi

npm i

npm run build

echo "//******************************** RUN NEW PM2 INSTANCE ***************************************************************//"

sleep 10

if [ "$CURRENT_USER" == "$API_USER" ]; then
    pm2 start npm --name $APP_NAME_API -- start
else
    pm2 start npm --name $APP_NAME_FRONT -- start
fi

pm2 save

if [ "$CURRENT_USER" == "$API_USER" ]; then

    echo "//******************************* ADD PEM KEY ****************************************************//"
    sudo cp /etc/letsencrypt/live/api-admin.brainci.org/fullchain.pem "$WORKDIR_API/certs/"
    sudo cp /etc/letsencrypt/live/api-admin.brainci.org/privkey.pem "$WORKDIR_API/certs/"
    sudo chown -R $API_USER:$API_USER $WORKDIR_API/certs/
fi

if [ $? -eq 0 ]; then
    echo "YOUR DEPLOY SUCCESSED "
else
    echo "Une erreur s'est produite lors du déploiement."
fi
