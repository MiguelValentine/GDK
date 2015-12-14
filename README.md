# GDK

GDK is a global based framework for node.

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
  
## Docs & Community [[all building]]

  * http://creativision.cn
  * http://guapijs.com
  * http://guapijs.cn
  
## Quick Start

  No.GDK dose not support quick start.And I will not provide a generator.
  
  I don't think less is best.I can guide you to make your our service different with anyone.
  
  At First make sure that your env is in your project and you npm installed gdk.
  
  You can download [Learning Project](http://fs.creativision.cn/project.tar.gz).
  
  1.Create bin File to guide - bin/start.js
  
  ```
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
  
  ```
  var baseFile = __filename;
  gdk.updatePath.config = baseFile;
  
  gdk.config.Mcores = true;
  gdk.config.errLog = gdk.c.path.join(__dirname,'../err.log');
  gdk.config.port = 3000;
  ```
  
  3.Create http base - http/index.js
  
  ```
  gdk.updatePath.http = __filename;
  gdk.http = {};
  
  gdk.load(gdk.c.path.join(__dirname,'./router'));
  gdk.load(gdk.c.path.join(__dirname,'./flow'));
  gdk.load(gdk.c.path.join(__dirname,'./instance'));
  ```
  
  4.Create flow file - http/flow/index.js
  
  ```
  gdk.http.flow = function(req,res){
    if(gdk.http.router[gdk.c.url.parse(req.url).path]){
      gdk.http.router[gdk.c.url.parse(req.url).path](req,res);
    }else{
      res.end();
    }
  }
  ```
  
  5.Create router file - http/router/index.js
  
  ```
  gdk.http.router = {};
  
  gdk.http.router['/'] = function(req,res){
    res.end('Hello World!');
  }
  ```
  
  6.Create instance file - http/instance/index.js
  
  ```
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
  
## Command

### 1.bash command
  
  Example:
  ```bash
  bash---console.log(gdk.config)
  ```
  
### 2.Hot-update command

  Example:
  ```bash
  update---config
  ```

  Example2:
  ```bash
  upfile---/node/http/index.js
  ```
  
### 3.Your command

  Example:
  ```
  gdk.runTime.print = function(info){
    console.log(info)
  }
  ```
  
  ```bash
  print---here is a test
  ```
  
## Cluster message I/O

  In gdk Cluster mode.gdk.cluster(cb).cb will always run on workers.

  Workers can use process.send to call a runtime function in all workers or master.

  Example:
  ```
  gdk.runTime.print = function(a,b){
    console.log(a+b)
  }
  
  process.send({bash:'print',arg:{'hello',' world'}});
  ```
  
  Example:
  ```
  gdk.runTime.MainCore = function(a,b){
    console.log(a+b)
  }
    
  process.send({bash:'MainCore',arg:{'hello',' world'},Master:true});
  ```