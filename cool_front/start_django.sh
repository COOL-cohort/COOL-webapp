#!/usr/bin/env bash
create_default_user(){
./manage.py shell<<EOD
from django.contrib.auth.models import User
try:
    User.objects.get( username='admin' )
except User.DoesNotExist as e:
    User.objects.create_superuser( 'admin', '', '123456' )
EOD
}

main(){
    ./manage.py makemigrations
    ./manage.py migrate
    create_default_user
    ./manage.py runserver 0.0.0.0:9999
}
main "$@"
