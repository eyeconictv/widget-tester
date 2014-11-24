module.exports = function () {
  var os=require("os");
  var ifaces=os.networkInterfaces();
  for (var dev in ifaces) {
    for (var index in ifaces[dev]) {
      if (ifaces[dev][index].family === "IPv4") {
        if(ifaces[dev][index].address !== "127.0.0.1") {
          return ifaces[dev][index].address;
        }
      }
    }
  }
};
