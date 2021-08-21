const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser)

server.get('/users', (req, res) => {
  if (req.method === 'GET') {
      let { payload } = req.body;
      let user = router.db.get('users').value(e => e.email.include(payload.email) && e.password.include(payload.password));
      res.jsonp(user)
  }
});

server.use(router);
server.listen(port, () => {console.log('JSON Server is running!')});