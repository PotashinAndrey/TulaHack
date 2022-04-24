#### TULAHACK
# Аукцион-наоборот от команды Lambda-2

### требования
- nodejs 17+
- postgress

## Установка и запуск
#### Инициализация БД
```json
{
  "host": "localhost",
  "user": "postgres",
  "port": 5432,
  "password": "1234",
  "database": "TulaHack"
}
```

```shell
$ psql -U TulaHack -d entities -f ./database/auction.sql
# или
$ npm run database
```

#### Бекенд + фронтенд
возможно для вашей машины стоит перегенерировать SSL сертификаты (`./ssl/*`)

```shell
$ npm install
$ npm start
```

#### Установка расширения для Chrome
из папки `./extension/` установить расширение для Chrome - нужно чтобы наш фронт цеплялся к авито

#### telegram-Бот для контроля работы аукциона
в папке `./bot`

---
#### Как сделать дамп БД
```shell
$ pg_dump -U TulaHack --clean --if-exists entities -O -x > ./database/auction.sql
# или
$ npm run database-dump
```
