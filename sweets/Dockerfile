FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/pip_cache
RUN mkdir -p /opt/app/sweets
COPY requirements.txt /opt/app/
COPY .pip_cache /opt/app/pip_cache/
COPY ./ /opt/app/sweets
COPY manage.py /opt/app/sweets
WORKDIR /opt/app/sweets
RUN pip install -r ../requirements.txt --cache-dir /opt/app/pip_cache