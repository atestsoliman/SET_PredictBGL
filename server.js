let connect = require('connect'); 
let http = require('http');
let serveStatic = require('serve-static');
let fs = require('fs');
let url = require('url');

let app = connect();

app.use(serveStatic('./src'));
app.use(serveStatic('./')); //for scripts in node modules

app.use(function (req, res, next) {
    let uri = url.parse(req.url);
    if( /^\/(log|graph)?/.test(uri.pathname)) {
        //shamelessly copied from in class example
        fs.readFile('./src/index.html', { encoding: 'utf8' }, function (err, data) {
        if (err) {
            throw err;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Length', data.length);
            res.write(data, 'utf8', function (err) {
                if (err) {
                throw err;
                }
                res.end();
            });
        });
    } 
    else {
        next();
    } 
});



console.log('Starting webserver on http://localhost:3000/');
http.createServer(app).listen(3000);
