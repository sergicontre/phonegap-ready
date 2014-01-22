
function setFlagPhonegap(){
	window.isPhonegapReady = true;
}
// Wait for device API libraries to load
document.addEventListener("deviceready",setFlagPhonegap,false);

function cordovaReady (fn,callbackCordovaNoReady,timeout){
              //5 seconds for default.
              var timeoutDeviceReady = 5000;
              if(timeout){
                timeoutDeviceReady = timeout;
              }  

              if (window.isPhonegapReady) {
                console.log('Cordova is ready for use! :)');
                return fn.apply(this,arguments);
              } else {



                var mainArgs = arguments;
                var applyCordovaFunction = function () {
                  return fn.apply(this,mainArgs);
                };
                document.removeEventListener('deviceready', setFlagPhonegap ,false);
                document.addEventListener('deviceready', applyCordovaFunction, false);
                setTimeout(function() {
        				document.removeEventListener('deviceready', applyCordovaFunction ,false);
        				                    console.log('Cordova is not ready...It is loaded?');
        				                    if (callbackCordovaNoReady) {
        				                        callbackCordovaNoReady();        
        				                    } 	
        				}, timeoutDeviceReady);
              }
}


