var CRLF = '\r\n';

gdk.errCatch = function(reson,main){
    var data = "ERROR:" + reson+" "+new Date();
    data += " TIME:" + new Date();
    data += CRLF;
    data += main.stack;
    data += CRLF;
    data += CRLF;
    data += CRLF;
    gdk.c.fs.appendFile(gdk.config.errLog,data);
    console.log(reson);
    console.log(main.stack);
};

process.on('uncaughtException',function(err){
    gdk.errCatch('未定义的错误',err);
});