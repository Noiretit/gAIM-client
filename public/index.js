/*Jquery*/
$(function () {
  // this will get the full URL at the address bar
  var url = window.location.href;

  // passes on every "a" tag
  $(".icons-navbar").each(function () {
    // checks if its the same on the address bar
    if (url == this.href) {
      //   $(this).closest("a").addClass("changeMenuColor");
      $(this).css(
        "filter",
        "invert(100%) sepia(43%) saturate(1%) hue-rotate(86deg) brightness(113%) contrast(101%)"
      );
    }
  });
});
