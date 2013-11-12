var bitQuotes = [];

function initialize(options) {
  var options = $.extend({
    "fiat": "USD",
    "fiatSymbol": "$",
    "container": "bitquote",
    "href": "https://bitcoinaverage.com/",
    "autoUpdate": true,
    "updateInterval": 60000,
    "autoResize": true
  }, options);
  bitQuotes.push(options);
  var container = '#' + options.container;
  $.get("http://api.bitcoinaverage.com/ticker/" + options.fiat, function (data) {
    createDOM(container, function () {
      $(container + " .bitquote-price").html(options.fiatSymbol + data.last);
      $(container + " .bitquote-bid").html("Bid: " + options.fiatSymbol + data.bid);
      $(container + " .bitquote-ask").html("Ask: " + options.fiatSymbol + data.ask);
      if (options.autoResize)
        adjustWidth(container, options.fiatSymbol.length);
    });

  });
  $(document).ready(function () {
    if (options.href) {
      $(container).on('click', function (e) {
        window.location = options.href;
      });
    }
  });
  setInterval(function () {
    updateQuotes(bitQuotes);
  }, options.updateInterval);
}

function adjustWidth(container, symbolWidth) {
  $(document).ready(function () {
    var containerWidth = $(container).width();
    $(container + ' .bitquote-price').css('font-size', Math.floor(containerWidth / (8 + symbolWidth / 2)));
    $(container + ' .bitquote-bid').css('font-size', Math.floor(containerWidth / (17 + symbolWidth)));
    $(container + ' .bitquote-ask').css('font-size', Math.floor(containerWidth / (17 + symbolWidth)));
    $(container + ' .bitquote-logo > img').css('width', Math.floor(containerWidth / (5.3)));
  });
}

function createDOM(container, callback) {
  var baseHTML = '<div class="bitquote-logo"><img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" /></div><div class="bitquote-price"></div><div class="askbidParent"><div class="bitquote-ask"></div><div class="bitquote-bid"></div></div><div class="clearboth"></div>'
  $(container).append(baseHTML);
  return callback();
}

function updateQuotes(bitOptions) {
  $.each(bitOptions, function (i, options) {
    var container = '#' + options.container;
    if (options.autoUpdate) {
      $.get("http://api.bitcoinaverage.com/ticker/" + options.fiat, function (data) {
        $(container + " .bitquote-price").html(options.fiatSymbol + data.last);
        $(container + " .bitquote-bid").html("Bid: " + options.fiatSymbol + data.bid);
        $(container + " .bitquote-ask").html("Ask: " + options.fiatSymbol + data.ask);
      });
    }
  })
}

