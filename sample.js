// 設定ファイルのinclude 対象は .gitignore ファイルとしています
// 詳細は sample_access_and_post.js を観ながら同様に設定をしてください。
// 本ファイル内の大文字の変数を読み込んでます。

// 動作確認をするのみであれば、以下の様にカレントディレクトリのファイルが読み込むのみでOKです。
phantom.injectJs('access_and_post.js');

// virtualboxでの仮想環境では以下の様な /mnt といったマウント用フォルダからの絶対PATH設定が必要です。
// phantom.injectJs('/mnt/scraping/access_and_post.js');

// RaspberryPI本体でcron稼働させる場合、絶対PATHでの設定が必要です。
// phantom.injectJs('/home/pi/scraping/access_and_post.js');


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
    //取得した内容を表示する
    require('utils').dump(NewsArrays);
/*
    // WebApp側へPOSTする POSTの検証の際はコメントアウトしてください。
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
*/
});

//実行
casper.run();
