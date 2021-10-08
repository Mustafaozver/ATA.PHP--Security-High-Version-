////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Artificial Intelligence Library Version 3.01
	ZekATA Project
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");

ATA.ZekATA = {
	GoldenRate:Number.Golden,
	Methods:{},
	Neurons:[],
	Maps:{},
	Wires:{},
	Registers:{},
	GetMethods:function() {
		var temp = [];
		for (var key in this.Methods) temp.push(key);
		return temp;
	},
	Logicial:{
		And:function(vals) {
			var temp = 0;
			for (var i=0;i<vals.length;i++) temp += Math.pow(vals[i],1/vals.length);
			temp /= vals.length;
			return Math.pow(temp,vals.length);
		},
		Or:function(vals) {
			var temp = [];
			for (var i=0;i<vals.length;i++) temp.push(this.Not(vals[i]));
			return this.Not(this.And(temp));
		},
		ExOr:function(val1, val2) {
			var deg = val1 - val2;
			return deg>0?deg:-deg;
		},
		Not:function(val1) {
			return 1 - val1;
		},
	},
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Prototypes

// Pidial
var Pidial = function(n) {
	this._datas = [];
	this._rates = [];
	for (;n>0;n--) {
		this._datas.push(0);
		this._rates.push(0.5);
	}
};

Pidial.prototype.F = function(x) {
	if (this._datas.length == 0) return 0;
	this._datas[0] = this.stepFunction(x-this._datas[this._datas.length-1],this._datas[0],0);
	for (var i=1;i<this._datas.length;i++) this._datas[i] = this.stepFunction(this._datas[i-1],this._datas[i],i);
	return this._datas[this._datas.length-1];
};

Pidial.prototype.stepFunction = function(p1,p2,i) {
	return p1*this._rates[i] + p2*(1-this._rates[i]);
};

Pidial.prototype.setDegree = function(n) {
	if (this._datas.length > n) this._datas.length = n;
	else for (var i=this._datas.length;i<n;i++) {
		this._datas.push(0);
		this._rates.push(1);
	};
};

Pidial.prototype.setDatas = function(val) {
	for (var i=0;i<this._datas.length;i++) this._datas[i] = val;
};

Pidial.prototype.setRate = function(i,r) {
	this._rates[i] = r;
};

Pidial.prototype.get = function() {
	return this._datas[this._datas.length-1];
};

Pidial.prototype.toString = function() {
	return this.valueOf();
};

Pidial.prototype.valueOf = function() {
	return this.get();
};

// Modelizations Methods
ATA.ZekATA.Methods["TIME"] = {
	Setup: function() {},
	F: function() {
		var A = this.Params[0].get()*this.Params[2].get();
		var B = this.Params[1].get()*this.Params[2].get();
		var C = this.Params[3].get()*this.Params[2].get();
		this.Outputs[0].set(A*((new Date()).getTime()%B) + C);
	},
	H: function(){return},
	Params: 4,
	Inputs: 0,
	Outputs: 1
	
};

ATA.ZekATA.Methods["SUM"] = {
	Setup: function() {},
	F: function() {
		var A = this.Params[0].get()*this.Params[2].get();
		var B = this.Params[1].get()*this.Params[2].get();
		var C = this.Params[3].get()*this.Params[2].get();
		this.Outputs[0].set(A*this.Inputs[0].get() + B*this.Inputs[1].get() + C);
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get()*this.Params[2].get();
		var B = this.Params[1].get()*this.Params[2].get();
		var C = this.Params[3].get()*this.Params[2].get();
		this.Outputs[0].set(A*this.Inputs[0].get() + B*this.Inputs[1].get() + C);
		
		return [
			(R - C - B*this.Inputs[1].get())/A,
			(R - C - A*this.Inputs[0].get())/B
		];
	},
	Params: 4,
	Inputs: 2,
	Outputs: 1
};

ATA.ZekATA.Methods["MULTI"] = {
	Setup: function() {},
	F: function() {
		var A = this.Params[0].get()*this.Params[2].get();
		var B = this.Params[1].get()*this.Params[2].get();
		var C = this.Params[3].get()*this.Params[5].get();
		var D = this.Params[4].get()*this.Params[5].get();
		this.Outputs[0].set(D*(this.Inputs[0].get()**A)*(this.Inputs[1].get()**B) + C);
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get()*this.Params[2].get();
		var B = this.Params[1].get()*this.Params[2].get();
		var C = this.Params[3].get()*this.Params[5].get();
		var D = this.Params[4].get()*this.Params[5].get();
		
		return [
			((R - C)/(this.Inputs[1].get()**B))**(1/A),
			((R - C)/(this.Inputs[0].get()**A))**(1/B)
		];
	},
	Params: 6,
	Inputs: 2,
	Outputs: 1
};

ATA.ZekATA.Methods["SIN"] = {
	Setup: function() {},
	F: function () {
		var A = this.Params[0].get()*this.Params[4].get();
		var B = this.Params[1].get()*this.Params[5].get();
		var C = this.Params[2].get()*this.Params[5].get();
		var D = this.Params[3].get()*this.Params[4].get();
		this.Outputs[0].set(A*Math.sin(B*this.Inputs[0].get() + C) + D);
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get()*this.Params[4].get();
		var B = this.Params[1].get()*this.Params[5].get();
		var C = this.Params[2].get()*this.Params[5].get();
		var D = this.Params[3].get()*this.Params[4].get();
		
		return [
			(Math.asin((R - D)/A) - C)/B
		];
	},
	Params: 6,
	Inputs: 1,
	Outputs: 1
};

ATA.ZekATA.Methods["SQUARE"] = {
	Setup: function() {},
	F: function () {
		var A = this.Params[0].get()*this.Params[4].get();
		var B = this.Params[1].get()*this.Params[5].get();
		var C = this.Params[2].get()*this.Params[5].get();
		var D = this.Params[3].get()*this.Params[4].get();
		var X = B*this.Inputs[0].get() + C;
		this.Outputs[0].set(A*(((X<0)?(1+X%1):(X%1))<0.5?1:-1) + D);
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get()*this.Params[4].get();
		var B = this.Params[1].get()*this.Params[5].get();
		var C = this.Params[2].get()*this.Params[5].get();
		var D = this.Params[3].get()*this.Params[4].get();
		var X = (R/A - D);
		if (X < 0) X -= Math.floor(X);
		
		return [
			(X - C)/B
		];
	},
	Params: 6,
	Inputs: 1,
	Outputs: 1
};

ATA.ZekATA.Methods["TRIANGEL"] = {
	Setup: function() {},
	F: function () {
		var A = this.Params[0].get()*this.Params[4].get();
		var B = this.Params[1].get()*this.Params[5].get();
		var C = this.Params[2].get()*this.Params[5].get();
		var D = this.Params[3].get()*this.Params[4].get();
		var X = C + this.Inputs[0].get();
		var t = X<0?Math.abs(X%B+B):Math.abs(X%B);
		this.Outputs[0].set(2*(t<(B/2)?t:B-t)*A/B - A/2 + D);
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get()*this.Params[4].get();
		var B = this.Params[1].get()*this.Params[5].get();
		var C = this.Params[2].get()*this.Params[5].get();
		var D = this.Params[3].get()*this.Params[4].get();
		var X = (R - D + A/2)/2/A*B;
		if (X<0) X = C - X;
		else X -= C;
		return [
			X
		];
	},
	Params: 6,
	Inputs: 1,
	Outputs: 1
};

ATA.ZekATA.Methods["EXP"] = {
	Setup: function() {},
	F: function () {
		var A = this.Params[0].get();
		var B = this.Params[1].get();
		this.Outputs[0].set(A*(this.Inputs[0].get()**B));
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get();
		var B = this.Params[1].get();
		return [
			(R/A)**(1/B)
		];
	},
	Params: 2,
	Inputs: 1,
	Outputs: 1
};

ATA.ZekATA.Methods["LOG"] = {
	Setup: function() {},
	F: function () {
		var A = this.Params[0].get();
		var B = this.Params[1].get()*this.Params[3].get();
		var C = this.Params[2].get()*this.Params[3].get();
		this.Outputs[0].set(A*ATA["LOG"](B*this.Inputs[0].get(),C*this.Inputs[1].get()));
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get();
		var B = this.Params[1].get()*this.Params[3].get();
		var C = this.Params[2].get()*this.Params[3].get();
		return [
			(C*this.Inputs[1].get())**(A/R)/B,
			(B*this.Inputs[0].get())**(R/A)/C
		];
	},
	Params: 4,
	Inputs: 2,
	Outputs: 1
};

ATA.ZekATA.Methods["NOISE"] = {
	Setup: function() {
		this.TF = 0;
	},
	F: function () { // gürültü
		var A = this.Params[0].get();
		var B = this.Params[1].get();
		var C = this.Params[2].get();
		var D = this.Params[3].get();
		if (this.TF >= D) this.TF -= Math.random()*C;
		else if (this.TF < (-D)) this.TF += Math.random()*C;
		else this.TF += (Math.random()-0.5)*C;
		this.Outputs[0].set(A*this.TF + B);
	},
	H: function() {return},
	Params: 4,
	Inputs: 0,
	Outputs: 1
};

ATA.ZekATA.Methods["NOISE2"] = {
	Setup: function() {
		this.TF = {
			X:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			_i:0
		};
	},
	F: function () { // gürültü 2
		var top = 0;
		if (this.TF._i >= this.TF.X.length - 1) this.TF._i = 0;
		else this.TF._i++;
		var A = this.Params[0].get();
		var B = this.Params[1].get();
		var C = this.Params[2].get();
		var D = this.Params[3].get();
		if (this.TF.X[this.TF._i] >= D) this.TF.X[this.TF._i] -= Math.random()*C;
		else if (this.TF.X[this.TF._i] < (-D)) this.TF.X[this.TF._i] += Math.random()*C;
		else this.TF.X[this.TF._i] += (Math.random()-0.5)*C;
		for (var i=0;i<this.TF.X.length;i++) top += this.TF.X[i];
		this.Outputs[0].set(A*top + B);
	},
	H: function() {return},
	Params: 4,
	Inputs: 0,
	Outputs: 1
};

ATA.ZekATA.Methods["DERIVATIVE"] = {
	Setup: function() {
		this.TF = 0;
	},
	F: function () {
		var A = this.Params[0].get();
		var t = this.Inputs[0].get()-this.TF;
		this.TF = this.Inputs[0].get();
		this.Outputs[0].set(A*t);
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get();
		return [
			(R/A) + this.TF
		];
	},
	Params: 1,
	Inputs: 1,
	Outputs: 1
};

ATA.ZekATA.Methods["INTEGRAL"] = {
	Setup: function() {
		this.TF = 0;
	},
	F: function () {
		var A = this.Params[0].get();
		this.TF += A*this.Inputs[0].get();
		return this.TF;
	},
	H: function() {
		var R = this.Outputs[0].get();
		var A = this.Params[0].get();
		return [
			this.TF/A - this.Inputs[0].get();
		];
	},
	Params:1,
	Inputs:1,
	Outputs: 1
};

ATA.ZekATA.Methods["MSUM"] = {
	Setup: function() {},
	F: function() { // çoklu toplam
		var total = 0;
		for (var i=0;i<this.Inputs.length;i++) {
			total += this.Params[i].get()*this.Inputs[i].get();
		}
		this.Outputs[0].set(total);
	},
	H: function() {
		var R = this.Outputs[0].get();
		var result = [];
		for (var i=0;i<this.Inputs.length;i++) {
			var total = 0;
			for (var j=0;j<this.Inputs.length;j++) {
				if (i == j) continue;
				total += this.Params[j].get()*this.Inputs[j].get();
			}
			result.push((R - total)/this.Params[i].get());
		}
		return result;
	},
	Params: 4,
	Inputs: 4,
	Outputs: 1
};

ATA.ZekATA.Methods["Pidial"] = { // 1234567890
	Setup: function() {
		this.TF = new Pidial(4);
	},
	F: function () {
		var A = this.Params[0].get();
		var B = this.Params[1].get();
		var C = this.Params[2].get();
		var R = this.Inputs[0].get();
		this.Outputs[0].set(A*this.TF.F(R) + B);
	},
	H: function() {
		return [
			this.Outputs[0].get()
		];
	},
	Params: 3,
	Inputs: 1,
	Outputs: 1
};

// Proposition, Önerme

var Proposition = function(val,pos) {
	this.value = val?val:0;
	this.possibility = pos?pos:1;
};

Proposition.prototype.get = function() {
	return this.value;
};

Proposition.prototype.set = function(val,pos) {
	if (val > 1) return;
	else if (val < 0) return;
	if (pos !== undefined) {
		if (pos < 0) pos = 0;
		else if (pos > 1) pos = 1;
	}
	this.value = val?val:0;
	this.possibility = pos?pos:1;
};

Proposition.prototype.toString = function() {
	return this.valueOf();
};

Proposition.prototype.valueOf = function() {
	return this.get();
};

Proposition.prototype.clone = function() {
	return new Proposition(this.value,this.possibility);
};

// Register

var Register = function(val,index) {
	if (index) this.index = index;
	else {
		if (!val) val = 0;
		this.index = Register.Registers.length;
		Register.Registers.push(new Proposition(val-0));
	}
};

Register.Registers = [];
Register.getRegister = function(index) {
	return this.Registers[index].get();
};

Register.prototype.get = function() {
	return Register.Registers[this.index].get();
};

Register.prototype.set = function(val) {
	Register.Registers[this.index].set(val-0);
};

Register.prototype.toString = function() {
	return this.valueOf();
};

Register.prototype.valueOf = function() {
	return this.get();
};

Register.prototype.clone = function() {
	return new Register(null,this.index);
};

// Summary Functions

var SummaryFunction = function(type) {
	switch (type.toUpperCase()) {
		default:return;break; // check for collection function
		case "MSUM":
		case "SINGLE":
		case "MMULTI":
		case "RMSUM":
		case "RMMULTI":
		case "MAX":
		break;
	}
	this.Type = type.toUpperCase();
	this._F = ZekATA.Methods[this.Type].F;
	this.Params = Array.from({length:ZekATA.Methods[this.Type].Params},function(){return new Register(1)});
	this.Inputs = Array.from({length:ZekATA.Methods[this.Type].Inputs},function(){return new Register(0)});
	this.Outputs = [];
	if (ZekATA.Methods[this.Type].TF) this.TF = ZekATA.Methods[this.Type].TF.clone();
};

SummaryFunction.prototype.F = function() {
	this._F();
	return this.Outputs;
};

// Activation Functions

var ActivationFunction = function(type) {
	if (!ZekATA.Methods[type.toUpperCase()]) type = "SIGMOID";
	this.Type = type.toUpperCase();
	this._F = ZekATA.Methods[this.Type].F.clone();
	this.Params = Array.from({length:ZekATA.Methods[this.Type].Params},function(){return new Register(1)});
	this.Inputs = Array.from({length:ZekATA.Methods[this.Type].Inputs},function(){return new Register()});
	this.Outputs = [];
	if (ZekATA.Methods[this.Type].TF) this.TF = ZekATA.Methods[this.Type].TF.clone();
	this.getArgument = function(index) {
		return Register.getRegister(index);
	};
	ZekATA.Methods[this.Type].Setup.apply(this);
};

ActivationFunction.prototype.F = function() {
	for (var i=0;i<this.Inputs.length;i++) {
		this.Inputs[i].set(this.getArgument(i));
	}
	return this.Outputs;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/*

arg =====> [N] => res ======> exit
			.		|
			|		.
			p <==== [H]

arg - [N] : registers and interrupts, summarize functions
[N] - res : activation function
res - [H] : verify system
[H] - p : pidial system




*/































// Neuron

var Neuron = function(sumtype,sactype) {
	this.Status = [];
	this.SummaryFunctions = [];
	this.ActivationFunction = new ActivationFunction(sactype);
	this.ID = "NOR_" + Neuron.Neurons++;
	this.Life = 1;
	for (var i=0;i<ZekATA.Methods[sactype.toUpperCase()].Params;i++) {
		this.Status.push({
			S:0,
			E:1,
			D:0
		});
		this.SummaryFunctions.push(new SummaryFunction(sumtype));
	}
	for (var i=0;i<ZekATA.Methods[sactype.toUpperCase()].Inputs;i++) {
		this.SummaryFunctions.Outputs = [new Register(0)];
		for (var j=0;j<ZekATA.Methods[sumtype.toUpperCase()].Params;j++) {
			this.SummaryFunctions[i].Params[j].set(1);
		}
	}
	this.Verify = new ActivationFunction("VERIFY");
	this.Verify.Params[0].set(1);
	this.Verify.Outputs = [new Register(0)];
	this.getTarget = async function(temp) {return 0};
	this.getInput = async function(section,index) {return 0};
};

Neuron.Neurons = 0;
Neuron.ExtendArguments = {};
Neuron.ExtendArguments["DA0"] = function() { return 0; };
Neuron.ExtendArguments["DA_+1"] = function() { return 1; };
Neuron.ExtendArguments["DA_-1"] = function() { return -1; };
Neuron.ExtendArguments["DAR"] = function() { return (Math.random()/Math.random())*(Math.random()-0.5); };
Neuron.ExtendArguments["DAN"] = function(x) { return -x; };
Neuron.ExtendArguments["DA+1"] = function(x) { return x+1; };
Neuron.ExtendArguments["DA-1"] = function(x) { return x-1; };
Neuron.ExtendArguments["DA+0.5"] = function(x) { return x+0.5; };
Neuron.ExtendArguments["DA-0.5"] = function(x) { return x-0.5; };
Neuron.ExtendArguments["DA*1.01"] = function(x) { return x*1.01; };
Neuron.ExtendArguments["DA/1.01"] = function(x) { return x/1.01; };
Neuron.ExtendArguments["DA*2"] = function(x) { return x*2; };
Neuron.ExtendArguments["DA/2"] = function(x) { return x/2; };
Neuron.ExtendArguments["DA*R"] = function(x) { return x*Math.random(); };
Neuron.ExtendArguments["DA/R"] = function(x) { return x/Math.random(); };

Neuron.prototype.F = async function() {
	var temp_inputs = [];
	var i,j;
	await this.getInputs();
	for (i=0;i<this.SummaryFunctions.length;i++) temp_inputs.push(this.SummaryFunctions[i].F()[0].get());
	
	//for (i=0;i<this.SummaryFunctions.length;i++) this.ActivationFunction.Inputs[i].set(temp_inputs[i]);
	//for (i=0;i<this.SummaryFunctions.length;i++) for (var key in Neuron.ExtendArguments) this.ActivationFunction.Inputs[i].set(Neuron.ExtendArguments[key](temp_inputs[i]));
	//for (i=0;i<this.SummaryFunctions.length;i++) for (j=-30;j<30;j++) this.ActivationFunction.Inputs[i].set(temp_inputs[i] + 6*j*(Math.PI/180));
	
	/*
		input hazýrla ve al
		nöron çalýþtýr
		sonuclarý kaydet
		baþarý hesapla
	*/
	
	this.ActivationFunction.F();
	
	
	if (!this.Cycle()) {
		
	}
};

Neuron.prototype.Cycle = function() {
	if (this.Life < 0.01) return false;
	if (!(/^-{0,1}\d+\.\d+$/).test("" + 1) && !(/^-{0,1}\d+$/).test("" + 2)) return false;
	this.Life *= 0.9999;
	return true;
};

Neuron.prototype.checkPoint = async function(temp) {
	return await this.getTarget(temp);
};

Neuron.prototype.getInputs = async function() {
	for (var i=0;i<this.SummaryFunctions.length;i++) {
		for (var j=0;j<this.SummaryFunctions[i].Inputs.length;j++) {
			await this.SummaryFunctions[i].Inputs[j].set(await this.getInput(i,j));
		}
	}
};

Neuron.prototype.getSuccess = async function(temp) {
	var target = await this.checkPoint(temp);
	this.FeedBack.Inputs[0].set(temp);
	var feed = this.FeedBack._F();
	this.Verify.Inputs[0].set(feed);
	this.Verify.Params[1].set(target);
	return this.Verify._F()[0];
};






















////////////////////////////////////////////////////////////////////////////////////////////////////

// nöron

function Nouron(sumtype,sactype) {
	this.IN = [];
	this.OUT = [];
	this.Directions = [];
	this.ID = "N_" + Nouron.N++;
	this.Errors = [];
	this.Successes = [];
	this.SummaryF = [];
	this.DefaultTargets = [];
	this.DefaultEscapes = [Infinity,-Infinity];
	this.SactiveF = new SAcFunction(sactype);
	for (var i=0;i<Nouron.Methods[sactype.toUpperCase()].Params;i++) {
		this.Successes.push(0);
		this.Errors.push(0);
		this.Directions.push((Math.random()>0.5?1:-1)*(Math.random()/2+0.5));
	}
	for (var i=0;i<Nouron.Methods[sactype.toUpperCase()].Arguments;i++) {
		this.SummaryF.push(new SUMFunction(sumtype));
		for (var j=Nouron.Methods[sumtype.toUpperCase()].Params-1;j>=0;j--) {
			this.SummaryF[i].Params.set([j],1);
		}
	}
	this.Verify = new SAcFunction("VERIFY"); // hedefe yakýnlýk doðrulama
	this.FeedBack = new SAcFunction("PID"); // pid ile dolaþma
	//this.Weight = new Gen([Nouron.Methods[sactype.toUpperCase()].Params,Nouron.Methods[sumtype.toUpperCase()].Params]);
	this.__i = 0;
	this.__tp = {};
	// feed back parametreleri ayarlanýyor // cikti*2.668033988749895 ilk atma x1.6489356881873896
	this.FeedBack.Params.set([0],0.6180339887498948); // KP 1/goldenrate
	this.FeedBack.Params.set([1],0.43); // KI
	this.FeedBack.Params.set([2],0.07); // KD
	this.FeedBack.TF.X.__i = 5;
	// verify parametreleri ayarlanýyor
	this.Verify.Params.set([0],1);
	this.getTarget = function(y0) {
		return Math.sin(y0);
	};
	this._getSuccess = function(y0) { // extend arguments için deneme fonksiyon
		var exit = 1;
		if (this.DefaultTargets.length > 1) for (var i=0;i<this.DefaultTargets.length;i++) exit *= Nouron.ExOr([y0.toScale("ESAS-01"),this.DefaultTargets[i].toScale("ESAS-01")]).get();
		else exit = 0;
		return (1-exit)*(1-Math.abs(y0 - this.getTarget(y0)).toScale("0AS-01"));
	};
	this.DefaultTargets = [];
	this.getSuccess = function(y0) {
		var target = this.getTarget(y0);
		this.FeedBack.Arguments.set([0],y0);
		var feed = this.FeedBack._F()/2;
		this.Verify.Arguments.set([0],feed);
		this.Verify.Params.set([1],target);
		var exit = this.Verify._F();
		ATA.log("Y = " + y0 + " , T = " + target + " , FEED = " + feed + " , E = " + exit + " ;");
		//exit *= Math.abs(target-y0).toScale("0AS-01");
		return exit;
	};
	this.DefaultEscapes = [Infinity,-Infinity];
	this.getError = function(y0) {
		if (isNaN(y0)) return 1;
		var exit = 1;
		for (var i=0;i<this.DefaultEscapes.length;i++) {
			exit *= Nouron.ExOr([y0.toScale("ESAS-01"),this.DefaultEscapes[i].toScale("ESAS_01")]).get();
		}

		return 1-exit;
	};
}

Nouron.prototype.clone = function() {
	var newobj = new Nouron();
	//
};

Nouron.prototype.toString = function() {
	return "[Nouron Object]";
};

Nouron.prototype.valueOf = function() {
	return this.toString();
};

Nouron.prototype.F = function() {
	this.Fn(0); // x0, x1 parametreleri hazýrlanýyor
	this.Fn(1); // nöron çalýþýyor ve sonuc aktarýlýyor
	this.Fn(2); // sonuc için baþarý hesaplanýyor
};

Nouron.prototype.Fn = function(n,ins) {
	switch(n) {
		default:
		case 0:
			this.__ie = this.__i;
			this.__tp.extendsucc = [];
			if (Math.random()*3 < 1) this.__i = Math.floor(Math.random()*this.Successes.length);
			if (ins > Math.random()) this.__tp.ax0 = this.SactiveF.Params.Mutation("double",[this.__i],this.Directions[this.__i]);
			else this.__tp.ax0 = this.SactiveF.Params.get([this.__i]);
			this.__tp.ax1 = this.SactiveF.Params.get([this.__i]);
			return this.__tp.clone();
		break;
		case 1:
			this.__tp.y = 0;
			this.__tp.ins = ins.clone();
			for (var i=0;i<this.SummaryF.length;i++) { // arguments al
				for (var j=Nouron.Methods[this.SummaryF[i].Type].Arguments-1;j>=0;j--) this.SummaryF[i].Arguments.set([j],ins[i][j]);
				this.SactiveF.Arguments.set([i],this.SummaryF[i].F());
			}
			this.__tp.y = this.SactiveF.F();
			var extendedArg = Nouron.DefaultExtendArgumentsF(this.SactiveF.Arguments);
			if (this.SummaryF.length == 0) this.__tp.extendsucc = [1];
			else for (var i=0;i<extendedArg.length;i++) { // arguments geniþlet
				for (var j=Nouron.Methods[this.SummaryF[0].Type].Arguments-1;j>=0;j--) {
					this.SactiveF.Arguments.set([j],extendedArg[i][j]);
				}
				this.__tp.extendsucc.push(this._getSuccess(this.SactiveF.F()));
			};
			return this.__tp.clone();
		break;
		case 2:
			var xi = [0.977, 0.75, 0.685, 0.57];
			this.__tp.succ = Nouron.And(this.__tp.extendsucc)*Math.asin((this.getSuccess(this.__tp.y,this.__tp.ins)*0.8 + 0.2*(1 - this.getError(this.__tp.y)))*2 - 1)/Math.PI+0.5;
			if (this.__tp.succ == 1 && this.Successes[this.__i] == 1) {
				this.Directions[this.__i] *= -1e-5;
				if (Math.random() < 0.02) this.Successes[this.__i] = 1 - 1e-5;
			} else if (this.__tp.succ > Nouron.And(this.Successes).get() && this.__tp.succ > this.Successes[this.__i] && this.__tp.succ > this.Successes[this.__ie]) {
				if (this.__tp.succ == 1) this.Directions[this.__i] *= -1e-5;
				else if (this.__tp.succ > xi[0]) this.Directions[this.__i] *= 1 - Math.random()*1e-3;
				else if (this.__tp.succ > xi[1]) this.Directions[this.__i] *= 1;
				else if (this.__tp.succ > xi[2]) this.Directions[this.__i] *= 1 - Math.random()*1e-7;
				else this.Directions[this.__i] *= 1 + 0.00002*Math.random();
				this.Successes[this.__i] = this.__tp.succ;
				//return 1;
			} else if (this.__tp.succ >= this.Successes[this.__i]) {
				if (this.__tp.succ > 0.975) this.Directions[this.__i] *= 0.99;
				else this.Directions[this.__i] *= 1 - 0.1*this.__tp.succ;
				this.__i = this.__ie;
				//return 1;
			} else if (this.__tp.succ == this.Successes[this.__i]) {
				this.Directions[this.__i] *= -1;
				this.__i = this.__ie;
				//return 0;
			} else if (this.__tp.succ >= this.Successes[this.__ie]) {
				this.SactiveF.Params.set([this.__i],this.__tp.ax0);
				this.__tp.y = this.SactiveF.F();
				this.Successes[this.__i] *= 1 - 1e-4; // unutma
				if (this.__tp.succ == 1) this.Directions[this.__i] *= -1e-5;
				else if (this.__tp.succ > xi[0]) this.Directions[this.__i] *= 1 - Math.random()*1e-3;
				else if (this.__tp.succ > xi[1]) this.Directions[this.__i] *= 1 - Math.random()*1e-2;
				else if (this.__tp.succ > xi[2]) this.Directions[this.__i] *= 1 - Math.random()*1e-1;
				else if (this.__tp.succ > xi[3]) this.Directions[this.__i] *= 1 + Math.random()*1e-14;
				else this.Directions[this.__i] *= 1 + Math.random()*1e-5;
				//return 0;
			} else {
				this.SactiveF.Params.set([this.__i],this.__tp.ax0);
				this.__tp.y = this.SactiveF.F();
				this.Successes[this.__i] *= 1 - 1e-3; // unutma
				if (this.__tp.succ == 1) this.Directions[this.__i] *= 0.75;
				else this.Directions[this.__i] *= -1;
				//return 0;
			}
			var neww = this.__tp.clone();
			this.__tp = {};
			return neww;//Nouron.And(this.Successes);
		break;
	}
};

Nouron.DefaultExtendArgumentsF = function(arg) {
	var arr_ = [];
	var j_ = arg.getLength([0]);
	for (var argE in Nouron.ExtendArguments) {
		if (argE == "clone") continue;
		arr_.push([]);
		for (var i=0;i<j_;i++) arr_[arr_.length-1].push(Nouron.ExtendArguments[argE](arg.get([i])));
	}
	return arr_;
};