(function(){
	var root = this;
	var _ = function(obj){
		if (obj instanceof _) return obj;
		if (!(this instanceof _)) return new _(obj);
		this._wrapped = obj;
	}
	root._ = _;
	_.each = function(obj, iterator, context){
		for (var i = 0, l = obj.length; i < l; i++){
			if (iterator.call(context, obj[i], i, obj) === {}) return;
		}
	}
	var result = function(obj){
		return this._chain ? _(obj).chain() : obj;
	}
	//my function begin
	_.a = function(obj,t){
		t(obj)
		return obj;
	}
	_.b = function(obj,t){
		console.info(t);
		return obj;
	}
	_.c = function(obj,t){
		console.info(t);
		return obj;
	}
	//my function end
	_.mixin = function(obj) {
		var names = [];
		for (var key in obj){
			if (typeof obj[key] === 'function') names.push(key);
		}
		_.each(names, function(name){
			var func = _[name] = obj[name];
			_.prototype[name] = function() {
				var args = [this._wrapped];
				Array.prototype.push.apply(args, arguments);
				return result.call(this, func.apply(_, args));
			};
		});
	}
	_.mixin(_);
	_.chain = function(obj){
		return _(obj).chain();
	}
	_.prototype.chain = function(){
		this._chain = true;
		return this;
	}
}).call(this);
_.chain([1,2,3]).a(alert).b('b').c('c');//show