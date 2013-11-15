var bitQuotes = [];

function initialize(options) {
  var options = $.extend({
    "fiat": "USD",
    "fiatSymbol": "$",
    "container": "bitquote",
    "showBidAsk": true,
    "href": "https://bitcoinaverage.com/",
    "autoUpdate": true,
    "updateInterval": 162000,
    "autoResize": true
  }, options);
  bitQuotes.push(options);
  var container = '#' + options.container;
  $.get("https://api.bitcoinaverage.com/ticker/" + options.fiat, function (data) {
    createDOM(options, function () {
      $(container + " .bitquote-price").html(options.fiatSymbol + data.last);
      if (options.showBidAsk) {
        if (options.fiatSymbol <= 2) {
          $(container + " .bitquote-bid").html("Bid: " + options.fiatSymbol + data.bid);
          $(container + " .bitquote-ask").html("Ask: " + options.fiatSymbol + data.ask);
        }
        else {
          $(container + " .bitquote-bid").html("Bid: " + data.bid);
          $(container + " .bitquote-ask").html("Ask: " + data.ask);
        }
      }
      if (options.autoResize)
        adjustWidth(options, options.fiatSymbol + data.bid);
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

function adjustWidth(options, price) {
  var container = '#' + options.container;
  var mainpriceLength = price.replace(/[\. ]+/g, "").length;
  if (options.fiatSymbol.length >=2) {
    var subpriceLength = price.replace(/[\. ]+/g, "").length - options.fiatSymbol.replace(/[\. ]+/g, "").length;
    console.log(price.replace(/[\. ]+/g, "").length, options.fiatSymbol.length,  subpriceLength);
  }
  else {
    var subpriceLength = price.replace(/[\. ]+/g, "").length;
  }
  $(document).ready(function () {
    var containerWidth = $(container).width();
    if (options.showBidAsk) {
      if (mainpriceLength <= 6)
        mainpriceLength = 7;
      $(container + ' .bitquote-price').css('font-size', Math.floor(containerWidth / mainpriceLength));
      $(container + ' .bitquote-bid').css('font-size', Math.floor(containerWidth / (subpriceLength + 11)));
      $(container + ' .bitquote-ask').css('font-size', Math.floor(containerWidth / (subpriceLength + 11)));
    }
    else {
      $(container + ' .bitquote-price').css('font-size', Math.floor(containerWidth / mainpriceLength));
      //$(container + ' .bitquote-price').css('margin', '3% 5% 0 0');
    }
  });
}

function createDOM(options, callback) {
  var container = '#' + options.container;
  if (options.showBidAsk)
    var baseHTML = '<div class="bitquote-logo"><img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" /></div><div class="bitquote-price"></div><div class="askbidParent"><div class="bitquote-ask"></div><div class="bitquote-bid"></div></div><div class="clearboth"></div>'
  else
    var baseHTML = '<div class="bitquote-logo"><img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" /></div><div class="bitquote-price"></div><div class="clearboth"></div>'
  $(container).append(baseHTML);
  return callback();
}

function updateQuotes(bitOptions) {
  $.each(bitOptions, function (i, options) {
    var container = '#' + options.container;
    if (options.autoUpdate) {
      $.get("https://api.bitcoinaverage.com/ticker/" + options.fiat, function (data) {
        if ($(container + " .bitquote-price").text() != options.fiatSymbol + data.last)
          $(container + " .bitquote-price").fadeOut(600, function () {
            $(this).text(options.fiatSymbol + data.last).fadeIn(600);
          })
        if ($(container + " .bitquote-bid").text() != "Bid: " + options.fiatSymbol + data.bid)
          $(container + " .bitquote-bid").fadeOut(600, function () {
            $(this).text("Bid: " + options.fiatSymbol + data.bid).fadeIn(600);
          });
        if ($(container + " .bitquote-ask").text() != "Ask: " + options.fiatSymbol + data.ask)
          $(container + " .bitquote-ask").fadeOut(600, function () {
            $(this).text("Ask: " + options.fiatSymbol + data.ask).fadeIn(600);
          });
      });
    }
  })
}

