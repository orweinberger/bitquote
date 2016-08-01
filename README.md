##BitQuote

An easy to embed bitcoin to fiat widget with data taken from http://www.bitcoinaverage.com/

Here's an image of how it looks like

![Bitquote](http://i.imgur.com/jPtDLCY.png)

To see it working go to my [github page](http://orweinberger.github.io/bitquote/)

###Quick start

Please note that if you're using the code below you are loading the plugin directly from this repository and will be impacted by any updates made to the code.
Best practice is to clone this repository and get regular updates by pulling every now and again.

```
  <html>
  <head>
  <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
  <script src="https://rawgithub.com/orweinberger/bitquote/master/bitquote.js" type="text/javascript"></script>
  <link href='http://fonts.googleapis.com/css?family=Sintony:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" media="screen" href="https://rawgithub.com/orweinberger/bitquote/master/bitquote.css">
  <script>
    initialize();
  </script>
  </head>
  <body>
    <div id="bitquote" class="bitquote"></div>
  </body>
  </html>
```

###Options

```
/* Below are the current options for bitquote and the relevant default values for each */
options {
  "fiat": "USD", // The fiat we want to convert to
  "fiatSymbol": "$", // The fiat symbol
  "container": "bitquote" // The container to place the widget in
  "autoUpdate": true, // Set this to true if you would like to have the widget auto update every 60 seconds
  "href": "http://www.bitcoinaverage.com" // link to redirect to if widget is clicked on, if you don't want to use this functionality please remove this option completely
  "autoResize": true // Set this to true if you want the script to attempt and resize the bitcoin image, bid/ask and price size according to their container
  "updateInterval": 120000 // Please try to keep this value above 60000 (60 seconds)
  "showBidAsk": true // Show or hide Bid/Ask
}
```

### Buy me a beer

![13K3wqxdRxfimn3xxdAqaDFBD24XVtrcw9](http://i.imgur.com/mwSMNDY.png)

13K3wqxdRxfimn3xxdAqaDFBD24XVtrcw9
