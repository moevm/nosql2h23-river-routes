#!/bin/sh
while ! nc -z db 7687; do sleep 5; done;
# запуск osm-pump.jar
java -jar osm-pump.jar