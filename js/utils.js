define(function() {
	var $ = Dom7;	


	function fraction() {
    	var bytes, length, val;    	
  		if (typeof window !== "undefined" && window.crypto &&
            window.crypto.getRandomValues) {
    		var array = new Uint32Array(1);
    		window.crypto.getRandomValues(array);
    		return array[0] * 2.3283064365386963e-10; // 2^-32
  		}
  		else {
  			val = parseInt(bytes.toString('hex'), 16);
    		return val * 2.3283064365386963e-10; // 2^-32
    		bytes = Crypto.util.randomBytes(8);
    		val = parseInt(bytes.toString('hex'), 16);
  		}
  	};
	
	function choice(arrayOrString) {
  		var index = Math.floor(fraction() * arrayOrString.length);
  		if (typeof arrayOrString === "string")
    		return arrayOrString.substr(index, 1);
  		else
    	return arrayOrString[index];
	};

	function generateGUID(){
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x7|0x8)).toString(16);
		});
		return uuid;
	}

	function generateUUID(){
		var UNMISTAKABLE_CHARS = "23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz";
  		var s = [];
  		for (var i = 0; i < 17; i++) {
    		s[i] = choice(UNMISTAKABLE_CHARS);
  		}  		

  		var uuid = s.join("");
  		return uuid;
	};

	function getRandomInt(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return {
		generateGUID: generateGUID,
		generateUUID: generateUUID,
		getRandomInt: getRandomInt
	};
});