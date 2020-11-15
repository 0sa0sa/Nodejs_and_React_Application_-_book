const Mastodon = require("mastodon-api");
const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const file_cli_app = path.join(__dirname, "cli-app.json");
const file_user = path.join(__dirname, "token.json");
const instanceUri = "https://pawoo.net";

const info = JSON.parse(fs.readFileSync(file_cli_app));
console.log("info:" + info);

Mastodon.getAuthorizationUrl(info.client_id, info.client_secret, instanceUri)
  .then((url) => {
    console.log("以下のURLにアクセスしてコードを取得してください．");
    console.log(url);
    // コマンドラインからコードを取得
    const code = readlineSync.question("コード：");
    console.log("code:" + code);
    // アクセストークンを取得する
    return Mastodon.getAccessToken(
      info.client_id,
      info.client_secret,
      code,
      instanceUri
    );
  })
  .then((token) => {
    console.log("アクセストークン：", token);
    fs.writeFileSync(file_user, token);
  });
