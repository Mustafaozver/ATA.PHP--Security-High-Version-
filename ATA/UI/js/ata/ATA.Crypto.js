////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Crypto Library Version 1.0
	
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");

ATA.Crypto = {
	__:[
		0x7C, 0x63, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0xA8, 0xFE, 0xD7, 0xAB, 0x76,
		0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
		0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
		0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
		0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
		0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
		0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0x2B,
		0x51, 0xA3, 0x40, 0x95, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
		0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
		0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
		0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x8F, 0x91, 0xE4, 0x79,
		0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
		0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
		0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
		0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
		0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16, 0
    ],
	__PASS:"2.%-£_#!|{HaticE/<3&;MusTaFA}$",
	Encryption:function(string,password,power=1){
		if (!password) password = this.__PASS;
		var P2Code = this.Methods.SHA256(password).ToAscii().GetCode();
		var PowerObject1 = {};
		var PowerObject2 = {};
		for (;power>0;power--) {
			PowerObject1[this.RandomNumberGenerator.GenerateLetter(this.RandomNumberGenerator.GenerateRange(2,8)) + power] = this.RandomNumberGenerator.GenerateLetter(this.RandomNumberGenerator.GenerateRange(2,8));
			PowerObject2[this.RandomNumberGenerator.GenerateLetter(this.RandomNumberGenerator.GenerateRange(2,8)) + power] = this.RandomNumberGenerator.GenerateLetter(this.RandomNumberGenerator.GenerateRange(2,8));
		}
		var SCode = (String.fromCharCode(this.__[2])+JSON.stringify({
			A____:PowerObject1,
			Z____:PowerObject2,
			Data:string,
			Password:password,
			Method:"ATAEncryption"
		})+String.fromCharCode(this.__[1])).GetCode();
		var PCode = password.GetCode();
		var SLen = SCode.length;
		var PLen = PCode.length;
		var P2Len = P2Code.length;
		var arr = [];
		var i;
		var temp = this.__[P2Code[0]];
		for (i=SLen-1;i>=0;i--) {
			var code = (this.__[0xFF
					^ PCode[i%PLen]
					^ P2Code[i%P2Len]
					^ temp]
				^ PCode[(PLen-1-i)%PLen]) & 0xFF;
			arr.push(code);
			temp = this.__[temp ^ PCode[i%PLen] ^ PCode[(PLen-1-i)%PLen] & 0xFF];
		}
		var res = "";
		for (i=0;i<SLen;i++) {
			var code = (this.__[SCode[i]
					^ PCode[(PLen-1-i)%PLen]
					^ arr[i]
					^ temp]
				^ PCode[i%PLen]
				^ P2Code[i%P2Len]) & 0xFF;
			res += String.fromCharCode(code);
			temp = this.__[temp ^ PCode[i%PLen] ^ PCode[(PLen-1-i)%PLen] & 0xFF];
		}
		return res;
	},
	Decryption:function(string,password){
		if (!password) password = this.__PASS;
		var P2Code = this.Methods.SHA256(password).ToAscii().GetCode();
		var SCode = string.GetCode();
		var PCode = password.GetCode();
		var SLen = SCode.length;
		var PLen = PCode.length;
		var P2Len = P2Code.length;
		var arr = [];
		var i;
		var temp = this.__[P2Code[0]];
		var res = "";
		for (i=SLen-1;i>=0;i--) {
			var code = (this.__[0xFF
					^ PCode[i%PLen]
					^ P2Code[i%P2Len]
					^ temp]
				^ PCode[(PLen-1-i)%PLen]) & 0xFF;
			arr.push(code);
			temp = this.__[temp ^ PCode[i%PLen] ^ PCode[(PLen-1-i)%PLen] & 0xFF];
		}
		for (i=0;i<SLen;i++) {
			var code = (this.__.indexOf(SCode[i]
					^ PCode[i%PLen]
					^ P2Code[i%P2Len])
				^ temp
				^ arr[i]
				^ PCode[(PLen-1-i)%PLen]) & 0xFF;
			res += String.fromCharCode(code);
			temp = this.__[temp ^ PCode[i%PLen] ^ PCode[(PLen-1-i)%PLen] & 0xFF];
		}
		try {
			if (res.charAt(1) != "{") throw new Error("No solution");
			var res = JSON.parse(res.substring(1,res.length-1));
			if (!res.Password || res.Password != password) throw new Error("Password can not be verified");
			if (!res.Method || res.Method != "ATAEncryption") throw new Error("Method can not be verified");
			return res.Data;
		} catch (e) {
			return {
				Data:res,
				Password:"",
				Succes:false,
				Type:"",
				Method:"",
				ErrorObject:e
			};
		}
		return false;
	},
	Methods:{
		SHA256:function(string) {
			var chrsz = 8;
			function safe_add (x, y) {
				var lsw = (x & 0xFFFF) + (y & 0xFFFF);
				var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
				return (msw << 16) | (lsw & 0xFFFF);
			}
			function S (X, n) {return ( X >>> n ) | (X << (32 - n));}
			function R (X, n) {return ( X >>> n );}
			function Ch(x, y, z) {return ((x & y) ^ ((~x) & z));}
			function Maj(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));}
			function Sigma0256(x) {return (S(x, 2) ^ S(x, 13) ^ S(x, 22));}
			function Sigma1256(x) {return (S(x, 6) ^ S(x, 11) ^ S(x, 25));}
			function Gamma0256(x) {return (S(x, 7) ^ S(x, 18) ^ R(x, 3));}
			function Gamma1256(x) {return (S(x, 17) ^ S(x, 19) ^ R(x, 10));}
			function core_sha256 (m, l) {
				var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
				var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
				var W = new Array(64);
				var a, b, c, d, e, f, g, h, i, j;
				var T1, T2;
				m[l >> 5] |= 0x80 << (24 - l % 32);
				m[((l + 64 >> 9) << 4) + 15] = l;
				for ( var i = 0; i<m.length; i+=16 ) {
					a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
					for ( var j = 0; j<64; j++) {
						if (j < 16) W[j] = m[j + i];
						else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
						T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
						T2 = safe_add(Sigma0256(a), Maj(a, b, c));
						h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
					}
					HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]); HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
				}
				return HASH;
			}
			function str2binb (str) {
				var bin = Array();
				var mask = (1 << chrsz) - 1;
				for(var i = 0; i < str.length * chrsz; i += chrsz) bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
				return bin;
			}
			function binb2hex (binarray) {
				var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
				var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
				var str = "";
				for (var i = 0; i < binarray.length * 4; i++) {
					str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) + hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
				}
				return str;
			}
			function hex_sha256(s){return binb2hex(core_sha256(str2binb(s),s.length * chrsz));}
			return binb2hex(core_sha256(str2binb(string), string.length * chrsz));
		},
		MD5:function(string) {
			function RotateLeft(lValue, iShiftBits) {
				return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
			}
			function AddUnsigned(lX,lY) {
				var lX4,lY4,lX8,lY8,lResult;
				lX8 = (lX & 0x80000000);
				lY8 = (lY & 0x80000000);
				lX4 = (lX & 0x40000000);
				lY4 = (lY & 0x40000000);
				lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
				if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
				if (lX4 | lY4) {
					if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
					else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				} else return (lResult ^ lX8 ^ lY8);
			}
			function F(x,y,z){return (x & y) | ((~x) & z)}
			function G(x,y,z){return (x & z) | (y & (~z))}
			function H(x,y,z){return (x ^ y ^ z)}
			function I(x,y,z){return (y ^ (x | (~z)))}
			function FF(a,b,c,d,x,s,ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};
			function GG(a,b,c,d,x,s,ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};
			function HH(a,b,c,d,x,s,ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};
			function II(a,b,c,d,x,s,ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};
			function ConvertToWordArray(string) {
				var lWordCount;
				var lMessageLength = string.length;
				var lNumberOfWords_temp1=lMessageLength + 8;
				var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
				var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
				var lWordArray=Array(lNumberOfWords-1);
				var lBytePosition = 0;
				var lByteCount = 0;
				while (lByteCount < lMessageLength){
					lWordCount = (lByteCount-(lByteCount % 4))/4;
					lBytePosition = (lByteCount % 4)*8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
					lByteCount++;
				}
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
				lWordArray[lNumberOfWords-2] = lMessageLength<<3;
				lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
				return lWordArray;
			};
			function WordToHex(lValue) {
				var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
				for (lCount = 0;lCount<=3;lCount++) {
					lByte = (lValue>>>(lCount*8)) & 255;
					WordToHexValue_temp = "0" + lByte.toString(16);
					WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
				}
				return WordToHexValue;
			};
			var x=Array();
			var k,AA,BB,CC,DD,a,b,c,d;
			var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
			var S21 = 5, S22 = 9 , S23 = 14, S24 = 20;
			var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
			var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
			x = ConvertToWordArray(string);
			a = 0x67452301;
			b = 0xEFCDAB89;
			c = 0x98BADCFE;
			d = 0x10325476;
			for (k=0;k<x.length;k+=16) {
				AA = a;
				BB = b;
				CC = c;
				DD = d;
				a = FF(a,b,c,d,x[k+0], S11,0xD76AA478);//
				d = FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
				c = FF(c,d,a,b,x[k+2], S13,0x242070DB);
				b = FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
				a = FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);//
				d = FF(d,a,b,c,x[k+5], S12,0x4787C62A);
				c = FF(c,d,a,b,x[k+6], S13,0xA8304613);
				b = FF(b,c,d,a,x[k+7], S14,0xFD469501);
				a = FF(a,b,c,d,x[k+8], S11,0x698098D8);//
				d = FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
				c = FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
				b = FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
				a = FF(a,b,c,d,x[k+12],S11,0x6B901122);//
				d = FF(d,a,b,c,x[k+13],S12,0xFD987193);
				c = FF(c,d,a,b,x[k+14],S13,0xA679438E);
				b = FF(b,c,d,a,x[k+15],S14,0x49B40821);
				a = GG(a,b,c,d,x[k+1], S21,0xF61E2562);////
				d = GG(d,a,b,c,x[k+6], S22,0xC040B340);
				c = GG(c,d,a,b,x[k+11],S23,0x265E5A51);
				b = GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
				a = GG(a,b,c,d,x[k+5], S21,0xD62F105D);//
				d = GG(d,a,b,c,x[k+10],S22,0x2441453);
				c = GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
				b = GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
				a = GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);//
				d = GG(d,a,b,c,x[k+14],S22,0xC33707D6);
				c = GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
				b = GG(b,c,d,a,x[k+8], S24,0x455A14ED);
				a = GG(a,b,c,d,x[k+13],S21,0xA9E3E905);//
				d = GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
				c = GG(c,d,a,b,x[k+7], S23,0x676F02D9);
				b = GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
				a = HH(a,b,c,d,x[k+5], S31,0xFFFA3942);////
				d = HH(d,a,b,c,x[k+8], S32,0x8771F681);
				c = HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
				b = HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
				a = HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);//
				d = HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
				c = HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
				b = HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
				a = HH(a,b,c,d,x[k+13],S31,0x289B7EC6);//
				d = HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
				c = HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
				b = HH(b,c,d,a,x[k+6], S34,0x4881D05);
				a = HH(a,b,c,d,x[k+9], S31,0xD9D4D039);//
				d = HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
				c = HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
				b = HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
				a = II(a,b,c,d,x[k+0], S41,0xF4292244);////
				d = II(d,a,b,c,x[k+7], S42,0x432AFF97);
				c = II(c,d,a,b,x[k+14],S43,0xAB9423A7);
				b = II(b,c,d,a,x[k+5], S44,0xFC93A039);
				a = II(a,b,c,d,x[k+12],S41,0x655B59C3);//
				d = II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
				c =	II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
				b = II(b,c,d,a,x[k+1], S44,0x85845DD1);
				a = II(a,b,c,d,x[k+8], S41,0x6FA87E4F);//
				d = II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
				c = II(c,d,a,b,x[k+6], S43,0xA3014314);
				b = II(b,c,d,a,x[k+13],S44,0x4E0811A1);
				a = II(a,b,c,d,x[k+4], S41,0xF7537E82);//
				d = II(d,a,b,c,x[k+11],S42,0xBD3AF235);
				c = II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
				b = II(b,c,d,a,x[k+9], S44,0xEB86D391);
				a = AddUnsigned(a,AA);
				b = AddUnsigned(b,BB);
				c = AddUnsigned(c,CC);
				d = AddUnsigned(d,DD);
			}
			var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
			return temp.toLowerCase();
		}
	},
	Session:{
		C:0,
		Create:function(name,values){
			var data = JSON.stringify(Object.assign({_:this.C},values));
			var CR = ATA.Crypto.Methods.SHA256(data);
			ATA.Register.Set(CR,data);
			ATA.Register.Set(name,CR);
			return CR;
		},
		Verify:function(name,CR){
			if (ATA.Register.Get(name) != CR || !ATA.Register.Get(CR)) return false;
			return JSON.parse(ATA.Register.Get(CR));
		}
	},
	RandomNumberGenerator:{
		S:1,
		Parameters:[0x67452301,0xEB86D391,0xF4D50D87,0xC040B340],
		Generate:function() {
			var X = this.Parameters[0];
			X ^= X << 13;
			X ^= X >> 17;
			X ^= X << 5;
			X = (this.Parameters[0]*X + this.Parameters[1] + this.S + (this.S = (new Date()).getTime())) % this.Parameters[2];
			this.Parameters[0] = X;
			if (X < 0) X += this.Parameters[2];
			return X/this.Parameters[2];
		},
		GenerateRange:function(min,max,toint=true){
			if (toint) return Math.floor(this.Generate()*(max - min + 1) + min);
			else return this.Generate()*(max - min) + min;
		},
		GenerateHex:function(n=1){
			var text = "0x";
			for (;n>0;n--) text += String.HEX[Math.floor(this.Generate()*16)] + String.HEX[Math.floor(this.Generate()*16)];
			return text;
		},
		GenerateLetter:function(n=1){
			var text = "";
			for (;n>0;n--) text += String.LETTERS[Math.floor(this.Generate()*String.LETTERS.length)];
			return text;
		}
	}
};