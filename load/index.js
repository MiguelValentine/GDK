gdk.load = function(path){
    if(require.resolve(path)){
        delete require.cache[require.resolve(path)];
        require(path);
    }
};