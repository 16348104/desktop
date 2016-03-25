$(function() {
  var $pFocus = $("section.focus > ul > li > div > p");
  $pFocus.each(function() {
    $(this).find("script").remove();
    var txt = $(this).text();
    if (txt.match(/\.\.\.$/)) {
      $(this).text(cutLastWord(txt));
    }
  });

  var $pNews = $("section.news > ul > li > div.tn > p");
  $pNews.each(function() {
    $(this).find("script").remove();
    var txt = $(this).text();
    if (txt.match(/\.\.\.$/)) {
      $(this).text(cutLastWord(txt));
    }
  });

  var $aTitle = $("section").find(".news,.focus").find("h3 > a");
  $aTitle.each(function() {
    var txt = $(this).text();
    txt = $.trim(txt);
    if (txt.match(/\.\.\.$/)) {
      $(this).text(cutLastWord(txt));
    }
  });

  function cutLastWord(txt) {
    return txt.replace(/(\s)[\S]*$/, "") + "...";
  }
});
