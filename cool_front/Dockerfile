FROM rappdw/docker-java-python:openjdk1.8.0_171-python3.6.6
RUN java -version
RUN python --version

#COPY pip.conf /etc/pip.conf
RUN pip install requests==2.14.2 Django==1.11.2 numpy==1.16.1 pandas==0.20.1 booleano==1.1a1 Shapely==1.6b4 PyYAML==3.12 django-favicon==0.1.3

EXPOSE 8188
EXPOSE 9999
WORKDIR cool_storage
ENTRYPOINT [ "/bin/bash" ]
CMD [ "./cool_front/start_django.sh" ]