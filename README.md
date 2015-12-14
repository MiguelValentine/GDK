# gdk

gdk is a global based framework for node.

## Installation

```bash
$ npm install gdk
```

## Features

  * No export And require.
  * NO third-module.
  * Micro enough.
  * Flat.
  * Support command.
  * Support Cluster Mode.
  * Locked global error,never shut down.
  
## Docs & Community

  * http://creativision.cn
  * http://guapijs.com
  * http://guapijs.cn
  
## Quick Start

  No.GDK dose not support quick start.And I will not provide a generator.
  
  I don't think less is best.I can guide you to make your our service different with anyone.
  
  At First make sure that your env is in your project and you npm installed gdk.
  
  You can download [Learning Project](http://creativision.cn/project.tar.gz).
  
  1.Create bin File to guide - bin/start.js
  
  ```node
  require('gdk')
  
  var baseDir  = __dirname;
  gdk.load(gdk.c.path.join(baseDir,'../config'));
  
  gdk.boot();
  
  gdk.load(gdk.c.path.join(baseDir,'../http'));
  
  gdk.cluster(function(){
      gdk.http.boot();
  });
  ```
  
  2.Create config File - config/index.js
  
  ```node
  var baseFile = __filename;
  gdk.updatePath.config = baseFile;
  
  gdk.config.Mcores = true;
  gdk.config.errLog = gdk.c.path.join(__dirname,'../err.log');
  gdk.config.port = 3000;
  ```
  
  3.Create http base - http/index.js
  
  ```node
  gdk.updatePath.http = __filename;
  gdk.http = {};
  
  gdk.load(gdk.c.path.join(__dirname,'./router'));
  gdk.load(gdk.c.path.join(__dirname,'./flow'));
  gdk.load(gdk.c.path.join(__dirname,'./instance'));
  ```
  
  4.Create flow file - http/flow/index.js
  
  ```node
  gdk.http.flow = function(req,res){
    if(gdk.http.router[gdk.c.url.parse(req.url).path]){
      gdk.http.router[gdk.c.url.parse(req.url).path](req,res);
    }else{
      res.end();
    }
  }
  ```
  
  5.Create router file - http/router/index.js
  
  ```node
  gdk.http.router = {};
  
  gdk.http.router['/'] = function(req,res){
    res.end('Hello World!');
  }
  ```
  
  6.Create instance file - http/instance/index.js
  
  ```node
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
  ```
  
  7.Run
  
  ```bash
  node bin/start.js
  ```