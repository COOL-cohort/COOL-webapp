#!/bin/bash

front="cool-front"
backend="cool-backend"

function check_images(){
    if [ -z $(docker images --filter=reference=$front -q) ]; then
        docker build -t cool-front ./cool_front
    else
        echo "[*] image cool-front exists."
    fi

    if [ -z $(docker images --filter=reference=$backend -q) ]; then
        docker build -t cool-backend ./cool_backend
    else
        echo "[*] image cool-backend exists."
    fi
}

if [ $1x == "start"x ]; then
    echo "[*] start COOL "
    check_images
    docker run -d --privileged=true -v $(pwd)/cool_backend/cool_storage:/cool_storage -p 8200:9998 cool-backend
    docker run -d --privileged=true -v $(pwd):/cool -p 8201:9999 --link $(docker ps -q --filter ancestor=cool-backend ):cool-backend cool-front

elif [ $1x == "restart"x ]; then
    echo "[*] restart COOL "

    if [ -z $(docker ps -a -q --filter ancestor=$backend) ]; then
        check_images
        docker run -d --privileged=true -v $(pwd):/cool -p 8201:9999 --link $(docker ps -q --filter ancestor=cool-backend ):cool-backend cool-front
    else
        echo " [*] restart docker: $backend"
        docker restart $(docker ps -a -q --filter ancestor=$backend)
    fi
    
    if [ -z $(docker ps -a -q --filter ancestor=$front) ]; then
        check_images
        docker run -d --privileged=true -v $(pwd)/cool_backend/cool_storage:/cool_storage -p 8200:9998 cool-backend
    else
        echo " [*] restart docker: $front"
        docker restart $(docker ps -a -q --filter ancestor=$front)
    fi


elif [ $1x == "stop"x ]; then
	echo "[*] stop COOL"
    if [ -n $(docker ps -q --filter ancestor=$front) ]; then
        echo " [*] stop docker: $front"
        docker stop $(docker ps -q --filter ancestor=$front)
    fi

    if [ -n $(docker ps -q --filter ancestor=$backend) ]; then
        echo " [*] stop docker: $backend"
        docker stop $(docker ps -q --filter ancestor=$backend)
    fi

elif [ $1x == "clean"x ]; then
    echo "[*] clean COOL"
    if [ -n $(docker ps -q --filter ancestor=$backend) ]; then
        echo " [*] stop docker: $backend"
        docker stop $(docker ps -q --filter ancestor=$backend)
    fi

    if [ -n $(docker ps -q --filter ancestor=$backend) ]; then
        echo " [*] delete docker: $backend"
        docker rm $(docker ps -q -a --filter ancestor=$backend)
    fi

    if [ -n $(docker images --filter=reference=$backend -q) ]; then
        echo " [*] delete image: $backend"
        docker rmi $(docker images --filter=reference=$backend -q)
    fi

        if [ -n $(docker ps -q --filter ancestor=$front) ]; then
        echo " [*] stop docker: $front"
        docker stop $(docker ps -q --filter ancestor=$front)
    fi

    if [ -n $(docker ps -q --filter ancestor=$front) ]; then
        echo " [*] delete docker: $front"
        docker rm $(docker ps -q -a --filter ancestor=$front)
    fi

    if [ -n $(docker images --filter=reference=$front -q) ]; then
        echo " [*] delete image: $front"
        docker rmi $(docker images --filter=reference=$front -q)
    fi

# elif [ $1x == "test"x ]; then
#     echo "[*] test function for debug"
#     if [ -n "$(docker ps -q --filter ancestor=$front)" ]; then
#         echo " [*] stop docker: $front"
#         # docker stop $(docker ps -q --filter ancestor=$front)
#     fi

#     if [ -n $(docker ps -q --filter ancestor=$backend) ]; then
#         echo " [*] stop docker: $backend"
#         # docker stop $(docker ps -q --filter ancestor=$backend)
#     fi
else
    echo "[!] can not recognize the command $1"
	echo "[!] support command: start, restart, stop, clean"
fi 
