#phonegap-cordovaReady v.1.0.0
Bower Component for using Phonegap and check that the Phonegap api is available for use.

## How to use it
1. `bower install phonegap-cordovaReady`
2. Made sure the `cordova-*.js` script is in your `.html` file.
3. Include the `cordovaReady.js` script, and this script's dependencies are included in your app.
4. All calls to the api cordova must be performed as follows:
	
	//Example
	
	cordovaReady(navigator.connection.type,callbackErrorNoCordova);

	if not available Cordova api execute callbackErrorNoCordova passed to function;

	Timeout default to wait cordova 'deviceReady' event is set to 5 sec (5000 ms). You can pass a argument to the function to set a custom timeout:

	//Example timeout set to 1 sec
	
	cordovaReady(navigator.connection.type,callbackErrorNoCordova,1000);

## How works

The purpose of the package is delaying the use of cordova after app initialization and decouple the use of cordova in a webapp.

For this when app is initialized, the package checks if cordova is avaliable before use it. If cordova not be available, exists a timeout to process initialization cordova. After the time has ended and cordova is not initialized, an error callback parameter passed by user is executed to manage and control the error.

## License
MIT



