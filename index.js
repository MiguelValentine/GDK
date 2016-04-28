global.gdk = Object.create(null);


//guide-status
//default-config
require('./config');

//hot-require
require('./load');

//hot-update
require('./update');

//common
require('./common');

//lib
require('./lib');



//boot-status
gdk.boot = function(){
    //runtime
    gdk.load(gdk.c.path.join(__dirname,'./runtime'));
    //mcores
    gdk.load(gdk.c.path.join(__dirname,'./cluster'));
    //stdin
    gdk.load(gdk.c.path.join(__dirname,'./std'));
    //errParse
    gdk.load(gdk.c.path.join(__dirname,'./err'));
};
