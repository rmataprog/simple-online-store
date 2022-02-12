var http = require('http');
var fs = require('fs');

var index = fs.readFileSync('index.html');
var cart = fs.readFileSync('html/cart.html');
var productLanding = fs.readFileSync('html/productLanding.html');
var productList = fs.readFileSync('html/productsList.html');
var script = fs.readFileSync('js/script.js');
var materializeScript = fs.readFileSync('js/materialize.js');
var productLandingScript = fs.readFileSync('js/productLanding.js');
var productListScript = fs.readFileSync('js/productList.js');
var style = fs.readFileSync('css/style.css');
var materializeStyle = fs.readFileSync('css/materialize.css');
var productListStyle = fs.readFileSync('css/productsList.css');
var image_1 = fs.readFileSync('assets/images/pexels-artem-beliaikin-994517.jpg');
var image_2 = fs.readFileSync('assets/images/pexels-artem-beliaikin-1078958.jpg');
var image_3 = fs.readFileSync('assets/images/pexels-karol-d-325153.jpg');
var image_4 = fs.readFileSync('assets/images/pexels-kenneth-gorzal-surillo-5157291.jpg');
var image_5 = fs.readFileSync('assets/images/pexels-sam-lion-5709614.jpg');
var data = fs.readFileSync('assets/data.json');

var server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(index);
    } else if (req.url === '/html/cart.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(cart);
    } else if (req.url === '/html/productLanding.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(productLanding);
    } else if (req.url === '/html/productsList.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(productList);
    } else if (req.url === '/js/script.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(script);
    } else if (req.url === '/js/materialize.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(materializeScript);
    } else if (req.url === '/js/productList.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(productListScript);
    } else if (req.url === '/js/productLanding.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(productLandingScript);
    } else if (req.url === '/css/style.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(style);
    } else if (req.url === '/css/materialize.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(materializeStyle);
    } else if (req.url === '/css/productsList.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(productListStyle);
    } else if (req.url === '/assets/images/pexels-artem-beliaikin-994517.jpg') {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(image_1);
    } else if (req.url === '/assets/images/pexels-artem-beliaikin-1078958.jpg') {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(image_2);
    } else if (req.url === '/assets/images/pexels-karol-d-325153.jpg') {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(image_3);
    } else if (req.url === '/assets/images/pexels-kenneth-gorzal-surillo-5157291.jpg') {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(image_4);
    } else if (req.url === '/assets/images/pexels-sam-lion-5709614.jpg') {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(image_5);
    } else if (req.url === '/assets/data.json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
    }

    res.end();
});

server.listen(5000);

console.log(`http://localhost:${5000}`);