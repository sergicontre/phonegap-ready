//Flag to ask if Phonegap is ready
function setFlagPhonegap(){
  window.isPhonegapReady = true;
}
// Wait for device API libraries to load
document.addEventListener("deviceready",setFlagPhonegap,false);

function cordovaReady (fn,callbackCordovaNoReady,timeout){
  //5 seconds timeout for default if not defined by the user.
  var timeoutDeviceReady = 5000;
  if(timeout){
    timeoutDeviceReady = timeout;
  }  
  //Check the flag if Phonegap and plugins are ready.
  if (window.isPhonegapReady) {
    console.log('Cordova is ready for use! :)');
    return fn.apply(this,arguments);
  } 
  else {
    var mainArgs = arguments;
    //Flag to set if phonegap is ready if 'devideready' is fired.
    var ready = false;
    //Callback to apply function is phonegap is fired.
    var applyCordovaFunction = function () {
      //Set flag to true because phonegap fire 'deviceready'
      ready = true;
      return fn.apply(this,mainArgs);
    };
    
    //Remove listener 'deviceready' with handler to set isPhonegapReady
    document.removeEventListener('deviceready', setFlagPhonegap ,false);
    //Listener with handler to apply phonegap function
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


