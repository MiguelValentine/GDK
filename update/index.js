gdk.updatePath = {};
gdk.update = function(filePath){
    gdk.load(filePath);
};
gdk.update.file = function(fileKey){
    var filePath = gdk.updatePath[fileKey];
    gdk.update(filePath);
};