(function (window) {
  "use strict";

  var xmlRSS = '<?xml version="1.0"?>' +
    '<rss version="2.0">' +
    '<channel>' +
    '<title>Example RSS 2.0</title>' +
    '<link>http://www.example.org</link>' +
    '<description>Example RSS 2.0 -  Test description</description>' +
    '<language>en-us</language>' +
    '<pubDate>Tue, 10 Jun 2003 04:00:00 GMT</pubDate>' +
    '<lastBuildDate>Tue, 10 Jun 2003 09:41:01 GMT</lastBuildDate>' +
    '<docs>http://example.com/rss</docs>' +
    '<generator>Weblog Editor 2.0</generator>' +
    '<managingEditor>editor@example.com</managingEditor>' +
    '<webMaster>webmaster@example.com</webMaster>' +
    '<item>' +
    '<title>RSS 2.0 - Entry 1 title</title>' +
    '<link>http://example.com/test.php</link>' +
    '<description>Item 1 - Sample description</description>' +
    '<pubDate>Tue, 03 Jun 2003 09:39:21 GMT</pubDate>' +
    '<guid>http://example.com/rss2.html#example1</guid>' +
    '</item>' +
    '<item>' +
    '<title>RSS 2.0 - Entry 2 title</title>' +
    '<link>http://example.com/test.php</link>' +
    '<description>Item 2 - Sample description</description>' +
    '<pubDate>Fri, 30 May 2003 11:06:42 GMT</pubDate>' +
    '<guid>http://example.com/rss2.html#example2</guid>' +
    '</item>' +
    '<item>' +
    '<title>RSS 2.0 - Entry 3 title</title>' +
    '<link>http://example.com/test.php</link>' +
    '<description>Item 3 - Sample description</description>' +
    '<pubDate>Tue, 27 May 2003 08:37:32 GMT</pubDate>' +
    '<guid>http://example.com/rss2.html#example3</guid>' +
    '</item>' +
    '<item>' +
    '<title>RSS 2.0 - Entry 4 title</title>' +
    '<link>http://example.com/test.php</link>' +
    '<description>Item 4 - Sample description</description>' +
    '<pubDate>Tue, 20 May 2003 08:56:02 GMT</pubDate>' +
    '<guid>http://example.com/rss2.html#example4</guid>' +
    '</item>' +
    '</channel>' +
    '</rss>';


  gadgets.io = gadgets.io || {};

  gadgets.io.makeRequest = function (url, callback) {
    var response = {
      data: xmlRSS,
      errors: [],
      rc: 200,
      text: xmlRSS
    };

    callback.call(null, response);
  };

})(window);
