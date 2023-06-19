FROM python:3.8
RUN python --version

#COPY pip.conf /etc/pip.conf
RUN pip install requests==2.28.0 Django==4.1.7 numpy==1.22.1 pandas==1.4.2 PyYAML==6.0

EXPOSE 9999
WORKDIR cool
ENTRYPOINT [ "/bin/bash" ]
CMD [ "./cool_front/start_django.sh" ]