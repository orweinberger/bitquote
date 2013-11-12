function initialize(options) {
  $.get("http://api.bitcoinaverage.com/ticker/" + options.fiat, function (data) {
    var container = $('#' + options.container);
    $('<div class="bitquote-logo"><img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" width="55" /></div>').appendTo(container);
    $('<div class="bitquote-price"></div>').appendTo(container);
    var askbidParent = $('<div class="askbidParent"></div>');
    $(askbidParent).appendTo(container);
    $('<div class="bitquote-price"></div>');
    $('<div class="bitquote-ask"></div>').appendTo(askbidParent);
    $('<div class="bitquote-bid"></div>').appendTo(askbidParent);
    $('<div class="clearboth"></div>').appendTo(container);
    $(".bitquote-price").html(options.fiatSymbol + data.last);
    $(".bitquote-bid").html("Bid: " + options.fiatSymbol + data.bid);
    $(".bitquote-ask").html("Ask: " + options.fiatSymbol + data.ask);
  });
}