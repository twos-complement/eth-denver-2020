function writeText(str) {
  return new Promise(function(resolve, reject) {

    /********************************/
    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNodeContents(document.body);
    selection.removeAllRanges();
    selection.addRange(range);
    /********************************/

    var success = false;
    function listener(e) {
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
      success = true;
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);

    /********************************/
    selection.removeAllRanges();
    /********************************/

    success ? resolve(): reject();
  });
};

module.exports = {
  writeText
}