var template = [bin, config, http, flow, router, instance];

!function main (){
  var fs = require('fs');
  template.forEach(function (fn) {

    var codeStringArr = fn.toString().split('\r\n');
    var codeContent   = codeStringArr.slice(2 , -1).join('\r\n');
    var codeUrl       = codeStringArr[1].split('\'')[1];
    var codeDir       = codeUrl.split('/')[0];

    // mkdir
    if(!fs.existsSync(codeDir)) fs.mkdirSync(codeDir);
    // write template
    fs.writeFileSync(codeUrl, codeContent, 'utf8');

  })
}()


/* template begin */

function bin() {
  var Url = 'bin/start.js'; // template-url
  /* code Content */
  require('gdk')

  var baseDir  = __dirname;
  gdk.load(gdk.c.path.join(baseDir,'../config'));

  gdk.boot();

  gdk.load(gdk.c.path.join(baseDir,'../http'));

  gdk.cluster(function(){
      gdk.http.boot();
  });
};

function config() {
  var Url = 'config/index.js';
  /* code Content */
  var baseFile = __filename;
  gdk.updatePath.config = baseFile;

  gdk.config.Mcores = true;
  gdk.config.errLog = gdk.c.path.join(__dirname,'../err.log');
  gdk.config.port = 3000;
};

function http() {
  var Url = 'http/index.js'; // template-url
  /* code Content */
  gdk.updatePath.http = __filename;
  gdk.http = {};

  gdk.load(gdk.c.path.join(__dirname,'./router'));
  gdk.load(gdk.c.path.join(__dirname,'./flow'));
  gdk.load(gdk.c.path.join(__dirname,'./instance'));
};

function flow() {
  var Url = 'flow/index.js'; // template-url
  /* code Content */
  gdk.http.flow = function(req,res){
    if(gdk.http.router[gdk.c.url.parse(req.url).path]){
      gdk.http.router[gdk.c.url.parse(req.url).path](req,res);
    }else{
      res.end();
    }
  }
};

function router() {
  var Url = 'router/index.js'; // template-url
  /* code Content */
  gdk.http.router = {};

  gdk.http.router['/'] = function(req,res){
    res.end('Hello World!');
  }
};

function instance() {
  var Url = 'instance/index.js'; // template-url
  /* code Content */
  gdk.http.server = function(req,res){
      gdk.http.flow(req,res);
  };

  gdk.http.boot = function(){
      var server = gdk.c.http.createServer(gdk.http.server);
      server.on('error',function(err){
          gdk.errCatch('server err',err);
      });
      server.listen(gdk.config.port);
  };
};

/* template end */
