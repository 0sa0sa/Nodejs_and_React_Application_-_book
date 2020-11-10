// httpモジュールを読み込む
const http = require("http");
const ctype = { "Content-Type": "text/html;charset=utf-8" };

// Web server
const svr = http.createServer(handler);
svr.listen(8081);

// server process
function handler(req, res) {
  // search url
  const url = req.url;
  // top page?
  if (url === "/" || url === "/index.html") {
    showIndexPage(req, res);
    return;
  }
  // dice page?
  if (url.substr(0, 6) === "/dice/") {
    showDicePage(req, res);
    return;
  }
  // others
  res.writeHead(404, ctype);
  res.end("404 not found");
}

function showIndexPage(req, res) {
  // res header
  res.writeHead(200, ctype);

  // res body
  const html =
    "<h1>サイコロページの案内</h1>\n" +
    '<p><a href="/dice/6">６面体サイコロ</a></p>' +
    '<p><a href="/dice/12">１２面体サイコロ</a></p>';
  res.end(html);
}

function showDicePage(req, res) {
  // res header
  res.writeHead(200, ctype);

  const a = req.url.split("/");
  console.log("a :" + a);
  const num = parseInt(a[2]);

  // random num
  const rnd = Math.floor(Math.random() * num) + 1;
  //res body
  res.end('<p style="font-size:72px;">' + rnd + "</p>");
}
