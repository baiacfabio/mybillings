define(function() {
	var $ = Dom7;

	function generateUUID(){
		var HEX_DIGITS = "0123456789abcdef";
  		var s = [];
  		for (var i = 0; i < 36; i++) {
    		s[i] = Random.choice(HEX_DIGITS);
  		}
  		s[14] = "4";
  		s[19] = HEX_DIGITS.substr((parseInt(s[19],16) & 0x3) | 0x8, 1);
  		s[8] = s[13] = s[18] = s[23] = "-";

  		var uuid = s.join("");
  		return uuid;
	}

	function getRandomInt(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return {
		generateUUID: generateUUID,
		getRandomInt: getRandomInt
	};
});