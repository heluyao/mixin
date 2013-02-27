(function(){
	var root = this;
	var breaker = {};
	var push = Array.prototype.push;
	var _ = function(obj){
		if (obj instanceof _) return obj;
		if (!(this instanceof _)) return new _(obj);
		this._wrapped = obj;
	}
	root.h = _;
	_.each = function(obj, iterator, context){
		if (obj == null) return;
		if (obj.length === +obj.length){
			for (var i = 0, l = obj.length; i < l; i++){
				if (iterator.call(context, obj[i], i, obj) === breaker) return;
			}
		} else {
			for (var key in obj){
				if (_.has(obj, key)){
					if (iterator.call(context, obj[key], key, obj) === breaker) return;
				}
			}
		}
	};
	if(typeof (/./) !== 'function'){
		_.isFunction = function(obj){
			return typeof obj === 'function';
		};
	}
	_.functions = _.methods = function(obj) {
		var names = [];
		for (var key in obj){
			if (_.isFunction(obj[key])) names.push(key);
		}
		return names.sort();
	}
	var result = function(obj){
		return this._chain ? _(obj).chain() : obj;
	}
	_.tap = function(obj, interceptor){
		interceptor(obj);
		return obj;
	}
	//my function
	_.a = function(obj,t){
		console.info(t);
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
	_.mixin = function(obj) {
		_.each(_.functions(obj), function(name){
			var func = _[name] = obj[name];
			_.prototype[name] = function() {
				var args = [this._wrapped];
				push.apply(args, arguments);
				return result.call(this, func.apply(_, args));
			};
		});
	}
	_.mixin(_);
	_.chain = function(obj) {
		return _(obj).chain();
	}
	_.prototype.chain = function() {
		this._chain = true;
		return this;
	}
}).call(this);
//show
h.chain([1,2,3]).tap(alert).a('a').b('b').c('c');
