$(function() {
  var indexThreshold = 100;
  var patterns = [ /(.)*[0-9]{1,2}(\s)?月(\s)?[0-9]{1,2}(\s)?日(\s)?电/,
      /(\uFF08|\u0028)[\s\S]*记者[\s\S]*(\uFF09|\u0029)/,
      /(\uFF08|\u0028)[\s\S]*通讯员[\s\S]*(\uFF09|\u0029)/, /\u25CF/ ];
  var $p = $("section.focus > ul > li:not(.isimg) > div");
  $p.each(function() {
    var $elem_h3 = $(this).find("> h3");
    var articleTitle = $.trim($elem_h3.find("> a").text());
    var $elem_p = $(this).find("> p");
    $elem_p.find("script").remove();
    var txt = $elem_p.text();
    var prefix = txt.substring(0, indexThreshold);
    var suffix = txt.substring(indexThreshold);
    prefix = prefix.replace(articleTitle, "");
    $.each(patterns, function(i, pattern) {
      prefix = prefix.replace(pattern, "");
    });
    txt = prefix + suffix;

    var re = new RegExp(String.fromCharCode(160), "g");
    txt = txt.replace(re, " ");

    $elem_p.text(txt);
  });
});