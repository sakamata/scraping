// 設定ファイルのinclude 対象は .gitignore ファイルとしています
// 本ファイル内の大文字の変数を読み込んでます
phantom.injectJs('access_and_post.js');

// スクレイピング開始
var casper = require('casper').create();
casper.start();

// ###sample### はてなブックマークの記事タイトルのみを抽出する
// 指定のURLへ遷移
casper.start('http://b.hatena.ne.jp/hotentry/all', function() {
    var NewsArrays = this.evaluate(function() {
        // htmlの要素を指定して必要な情報を抽出する
        // ブラウザの開発ツールにある "Copy selector" 等が参考になります
        var Nodes = document.querySelectorAll('#container > div.wrapper > div > div.entrylist-main > section > ul > li > div > div.entrylist-contents-main > h3 >a', 'data-gtm-click-label');
        // 抽出したNodesを配列として取得
        return Array.prototype.map.call(Nodes, function(element) {
            return element.innerHTML;
        });
    });

    // デバッグ用の時間取得
    var date = new Date();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var now = min + ':' + sec;

    // 取得結果の配列をJSONに変換
    var res = JSON.stringify(NewsArrays);
    // WebApp側へPOSTする
    casper.open(POST_URL, {
      method: 'post',
      data: {
        'time': now,
        'mac': res
      },
      headers: {
        'Accept-Language': 'ja'
      }
    });

    //取得した内容を表示する
    require('utils').dump(NewsArrays);
});

//実行
casper.run();
