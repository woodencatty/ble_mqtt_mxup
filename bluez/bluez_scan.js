const Bluez = require('bluez');
 
const bluetooth = new Bluez();
 
// Register callback for new devices
bluetooth.on('device', async (address, props) => {
    console.log("Found new Device " + address + " " + props.Name);
    if(props.Name == "Battery"){
        console.log(props);}
});
 
// Initialize bluetooth interface
bluetooth.init().then(async ()=>{
    // listen on first bluetooth adapter
    const adapter = await bluetooth.getAdapter('hci0');
    //await adapter.RemoveDevice("*");
    await adapter.StartDiscovery();
    console.log("Discovering");
});