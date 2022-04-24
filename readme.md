#### TULAHACK
# Аукцион-наоборот от команды Lambda-2

### требования
- nodejs 17+
- postgres

## Установка и запуск
#### Инициализация БД
```json
{
  "host": "localhost",
  "user": "postgres",
  "port": 5432,
  "password": "postgres",
  "database": "TulaHack"
}
```

```shell
$ psql -U postgres -d TulaHack -f ./database/auction.sql
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
$ pg_dump -U postgres --clean --if-exists TulaHack -O -x > ./database/auction.sql
# или
$ npm run database-dump
```
