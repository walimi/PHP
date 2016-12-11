// note: IE8 doesn't support DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

  var suggestions = document.getElementById("suggestions");
  var form = document.getElementById("search-form");
  var search = document.getElementById("search");

  // Turn JSON to response
  function suggestionsToList(items) {

    // This is what the output needs to look like
    //<li><a href="search.php?q=alpha">Alpha</a></li>

    var output = "";

    for(i=0; i <items.length; i++) {
      output += '<li>';
      output += '<a href="search.php?q=' + items[i] + '">';
      output += items[i];
      output += '</a>';
      output += '</li>';
    }

    return output;

  }

  function showSuggestions(json) {
    var li_list = suggestionsToList(json);
    suggestions.innerHTML = li_list;
    suggestions.style.display = "block";
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
        var json = JSON.parse(result);
        showSuggestions(json);
      }
    };
    xhr.send();
  }

  // use "input" which is every key stroke
  search.addEventListener("input", getSuggestions);

});
