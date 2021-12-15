FROM alpine:3.4

#  A few problems with compiling Java from source:
#  1. Oracle.  Licensing prevents us from redistributing the official JDK.
#  2. Compiling OpenJDK also requires the JDK to be installed, and it gets
#       really hairy.

# Default to UTF-8 file.encoding
ENV LANG C.UTF-8

# add a simple script that can auto-detect the appropriate JAVA_HOME value
# based on whether the JDK or only the JRE is installed
RUN { \
  echo '#!/bin/sh'; \
    echo 'set -e'; \
    echo; \
    echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
} > /usr/local/bin/docker-java-home \
  && chmod +x /usr/local/bin/docker-java-home
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk/jre
ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin

ENV JAVA_VERSION 8u111
ENV JAVA_ALPINE_VERSION 8.111.14-r0

RUN set -x \
  && apk add --no-cache \
  openjdk8-jre="$JAVA_ALPINE_VERSION" \
  && [ "$JAVA_HOME" = "$(docker-java-home)" ]

EXPOSE 9998
ADD Queryserver_encrypt.jar Queryserver_encrypt.jar
ADD aeolus-queryserver-0.0.1-SNAPSHOT.jar aeolus-queryserver-0.0.1-SNAPSHOT.jar
ADD conf.yaml conf.yaml
ADD liblinux.so /tmp/liblinux.so
#ENTRYPOINT env LD_LIBRARY_PATH=/tmp/:$LD_LIBRARY_PATH java -agentlib:linux -jar Queryserver_encrypt.jar conf.yaml
ENTRYPOINT env LD_LIBRARY_PATH=/tmp/:$LD_LIBRARY_PATH java -jar aeolus-queryserver-0.0.1-SNAPSHOT.jar conf.yaml
