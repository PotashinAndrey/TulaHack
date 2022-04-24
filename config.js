export default {
  host: "localhost",
  port: 7777,
  https: 7443,
  serve: "./frontend/",
  ssl: "./ssl/",
  cert: "localhost.crt",
  key: "localhost.key",

  storage: "./frontend/storage/",

  database: {
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '1234',
    database: 'TulaHack'
  },

  telegram: {
    name: "https://t.me/TulHackBot",
    token: "5307549521:AAHuZtS_HqImYOfJ2HED4siMuQEK2H-Kgz4"
  }
}
