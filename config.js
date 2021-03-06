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
    password: 'postgres',
    database: 'TulaHack'
  },

  telegram: {
    name: "https://t.me/TulHackBot",
    token: "5307549521:AAHuZtS_HqImYOfJ2HED4siMuQEK2H-Kgz4",
    chat: 304888926
  }
}
