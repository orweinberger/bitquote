var bitQuotes = [];
function initialize(options) {
  bitQuotes.push(options);
  var container = '#' + options.container;
  $.get("http://api.bitcoinaverage.com/ticker/" + options.fiat, function (data) {
    createDOM(container, function () {
      $(container + " .bitquote-price").html(options.fiatSymbol + data.last);
      $(container + " .bitquote-bid").html("Bid: " + options.fiatSymbol + data.bid);
      $(container + " .bitquote-ask").html("Ask: " + options.fiatSymbol + data.ask);
      if (options.autoResize)
        adjustWidth(container);
    });

  });
  $(document).ready(function () {
    if (options.href) {
      $(container).on('click', function (e) {
        window.location = options.href;
      });
    }
  });
}

function adjustWidth(container) {
  $(document).ready(function () {
    var containerWidth = $(container).width();
    $(container + ' .bitquote-price').css('font-size', Math.floor(containerWidth / 8));
    $(container + ' .bitquote-bid').css('font-size', Math.floor(containerWidth / 18));
    $(container + ' .bitquote-ask').css('font-size', Math.floor(containerWidth / 18));
    $(container + ' .bitquote-logo > img').css('width', Math.floor(containerWidth / 5.3));
  });
}

function createDOM(container, callback) {
  $('<div class="bitquote-logo"><img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" /></div>').appendTo(container);
  $('<div class="bitquote-price"></div>').appendTo(container);
  var askbidParent = $('<div class="askbidParent"></div>');
  $(askbidParent).appendTo(container);
  $('<div class="bitquote-price"></div>');
  $('<div class="bitquote-ask"></div>').appendTo(askbidParent);
  $('<div class="bitquote-bid"></div>').appendTo(askbidParent);
  $('<div class="clearboth"></div>').appendTo(container);
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

//Update quotes
setInterval(function () {
  updateQuotes(bitQuotes);
}, 60000)
