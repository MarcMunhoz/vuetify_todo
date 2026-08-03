dev:
	docker compose up -d

prod:
	docker compose run --rm --entrypoint yarn app build

# Develop stage only
start:
	docker compose start

stop:
	docker compose stop

down:
	docker compose down --volumes --remove-orphans && docker image rm vuetify-todo_img && rm -rf app/node_modules

restart:
	docker compose restart

logs:
	docker compose logs

build:
	docker compose run --rm --entrypoint yarn app build

test:
	docker compose run --rm --entrypoint yarn app test

audit:
	docker compose run --rm --entrypoint yarn app audit
