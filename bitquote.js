function initialize(options) {
  $.get("http://api.bitcoinaverage.com/ticker/" + options.fiat, function (data) {
    var container = $('#' + options.container);
    $('<div class="bitquote-logo"><img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" width="85" /></div>').appendTo(container);
    $('<div class="bitquote-price"></div>').appendTo(container);
    $('<div class="bitquote-ask"></div>').appendTo(container);
    $('<div class="bitquote-bid"></div>').appendTo(container);
    $('<div class="clearboth"></div>').appendTo(container);
    $(".bitquote-price").html(options.fiatSymbol + data.last);
  });
}