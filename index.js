var fs = require('fs');
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
var page;
driver.get('http://www.cc.gov.eg/Legislations/Egypt_Legislations.aspx');
for (var i = 2; i <= 21; i++) {
	page= "javascript:__doPostBack(\'ctl00$MainContent$GridView1\',\'Page$"+i+"\')";
	driver.findElement(By.css('[href^="'+page+'"]')).click();
	driver.executeScript(function() {
	    return document.querySelector('html').innerHTML;
	  }).then(function(innerHTML) {
	  	var k = Math.abs((i--)-23);
	  	fs.writeFile("./pages/page"+ k +".html", innerHTML, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("Page #" + k + " saved");
		}); 
	  });
};

//driver.quit();
