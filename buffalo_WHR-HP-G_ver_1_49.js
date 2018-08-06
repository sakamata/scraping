// 設定ファイルのinclude 対象は .gitignore ファイルとしています
// 本ファイル内の大文字の変数を読み込んでます
phantom.injectJs('access_and_post.js');


// スクレイピング開始
// basic認証
var casper = require('casper').create({
    pageSettings: {
        userName: ROUTER_ID,  // BASIC認証のID
        password: ROUTER_PASS   // BASIC認証のパスワード
    },
   logLevel: "debug"
});

// 指定のURLへ遷移
// frameの子要素のみを直接呼び出している
casper.start(ROUTER_ADDRESS)

// Thanks! https://stackoverflow.com/questions/33770798/extracting-table-elements-with-casperjs
// table要素の特定列の値のみをjson形式で返す
casper.then(function a2() {
    var mac_address = casper.evaluate(function () {
        return [].map.call(__utils__.findAll('table tr td:nth-child(1)'), function (e) { return e.innerHTML; });
    });

    // 取得結果の配列をJSONに変換
    var res = JSON.stringify(mac_address, null, 2);
    console.log(res);
    // WebApp側へPOSTする
    casper.open(POST_URL, {
      method: 'post',
      data: {
        'mac': res
      },
      headers: {
        'Accept-Language': 'ja'
      }
    });

});

//実行
casper.run();
