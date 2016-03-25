$(function() {
  var $hoverTxt = $("ul.thuimglist > li > div > a > strong");
  $hoverTxt.each(function() {
    var txt = $(this).text();
    if (txt.match(/\.\.\.$/)) {
      $(this).text(cutLastWord(txt));
    }
  });

  function cutLastWord(txt) {
    return txt.replace(/(\s)[\S]*$/, "") + "...";
  }
});