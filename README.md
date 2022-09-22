# sweets app

Candyshop management system
Django+mysql+vuejs web app

create virtual env 
1. Install dependencies 
2. launch DB
2. run python manage.py runserver
3. run python manage.py makemigrations candyshop
4. run python manage.py migrate candyshop
5. open ui/index.html

# if you like you may run app in Docker
run docker-compose up -d --build
ensure django accessible in 127.0.0.1:8000 

run 
docker-compose exec web python manage.py makemigrations candyshop
run 
docker-compose exec web python manage.py migrate candyshop
open ui/index.html

Known issues:
django cant connect to postgres 
because it is in process of creation
As a solution restart django container