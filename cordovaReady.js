//Flag to ask if Cordova is ready
function setFlagCordova(){
  window.isCordovaReady = true;
}
// Wait for device API libraries to load
document.addEventListener("deviceready",setFlagCordova,false);

function cordovaReady (fn,callbackCordovaNoReady,timeout){
  //5 seconds timeout for default if not defined by the user.
  var timeoutDeviceReady = 5000;
  if(timeout){
    timeoutDeviceReady = timeout;
  }  
  //Check the flag if Cordova and plugins are ready.
  if (window.isCordovaReady) {
    console.log('Cordova is ready for use! :)');
    return fn.apply(this,arguments);
  } 
  else {
    var mainArgs = arguments;
    //Flag to set if Cordova is ready if 'devideready' is fired.
    var ready = false;
    //Callback to apply function is Cordova is fired.
    var applyCordovaFunction = function () {
      //Set flag to true because Cordova fire 'deviceready'
      ready = true;
      return fn.apply(this,mainArgs);
    };
    
    //Remove listener 'deviceready' with handler to set isCordovaReady
    document.removeEventListener('deviceready', setFlagCordova ,false);
    //Listener with handler to apply Cordova function
    document.addEventListener('deviceready', applyCordovaFunction, false);
    //If timeout end evaluate if callback for handle no ready is defined to apply.
    setTimeout(function() {
        document.removeEventListener('deviceready', applyCordovaFunction ,false);
        console.log('Cordova is not ready...It is loaded?');
        if(!ready && callbackCordovaNoReady){
              callbackCordovaNoReady();        
        }     
    }, timeoutDeviceReady);
  }
}


