var fs = require('fs');
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
var page;
	y = 21; 
driver.get('http://www.cc.gov.eg/Legislations/Egypt_Legislations.aspx');
while(y < 420){ // go to the range of start page
	page= "javascript:__doPostBack(\'ctl00$MainContent$GridView1\',\'Page$"+y+"\')";
	driver.findElement(By.css('[href^="'+page+'"]')).click();
	y+=20;
};
for (var i = 407; i <= 2000; i++) { // start page
	page= "javascript:__doPostBack(\'ctl00$MainContent$GridView1\',\'Page$"+i+"\')";
	driver.findElement(By.css('[href^="'+page+'"]')).click();
	driver.executeScript(function() {
	    return document.querySelector('html').innerHTML;
	  }).then(function(innerHTML) {
	  	var k = Math.abs((i--)-2000-408); //start page +1 
	  	fs.writeFile("../pages/page"+ k +".html", innerHTML, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("Page #" + k + " saved");
		}); 
	  });
};

