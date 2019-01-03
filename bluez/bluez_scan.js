const Bluez = require('bluez');
 
const bluetooth = new Bluez();
 
// Register callback for new devices
bluetooth.on('device', async (address, props) => {
    
    console.log("Found new Device " + address + " " + props.Name);
    if(props.Name == "Beoplay E8"){
        var adapter_tmp = bluetooth.getAdapter('hci0');
        console.log(props);
        var device = bluetooth.getDevice(address);
        adapter_tmp.RemoveDevice("device");
    }
    
});
 

// Initialize bluetooth interface
bluetooth.init().then(async ()=>{
    // listen on first bluetooth adapter
    var adapter = await bluetooth.getAdapter('hci0');

    await adapter.StartDiscovery();
    console.log("Discovering");
});

