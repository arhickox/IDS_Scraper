// on-click function from the 'Scrape' Button on home page
$(document).on("click", "#initiateScrape", function() {
    // Make a request for the news section of `ycombinator`
    request("https://www.idsnews.com/section/news", function(error, response, html) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each element with a "art-above-headline" class
      $(".art-above-headline").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children("a").text();
        var link = $(element).children("a").attr("href");
  
        // If this found element had both a title and a link
        if (title && link) {
          // Insert the data in the newsDataScraped db
          db.newsDataScraped.insert({
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          });
        }
      });
    });
  
    // test alert to see if it's working
    alert("It Worked");
  });