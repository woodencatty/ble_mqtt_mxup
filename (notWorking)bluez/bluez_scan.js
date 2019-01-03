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
    var remove = '51:71:F8:12:30:26';
    console.log(typeof remove);
    // listen on first bluetooth adapter
    var adapter = await bluetooth.getAdapter('hci0');
    await adapter.RemoveDevice(remove);

    await adapter.StartDiscovery();
    console.log("Discovering");
});

