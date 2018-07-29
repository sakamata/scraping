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
casper.start('http://192.168.11.1/cgi-bin/cgi?req=frm&frm=client.html', function() {
    var mac1 = this.getElementInfo("body > table > tbody > tr > td:nth-of-type(1)");
    mac1  = mac1.text.trim();
    require('utils').dump(mac1);
});

//実行
casper.run();
