const express = require("express");
const makeStoppable = require("stoppable");
const http = require("http");
const path = require("path");

const routes = require('./routes');
const doneRoutes = require('./routes/done');

const app = express();
const server = makeStoppable(http.createServer(app));
const port = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true })); // Form verilerini almak için urlencoded parser'ı kullanın
app.use(express.json()); // JSON verilerini almak için json parser'ı kullanın

app.use('/', routes);
app.use('/done', doneRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = () => {
  const stopServer = () => {
    return new Promise((resolve) => {
      server.stop(resolve);
    });
  };

  return new Promise((resolve) => {
    server.listen(3000, () => {
      console.log('Express server is listening on http://localhost:3000');
      resolve(stopServer);
    });
  });
};
