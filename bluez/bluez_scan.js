const Bluez = require('bluez');
 
const bluetooth = new Bluez();
 
// Register callback for new devices
bluetooth.on('device', async (address, props) => {
    
    console.log("Found new Device " + address + " " + props.Name);
    if(props.Name == "Battery"){
        console.log(props);
    }
    
});
 

// Initialize bluetooth interface
bluetooth.init().then(async ()=>{
    // listen on first bluetooth adapter
    var adapter = await bluetooth.getAdapter('hci0');
    //await adapter.StartDiscovery();
    adapter.RemoveDevice("50:B7:3D:C9:2F:6F");
    console.log("Discovering");
});

