Wi-Fiルーターの管理画面をスクレイピングして、ローカルネットワークにアクセス中の端末のMACアドレス一覧を取得。  
取得したMACアドレスの一覧をJSON形式でPOSTを行う仕組みのソースコードです。  

raspberryPIでの使用を想定しています。  
raspberryPIには node.js 及び phamtomjs, casperjs の導入が必要です。  

初期では特定のメーカーの特定機種におけるWi-Fiルーターのファームウェアのみの対応となります。  
データの取得、及びPOSTはcronによる定期動作を想定しています。  

カレントディレクトリに以下の名前と変数を指定したファイルを作り設定を書き込む必要があります。  


***

access_and_post.js

```JavaScript

// Wi-Fiルーターへのアクセス認証、及びPOSTの際の各種設定を記載  

// ローカルネットワークからアクセスするルーターのMACアドレス一覧が表示されるファームウェア画面のURLを記述  
var ROUTER_ADDRESS = 'http://192.168.10.1/XXX/XXXX.html';  

// ルーターファームウェア画面での認証用ID とパスワードを記述  
var ROUTER_ID = 'root';  
var ROUTER_PASS = 'password';  

// Webアプリケーション側のPOST先URLを記述  
var POST_URL = 'http://example.com/inport_post/mac_address';  

// Webアプリケーション側から設定されたhash値を記述  
var POST_KEY = 'keyXXXXXXXXXXXexample';  
```

