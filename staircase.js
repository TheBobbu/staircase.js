/*
   ¬	  Staircase Form Validation Library
    ¬	  Current Version: 4.1-a2
     ¬	  
      ¬	  Copyright © Virtuoso Advertising 2013
*/

var Staircase;

window.onload = function()
{
	if(!window['Sizzle'] && !window['jQuery'])
		throw new Error('Sizzle not found, embed a copy from sizzlejs.com or use jQuery');
	else
	{
		var Sizzle;

		if(window['Sizzle'])
			Sizzle = window['Sizzle'];
		else if(window['jQuery'] && window['jQuery']['find'])
			Sizzle = window['jQuery']['find'];
	}

	Sizzle('html')[0].className += 'staircase-enabled';

	new (Staircase = function()
	{
		var Supports = (function()		{ var div = document.createElement('div'), vendors = 'Khtml Ms O Moz Webkit'.split(' '), len = vendors.length; return function(prop) { if(prop in div.style) return true; prop = prop.replace(/^[a-z]/, function(val){ return val.toUpperCase(); }); while(len--) if(vendors[len] + prop in div.style) return true; return false; } })();
			Class = function(o, a)		{ var b = o.className.split(' '), c = a.split(' '), d = e = []; for(i in b) if(b[i] && b[i] != '' && typeof b[i] == 'string') d.push(b[i]); for(i in c) if(c[i] && c[i] != '' && typeof c[i] == 'string') d.push(c[i]); e = Filter.call(d, function(elem, pos, self){ return in_array(elem, self) == pos }); o.className = e.join(' '); return o; },
			CSS = function(o, a, b)		{ if(typeof o == 'array') { for(i in o) if(typeof o[i] == 'object') CSS(o[i], a, b); return o; } if(typeof a == 'object') for(i in a) o.style[i] = a; else if(typeof a == 'string' && b && typeof b == 'string') o.style[a] = b; return o; },
			Filter = function(fun)		{ "use strict"; if(this === void 0 || this === null) throw new TypeError(); var t = Object(this), len = t.length >>> 0; if(typeof fun !== "function") throw new TypeError(); var res = [], thisp = arguments[1]; for(var i = 0; i < len; i++) if(i in t) { var val = t[i]; if(fun.call(thisp, val, i, t)) res.push(val); } return res; },
			Fire = function(o, a)		{ var event; if(document.createEvent) { event = document.createEvent('HTMLEvents'); event.initEvent(a, true, true); } else { event = document.createEventObject(); event.eventType = a; } event.eventName = a; event.memo = {}; if(document.createEvent) o.dispatchEvent(event); else o.fireEvent('on' + event.eventType, event); },
			in_array = function(a, b)	{ for(i in b) if(b[i] == a) return i; return -1; },
			Nearest = function(o, a)	{ var els = []; while(o) { els.unshift(o); o = o.parentNode; } els.reverse(); for(i in els) if(Test(els[i], a)) return els[i]; return null; },
			Test = function(o, a)		{ if(!o || o == null || o == undefined) return null; return Sizzle.matchesSelector(o, a) ? o : null; },
			Unclass = function(o, a)	{ var b = o.className.split(' '), c = a.split(' '), d = []; for(i in b) if(b[i] && b[i] != '') for(j in c) if(c[j] && c[j] != '' && b[i] != c[j]) d.push(b[i]); o.className = d.join(' '); },

			json_decode = function(b)	{ var c=window.JSON;if(typeof c==='object'&&typeof c.parse==='function'){try{return c.parse(b)}catch(err){if(!(err instanceof SyntaxError)){throw new Error('Unexpected error type in json_decode()');}this.php_js=this.php_js||{};this.php_js.last_error_json=4;return null}}var d=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var j;var e=b;d.lastIndex=0;if(d.test(e)){e=e.replace(d,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if((/^[\],:{}\s]*$/).test(e.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+e+')');return j}this.php_js=this.php_js||{};this.php_js.last_error_json=4;return null },

			$ = function(a, b)			{ var elements = (window['Sizzle'] || Sizzle)(a, b ? b : document), length = 0; for(i in elements) if(typeof elements[i] == 'object') length ++; elements.each = function(callback) { for(i in elements) if(typeof elements[i] == 'object') callback.call(elements[i]); return elements; }; elements.bind = function(eventName, callback) { for(i in elements) if(typeof elements[i] == 'object') elements[i]['on' + eventName] = callback; return elements; }; elements.last = function() { return elements[elements.length - 1]; }; elements.length = length; return elements; },
			$s = this,

			css3 = Supports('textShadow'),

			xhr = function sendRequest(url, callback, postData)
			{
				// Quirksmode XHR function - http://www.quirksmode.org/js/xmlhttp.html

				var XMLHttpFactories =
				[
					function () {return new XMLHttpRequest()},
					function () {return new ActiveXObject("Msxml2.XMLHTTP")},
					function () {return new ActiveXObject("Msxml3.XMLHTTP")},
					function () {return new ActiveXObject("Microsoft.XMLHTTP")}
				];

				function createXMLHTTPObject()
				{
					var xmlhttp = false;
					for (var i=0;i<XMLHttpFactories.length;i++) {
						try {
							xmlhttp = XMLHttpFactories[i]();
						}
						catch (e) {
							continue;
						}
						break;
					}
					return xmlhttp;
				}

				var req = createXMLHTTPObject();
				if (!req) return;
				var method = (postData) ? "POST" : "GET";
				req.open(method,url,true);
				if (postData)
					req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				req.onreadystatechange = function () {
					if (req.readyState != 4) return;
					if (req.status != 200 && req.status != 304) {
						return;
					}
					callback(req.responseText);
				}
				if (req.readyState == 4) return;
				req.send(postData);
			},

			FetchAddress = function(postcodeInput, dataPoints)
			{
				var street = (dataPoints[0] || null),
					town = (dataPoints[1] || null),
					county = (dataPoints[2] || null);

				var postcode = postcodeInput.value,
					createIfNotExists = function(n)
					{
						if(document.getElementsByName(n).length > 0)
							return $('[name="' + n + '"]')[0];
						else
						{
							var target = document.createElement('input');
							target.name = n;
							target.value = '';
							target.type = 'hidden';
							postcodeInput.parentNode.insertBefore(target, postcodeInput.nextSibling);
							return target;
						}
					};
					if(!postcode || postcode == '') return false;
					if(!county || county.toLowerCase() == 'false') county = { value: '' }; else if(typeof county == 'string') county = createIfNotExists(county);
					if(!town || town.toLowerCase() == 'false') town = { value: '' }; else if(typeof town == 'string') town = createIfNotExists(town);
					if(!street || street.toLowerCase() == 'false') street = { value: '' }; else if(typeof street == 'string') street = createIfNotExists(street);

				this.xhr('http://staircase.virtuosoadvertising.co.uk/bin/address-lookup.php', function(address)
				{
					if(address.match(/^({|\[)(.*?)(}|\])$/))
					{
						address = json_decode(address);
						
						if(address && address['county'] && address['town'] && address['street'])
						{
							county.value = address.county;
							town.value = address.town;
							street.value = address.street;
						}
					}
				},
				'postcode=' + postcode);
			};

		this.patterns =
		{
			email:			/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			name:			/^([ A-Za-z\.]+)$/,
			phone:			[/^(\+([0-9]{1,5})|0)(?!.*(\d)\1{9,})\d{9,}$/, /^(\+([0-9]{1,5})|07)(?!.*(\d)\1{9,})\d{9,}$/],
			number:			[/^(-)?([0-9]+)$/, /^(-)?([0-9]+)\.([0-9]+)$/],
			currency:		/^(-)?([^a-zA-Z0-9 ])?([0-9\,]+)(\.([0-9]{2,}))?$/,
			zipcode:		/^(^\d{5}$)|(^\d{5}-\d{4}$)$/,
			postcode:		/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/,
			time:			[/^([0-9]{2}):([0-9]{2})(:([0-9]{2}))?([\s]+)?(am|pm)?$/i, /^(am|pm)$/i],
			date:			[/^([0-9]{1,2})(\/|-|\.|,| )([0-9]{1,2})(\/|-|\.|,| )([0-9]{2,4})$/, /^((mon|monday|tue|tues|tuesday|wed|wednesday|thu|thurs|thursday|fri|friday|sat|saturday|sun|sunday)([\s]+))?([0-9]{1,2})(st|nd|rd|th)?([\s]+)?(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december)([\s]+)?([0-9]{2,4})$/i],
			filename:		/^(([^\/\\\?%\*:|"<>]+)?\.([^\/\\\?%\*:|"<>\.]+)|([^\/\\\?%\*:|"<>\.]+))$/,
			'default':		/^(?!\s*$).+/
		};

		this.staircases = [];

		$('.staircase').each(function()
		{
			var ThisStaircase = this,
				StepsTotalCount = 0,
				rootI = 1;

			if(!ThisStaircase.staircaseObject)
				ThisStaircase.staircaseObject = {};

				ThisStaircase.staircaseObject.staircase = $s;
				ThisStaircase.staircaseObject.steps = [];

			for(i in $s.staircases)
				if($s.staircases[i] == this) return;

			$s.staircases.push(ThisStaircase);

			$('.step', ThisStaircase).each(function()
			{
				ThisStaircase.staircaseObject.steps.push(this);
				this.staircaseObject = { stepNumber: rootI };

				rootI ++;
			});

			StepsTotalCount = rootI - 1;
			rootI = 0;

			var FirstStep = $('.step', ThisStaircase).each(function()
				{
					var ThisStep = this,
						NextStep = ThisStaircase.staircaseObject.steps[rootI + 1] ? ThisStaircase.staircaseObject.steps[rootI + 1] : null,
						PrevStep = ThisStaircase.staircaseObject.steps[rootI - 1] ? ThisStaircase.staircaseObject.steps[rootI - 1] : null,
						InputsSelector = 'input[validate]:not([type="button"]):not([type="submit"]), select[validate], textarea[validate]';

					$(InputsSelector, ThisStep).each(function()
					{
						var tagType = this.tagName.toLowerCase();
							if(tagType == 'input') tagType = this.getAttribute('type') ? this.getAttribute('type') : 'text';

						this.onblur = function()
						{
							var tagType = this.tagName.toLowerCase(),
								isValidated = false,
								validationType = this.getAttribute('validate').toLowerCase() || '',
								addressLookup = this.getAttribute('address-lookup') ? this.getAttribute('address-lookup') : null;

							if(tagType == 'input') tagType = this.getAttribute('type') ? this.getAttribute('type') : 'text';

							switch(tagType)
							{
								case 'checkbox': case 'radio':
									if(validationType == 'unchecked')
									{
										if(!this.checked) isValidated = true;
									}
									else
									{
										if(this.checked) isValidated = true;
									}
									break;

								case 'select':
									var validationOption = 0;

									if(validationType.indexOf('[') > -1 && validationType.indexOf(']') > -1)
									{
										validationOption = parseInt(validationType.replace(/^([a-zA-Z0-9-_]+)\[([0-9]+)\]$/, '$2'));
										validationType = 'select';
									}

									validationOption = this.getElementsByTagName('option').item(validationOption);
									validationOption = validationOption.hasAttribute('value') ? validationOption.getAttribute('value') : validationOption.innerHTML;
									
									if(validationOption != this.value) isValidated = true;

									break;

								default:
									if(validationType.indexOf('[') > -1 && validationType.indexOf(']') > -1)
									{
										validationType = validationType.replace(/^([a-zA-Z0-9-_]+)\[([0-9]+)\]$/, '$1|$2').split('|');
										validationType[1] = parseInt(validationType[1]);

										validationType = $s.patterns[validationType[0]] ? $s.patterns[validationType[0]][validationType[1]] : $s.patterns['default'];
									}
									else validationType = ($s.patterns[validationType] ? (($s.patterns[validationType].length == undefined) ? $s.patterns[validationType] : $s.patterns[validationType][0]) : $s.patterns['default']);

									if(this.value.match(validationType)) isValidated = true;
									break;
							}

							if(isValidated)
								Unclass(Test(this, 'label > ' + this.tagName) ? Nearest(this, 'label') : this, 'staircase-has-error');
							else
								Class(Test(this, 'label > ' + this.tagName) ? Nearest(this, 'label') : this, 'staircase-has-error');

							if(addressLookup) FetchAddress(this, addressLookup.replace(/( ,|, | , )/g, ',').split(','));
						};

						this.onchange = function() { Fire(this, 'blur'); };

						var classApply = (Test(this, 'label > ' + this.tagName) ? Nearest(this, 'label') : this);

						if(!classApply.getAttribute('error-tooltip'))
							classApply.setAttribute('error-tooltip', tagType == 'select' ? 'Please select a valid option' : ((tagType == 'checkbox' || tagType == 'radio') ? 'Please select the correct box' : 'Please fill this field correctly!'));
						
						if(this.offsetTop)
							classApply.setAttribute('input-top-pos', this.offsetTop);
					});

					$('input[type="submit"], input[type="button"].prog, button', ThisStep).bind('click', function()
					{
						$(InputsSelector, ThisStep).each(function(){ Fire(this, 'blur'); });

						var errors = $('.staircase-has-error:not([not-required])', ThisStep);

						if(errors.length == 0)
						{
							var conditionPassed = false,
								forceSubmit = false,
								alertMessages = [],
								interrupted = false;

							$('if, .condition', ThisStep).each(function()
							{
								if(interrupted) return;

								var conditions = (function(a)
									{
										var b = {};

										a.each(function()
										{
											b[this.getAttribute('input-name')] =
											{
												name: this.getAttribute('input-name'),
												type: ($('[name="' + this.getAttribute('input-name') + '"]' , ThisStep)[0].getAttribute('type') || $('[name="' + this.getAttribute('input-name') + '"]', ThisStep)[0].tagName),
												findclass: (this.className ? (function(c)
													{
														c = c.split(' ');
														return '.' + c.join('.');
													})(this.className) : ''),
												findchecked: (this.getAttribute('checked') ? true : false),
												findvalue: (this.getAttribute('is') || 'True'),
												findnegvalue: (this.getAttribute('not') || null)
											};

											b[this.getAttribute('input-name')].el = $('[name="' + this.getAttribute('input-name') + '"]' + b[this.getAttribute('input-name')].findclass, ThisStep);
										});

										return b;
									})($('input', this)),

									statements = (function(a)
									{
										var b = {};

										for(c in a)
											if(a[c].match(/^([\s]+)?<(then|else)(.*?)?>(.*)<\/(then|else)(.*?)?>([\s]+)?$/i))
												b[a[c].replace(/^([\s]+)?<(then|else)(.*?)?>(.*)<\/(then|else)(.*?)?>([\s]+)?$/i, '$2').toLowerCase()] = a[c].replace(/^([\s]+)?<(then|else)(.*?)?>(.*)<\/(then|else)(.*?)?>([\s]+)?$/i, '$4');

										return b;
									})(((this.innerHTML.replace(/(\r\n|\r|\n|	)/g, '')).replace(/^([\s]+)?(.*?)([\s]+)?$/, '$2')).replace(/\>([\s]+)?\</g, '>\n<').split('\n'));
							
								var passStatementType = 'else';

								for(i in conditions)
								{
									var cond = conditions[i];

									if(cond.type == 'radio' || cond.type == 'checkbox')
									{
										if(cond.findchecked)
										{
											var sv = $('[name="' + i + '"]' + cond.findclass + ':checked', ThisStep)[0].value;
											if(cond.findnegvalue)
												passStatementType = (sv != cond.findnegvalue) ? 'then' : 'else';
											else
												passStatementType = (sv == cond.findvalue) ? 'then' : 'else';
										}
										else
										{
											var sv = $('[name="' + i + '"]' + cond.findclass + ':not(:checked)', ThisStep)[0].value;
											if(cond.findnegvalue)
												passStatementType = (sv != cond.findnegvalue) ? 'then' : 'else';
											else
												passStatementType = (sv == cond.findvalue) ? 'then' : 'else';
										}
									}
									else
									{
										var sv = $('[name="' + i + '"]' + cond.findclass, ThisStep)[0].value;

										if(cond.findvalue.match(/^([\s]+)?(<|<=|>|>=)(.*)$/))
										{
											var fx = cond.findvalue.replace(/^([\s]+)?(<|<=|>|>=)([\s]+)?(.*)$/, '$2'),
												fv = parseInt(cond.findvalue.replace(/^([\s]+)?(<|<=|>|>=)([\s]+)?(.*)$/, '$4'), 10);

											passStatementType = 'else';
											sv = parseInt(sv, 10);

											switch(fx)
											{
												case '<': if(sv < fv) passStatementType = 'then'; break;
												case '<=': if(sv <= fv) passStatementType = 'then'; break;
												case '>': if(sv > fv) passStatementType = 'then'; break;
												case '>=': if(sv >= fv) passStatementType = 'then'; break;
											}
										}
										else passStatementType = (sv == cond.findvalue) ? 'then' : 'else';
									}
								}

								for(i in statements)
								{
									if(i == passStatementType)
									{
										var matchGoTo = statements[i].match(/^(skip to|go to) (last( step)?|first( step)?|(step )?([0-9]+)|start|end)$/i);
										if(matchGoTo)
										{
											var step = parseInt(matchGoTo[2]
												.replace(/^(step )?([0-9]+)$/i, '$2')
												.replace(/^(last|first)( step)?$/i, '$1')
												.replace(/^(last|end)$/i, StepsTotalCount)
												.replace(/^(first|start)$/i, 1));

											conditionPassed = ThisStaircase.staircaseObject.steps[step - 1];
											if(passStatementType == 'then') interrupted = true;
										}
										var matchToAlert = statements[i].match(/^alert (.*)$/i);
										if(matchToAlert)
										{
											alertMessages.push(matchToAlert[1]);
										}
										var matchToSubmit = statements[i].match(/^submit$/i);
										if(matchToSubmit)
										{
											forceSubmit = true;
										}
									}
								}
							});

							if(alertMessages.length > 0)
							{
								alert('Error:-\n ' + alertMessages.join('\n '));
								return false;
							}

							if(this.hasAttribute('does-submit')) return true;

							CSS(ThisStep, 'display', 'none');

							if(conditionPassed)
							{
								CSS(conditionPassed, 'display', 'block');

								return false;
							}

							var DoStep = this.hasAttribute('does-prev') ? PrevStep : NextStep;

							if(DoStep)
								CSS(DoStep, 'display', 'block');
							else
								return true;

							if(forceSubmit) return true;
						}
						else
						{
							var errorMessages = [];

							errors.each(function()
							{
								var error = this,
									errorMessage = error.getAttribute('error-tooltip');

								if(errorMessage && in_array(errorMessage, errorMessages) <= -1)
									errorMessages.push(errorMessage);

								Class(error.parentNode.tagName == 'label' ? error.parentNode : error, 'staircase-highlight-error');

								setTimeout(function()
								{
									Unclass(error.parentNode.tagName == 'label' ? error.parentNode : error, 'staircase-highlight-error');
								}, 3000);
							});

							if(errorMessages.length == 0)
								errorMessages.push('Please correctly fill all highlighted fields.');

							if(!css3)
								alert('Error -\n ' + errorMessages.join('\n '));
						}

						return false;
					});

					CSS(ThisStep, 'display', 'none');

					rootI ++;
				})[0];

			CSS(FirstStep, 'display', 'block');
		});

		return this;
	});
	
	document.title = (function()
		{
			var TElem = Sizzle('#page-title, .page-title, [name="page-title"], h1, h2, h3, h4, h5, h6, img[alt]');
				if(TElem.length <= 0) return window.location.href.replace(/^http(s)?:\/\/(.*)\/?$/, '$2');

			if(TElem[0].tagName.toLowerCase() == 'img' && TElem[0].getAttribute('alt'))
				return TElem[0].getAttribute('alt');

			if(TElem[0].getAttribute('title'))
				return TElem[0].getAttribute('title');

			return TElem[0].innerHTML;
		})();
};
