//path
gdk.updatePath.runTime = __filename;

gdk.runTime = {};
gdk.runTime.help = function(){
    console.log('指令集');
    for(var key in gdk.runTime){
        console.log(key)
    }
};
//reload--namedFile
gdk.runTime.update = function(fileKey){
    gdk.update.file(fileKey);
};
//reload--file
gdk.runTime.upfile = function(filePath){
    gdk.update(filePath);
};
//eval
gdk.runTime.bash = function(bash){
    try {
        eval ( bash );
    }catch(err){
        console.log(err);
    }
};