var http = require('http');
var fs = require('fs');

const PORT = 5553; 

fs.readFile('./public/index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT, function() {
      console.log('Server running at http://localhost:' + PORT + '/')
    });
});