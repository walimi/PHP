// note: IE8 doesn't support DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

  var suggestions = document.getElementById("suggestions");
  var form = document.getElementById("search-form");
  var search = document.getElementById("search");

  function showSuggestions(json) {
  }

  function getSuggestions() {
    var q = search.value;
    // Don't display the search results if the search term is less than
    // 3 characters
    if(q.length < 3) {
      suggestions.style.display = "none";
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'autosuggest.php?q=' + q, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
      if(xhr.readyState == 4 && xhr.status == 200) {
        var result = xhr.responseText;
        console.log('Result: ' + result);
        result = "{}";
        var json = JSON.parse(result);
        showSuggestions(json);
      }
    };
    xhr.send();
  }

  // use "input" which is every key stroke
  search.addEventListener("input", getSuggestions);

});
