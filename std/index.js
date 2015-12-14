var readable = process.stdin;

if(gdk.config.Mcores){
    if (gdk.c.cluster.isMaster) {
        bootStdin();
    }
}else{
    bootStdin();
}

function bootStdin (){
    readable.on('data', function (chunk) {
        var bash = (chunk.toString()).substr(0, (chunk.toString()).length - 1);
        functionFac(bash);
    });
}

function functionFac(bash){
    var commons = bash.split('---');
    var len = commons.length;
    if(commons[0] == ''){
        return;
    }
    if(len == 1){
        if(gdk.config.Mcores){
            gdk.coreCross({bash:commons[0]});
        }else{
            gdk.coreAction({bash:commons[0]});
        }
    }
    if(len == 2){
        if(gdk.config.Mcores){
            gdk.coreCross({bash:commons[0],arg:commons[1]});
        }else{
            gdk.coreAction({bash:commons[0],arg:commons[1]});
        }
    }
}