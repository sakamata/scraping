var casper = require('casper').create();

casper.start(); //開始

casper.open("https://www.google.co.jp/"); //URLを開く

/*　実行したいステップをthenで追加する　*/
casper.then(function() {
  this.echo(this.getTitle()); //thisはcasperインスタンスを指す
})

casper.run(); //実行
