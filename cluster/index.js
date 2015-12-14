gdk.cluster = function(cb){
    if(gdk.config.Mcores){
        if(gdk.c.cluster.isMaster){
            gdk.c.cluster.on('exit',function(){
                setTimeout(function(){
                    gdk.c.cluster.fork();
                },3000);
            });
            for (var i = 0;i < gdk.c.os.cpus().length;i++){
                gdk.c.cluster.fork();
            }
            Object.keys(gdk.c.cluster.workers).forEach(function(id){
                gdk.c.cluster.workers[id].on('message',function(message){
                    if(message.Master){
                        gdk.coreAction(message);
                    }else{
                        gdk.coreCross(message);
                    }
                });
            });
        }else if(gdk.c.cluster.isWorker){
            process.on('message',function(message){
                gdk.coreAction(message);
            });
            cb();
        }
    }else{
        process.send = function(message){
            gdk.coreAction(message);
        };
        cb();
    }
};

gdk.coreCross = function(message){
    for (var id in gdk.c.cluster.workers){
        var worker = gdk.c.cluster.workers[id];
        worker.send(message);
    }
};

gdk.coreAction = function(message){
    var key = message.bash;
    var arg = message.arg || null;
    if(gdk.runTime[key]){
        gdk.runTime[key](arg);
    }
};