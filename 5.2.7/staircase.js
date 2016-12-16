/* Staircase | © Zeta Interactive 2013 - 2016 */

;(function()
{
	// Version Information
	window.$scv = '5.2.7';
	window.$scb = '83a';

	// Cookie setter and getter
	window.Cookies =
	{
		get: function(key)
		{
			var cookies = document.cookie.split(';');

			for(var i = 0; i < cookies.length; i++)
			{
				if(cookies[i].split('=')[0] == key)
				{
					return cookies[i].substr(key.length + 1);
				}
			}

			return null;
		},
		set: function(key, val, days)
		{
			if(days !== undefined)
			{
				var exp = new Date();
					exp.setTime(exp.getTime() + (days * 24 * 60 * 60 * 1000));
			}

			document.cookie = key + "=" + val + (days ? "; expires=" + exp.toGMTString() : "") + "; path=/";

			return window.Cookies;
		},
		remove: function(key)
		{
			return window.Cookies.set(key, null, -1);
		}
	};

	// Polyfills
	String.prototype.trim = function(a){var b=this,c,l=0,i=0;b+='';if(!a){c=' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'}else{a+='';c=a.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'$1')}l=b.length;for(i=0;i<l;i++){if(c.indexOf(b.charAt(i))===-1){b=b.substring(i);break}}l=b.length;for(i=l-1;i>=0;i--){if(c.indexOf(b.charAt(i))===-1){b=b.substring(0,i+1);break}}return c.indexOf(b.charAt(0))===-1?b:''};
	String.prototype.hash = function(c){var a='',b='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>!:;,.$';c=c?c:8;for(var i=0;i<c;i++)a+=b.charAt(Math.floor(Math.random()*b.length));return a};
	Number.prototype.toDate = function date(k){var d,a,h="Sun Mon Tues Wednes Thurs Fri Satur January February March April May June July August September October November December".split(" "),f=/\\?(.?)/gi,g=function(b,c){return a[b]?a[b]():c},e=function(b,a){for(b=String(b);b.length<a;)b="0"+b;return b};a={d:function(){return e(a.j(),2)},D:function(){return a.l().slice(0,3)},j:function(){return d.getDate()},l:function(){return h[a.w()]+"day"},N:function(){return a.w()||7},S:function(){var b=a.j(),c=b%10;3>=c&&1==parseInt(b%100/10,10)&&(c=0);return["st","nd","rd"][c-1]||"th"},w:function(){return d.getDay()},z:function(){var b=new Date(a.Y(),a.n()-1,a.j()),c=new Date(a.Y(),0,1);return Math.round((b-c)/864E5)},W:function(){var b=new Date(a.Y(),a.n()-1,a.j()-a.N()+3),c=new Date(b.getFullYear(),0,4);return e(1+Math.round((b-c)/864E5/7),2)},F:function(){return h[6+a.n()]},m:function(){return e(a.n(),2)},M:function(){return a.F().slice(0,3)},n:function(){return d.getMonth()+1},t:function(){return(new Date(a.Y(),a.n(),0)).getDate()},L:function(){var b=a.Y();return 0===b%4&0!==b%100|0===b%400},o:function(){var b=a.n(),c=a.W();return a.Y()+(12===b&&9>c?1:1===b&&9<c?-1:0)},Y:function(){return d.getFullYear()},y:function(){return a.Y().toString().slice(-2)},a:function(){return 11<d.getHours()?"pm":"am"},A:function(){return a.a().toUpperCase()},B:function(){var a=3600*d.getUTCHours(),c=60*d.getUTCMinutes(),f=d.getUTCSeconds();return e(Math.floor((a+c+f+3600)/86.4)%1E3,3)},g:function(){return a.G()%12||12},G:function(){return d.getHours()},h:function(){return e(a.g(),2)},H:function(){return e(a.G(),2)},i:function(){return e(d.getMinutes(),2)},s:function(){return e(d.getSeconds(),2)},u:function(){return e(1E3*d.getMilliseconds(),6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)";},I:function(){var b=new Date(a.Y(),0),c=Date.UTC(a.Y(),0),d=new Date(a.Y(),6),e=Date.UTC(a.Y(),6);return b-c!==d-e?1:0},O:function(){var a=d.getTimezoneOffset(),c=Math.abs(a);return(0<a?"-":"+")+e(100*Math.floor(c/60)+c%60,4)},P:function(){var b=a.O();return b.substr(0,3)+":"+b.substr(3,2)},T:function(){return"UTC"},Z:function(){return 60*-d.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(f,g)},r:function(){return"D, d M Y H:i:s O".replace(f,g)},U:function(){return d/1E3|0}};return function(a,c){d=void 0===c?new Date:c instanceof Date?new Date(c):new Date(1E3*c);return a.replace(f,g)}(k,this)};

	try
	{
		// Supply the window with an array of parameters (?param1=value&param2=value)
		window.location.param = function(n,u)
		{
			if(!u)
			{
				var u = window.location.search;
			}

			var a = RegExp('[?&](?:amp;)?' + (n.replace(/(\[|\]|\{|\}|\?|\/|\\|\||\(|\))/g,'\\$1')) + '=([^&]*)').exec(u);

			return a && decodeURIComponent(a[1].replace(/\+/g, ' '));
		};

		Object.defineProperty(window.location, 'params',
		{
			set: function() {},
			get: function()
			{
				var a = {},
					b = window.location.search.substr(1).split('&');

				if(b)
				{
					for(var i in b)
					{
						b[i] = b[i].replace(/^(?:amp;)?([^=]+)=(.*)?$/,'$1\n$2').split('\n');
						if(a[b[i][0]])
						{
							a[b[i][0]] = [a[b[i][0]]];
							a[b[i][0]].push(b[i][1]);
						}
						else
						{
							a[b[i][0]] = b[i][1];
						}
					}
				}

				return a;
			}
		});
	}
	catch(e)
	{
		if(window.console)
		{
			console.error('Your browser does not support changes to window.location.', e);
		}
	}

	// Set up the jQuery extension
	window.jQuery.fn.staircase = function(options)
	{
		var $ = window.jQuery;

		if($(this).length == 1)
		{
			var sc = $(this).data('staircase');

			if(!sc)
			{
				$(this).data('staircase', sc = new Staircase(this, options ? options : {}));
			}

			return sc;
		}
		else
		{
			return $(this).each(function()
			{
				if(!$(this).data('staircase'))
				{
					$(this).data('staircase', new Staircase(this, options ? options : {}));
				}
			});
		}
	};

	// Fill any autofill inputs
	window.jQuery('input[staircase-value]').each(function()
	{
		var $ = window.jQuery,
			fillstr = $(this).attr('staircase-value').replace(/#{(.*?)}/g, function(m, key)
			{
				if(key.match(/^date\.(.*)$/i))
				{
					return (new Date / 1000).toDate(key.replace(/^date\.(.*)$/i, '$1'));
				}
				else if(key.match(/^cookies?\.(.*)$/i))
				{
					var cookie = key.replace(/^cookies?\.(.*)$/i, '$1'),
						cookies = document.cookie.split('; ');

					for(var i in cookies)
					{
						if(cookies[i].split('=')[0] == cookie)
						{
							return cookies[i].substr(cookie.length + 1);
						}
					}

					return '';
				}
				else
				{
					var val = window;
						key = key.split('.');

					for(var i in key)
					{
						if(val[key[i]])
						{
							val = val[key[i]];
						}
						else
						{
							return undefined;
						}
					}

					if(val != window)
					{
						return val;
					}
				}
			});

		$(this).removeAttr('staircase-value').val(fillstr);
	});

	// Title Scanner
	if(!document.title || document.title.match(/\.(html?|php)((\?|#)(.*?)?)?$/i) || $('title').length == 0)
	{
		var title = ($('h1, h2, h3, h4, h5, h6').first().text() || '').trim();

		if(!title)
		{
			title = ($('img[alt]').first().attr('alt') || '').trim();
		}

		if(!title)
		{
			title = ($('p').first().text().trim() || '').split(' ').slice(0, 4).join(' ').trim();
		}

		if(!title && window.location.href.match(/\.(html?|php)((\?|#)(.*?)?)?$/i))
		{
			title = window.location.href.replace(/(.*)\/(.*?)\.(html?|php)((\?|#)(.*?)?)?$/i, '$2').replace(/[-_\.]/g, ' ').split(' ');

			for(var i in title)
			{
				title[i] = title[i][0].toUpperCase() + title[i].substr(1).toLowerCase();
			}

			title = title.join(' ');
		}

		document.title = title;
	}

	// Data8 is a third party information verification service
	window.Data8API = function(APIKey, License)
	{
		var $this = this,
			$authed = false;

		$this.APIKey = APIKey;
		$this.License = License;

		$this.Cache = {};
		$this.DefaultCountry = 'GB';

		$this.Verify = function(value, type, callback)
		{
			if(!callback && type && typeof type == 'function')
			{
				callback = type;
				type = 'email';
			}

			if(!callback || typeof callback != 'function')
			{
				return $this;
			}

			if($this.Cache[type] && $this.Cache[type][value])
			{
				if(typeof $this.Cache[type][value] != 'object')
				{
					return $this;
				}

				if(!($this.Cache[type][value]['TimedOut'] || false))
				{
					callback.call($this, $this.Cache[type][value], true);

					return $this;
				}
			}

			var success = function(result, valid)
			{
				$this.Cache[type][value] = result;
				$this.Cache[type][value].RequestDuration = ((new Date * 1) - timeoutstarted) / 1000;
				$this.Cache[type][value].IsValid = valid;

				callback.call($this, $this.Cache[type][value], false);
			},

			timeoutstarted = new Date * 1,

			timeout = setTimeout(function()
			{
				$this.Cache[type][value] =
				{
					IsValid: true,
					RequestDuration: ((new Date * 1) - timeoutstarted) / 1000,
					TimedOut: true
				};

				success($this.Cache[type][value], $this.Cache[type][value].IsValid);
			}, 5000);

			if(!$this.Cache[type])
			{
				$this.Cache[type] = {};
			}

			$this.Cache[type][value] = 'loading';

			switch(String(type).trim().toLowerCase())
			{
				case 'email':
					var caller = new data8.emailvalidation();
						caller.isvalid(value, 'Address', null, function(result)
						{
							clearTimeout(timeout);

							success(result, !!result.Result.trim().match(/^(catchall|error|greylisted|inconclusive|valid)$/i));
						});
					break;

				case 'mobile': case 'landline': case 'telephone': case 'phone':
					value = value.replace(/[^0-9\+]/g, '');
					var caller = new data8.internationaltelephonevalidation();
						caller.isvalid(value, $this.DefaultCountry,
						[
							new data8.option('UseMobileValidation', 'true'),
							new data8.option('UseLineValidation', 'true')
						], function(result)
						{
							clearTimeout(timeout);

							var valid = !!result.Result.ValidationResult.trim().match(/^(nocoverage|valid)$/i);

							if(result.Status.CreditsRemaining == '0')
							{
								valid = true;

								result.OutOfCredits = true;
							}

							success(result, valid);
						});
					break;

				default:
					clearTimeout(timeout);

					$this.Cache[type][value] = undefined;
					break;
			}

			return $this;
		};

		$this.Lookup = function(postcode, callback)
		{
			if(!callback || typeof callback != 'function')
			{
				return $this;
			}

			var pckey = postcode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

			if($this.Cache.Addresses && $this.Cache.Addresses[pckey])
			{
				if(typeof $this.Cache.Addresses[pckey] != 'object')
				{
					return $this;
				}

				if(!($this.Cache.Addresses[pckey]['TimedOut'] || false))
				{
					callback.call($this, $this.Cache.Addresses[pckey], postcode, true);

					return $this;
				}
			}

			var success = function(result, valid)
			{
				$this.Cache.Addresses[pckey] = result;
				$this.Cache.Addresses[pckey].RequestDuration = ((new Date * 1) - timeoutstarted) / 1000;
				$this.Cache.Addresses[pckey].IsValid = valid;

				callback.call($this, $this.Cache.Addresses[pckey], postcode, false);
			},

			timeoutstarted = new Date * 1,

			timeout = setTimeout(function()
			{
				$this.Cache.Addresses[pckey] =
				{
					IsValid: true,
					RequestDuration: ((new Date * 1) - timeoutstarted) / 1000,
					TimedOut: true
				};

				success($this.Cache.Addresses[pckey], $this.Cache.Addresses[pckey].IsValid);
			}, 5000);

			if(!$this.Cache.Addresses)
			{
				$this.Cache.Addresses = {};
			}

			$this.Cache.Addresses[pckey] = 'loading';

			var addresscapture = new data8.addresscapture();
				addresscapture.getfulladdress($this.License, postcode, '',
				[
					new data8.option('MaxLines', '5'),
					new data8.option('FixTownCounty', 'true')
				],
				function(result)
				{
					clearTimeout(timeout);

					success(result, true);
				});

			return $this;
		};

		$this.Authenticate = function(callback)
		{
			if(!callback || typeof callback != 'function')
			{
				return $this;
			}

			var checkready = function()
			{
				if(window['data8'] && window['data8'].addresscapture && window['data8'].emailvalidation && window['data8'].internationaltelephonevalidation)
				{
					callback.call($this);
				}
				else
				{
					setTimeout(checkready, 50);
				}
			};

			if($authed || $('script[src*="data-8.co.uk"]').lenght > 0)
			{
				return checkready(), $this;
			}

			$authed = true;

			var scr = $(document.createElement('script')).appendTo('head')[0];
				scr.onload = function()
				{
					data8.load('AddressCapture');
					data8.load('EmailValidation');
					data8.load('InternationalTelephoneValidation');

					checkready();
				};

			scr.src = 'http://webservices.data-8.co.uk/javascript/loader.ashx?key=' + $this.APIKey;

			return $this;
		};
	};

	// BriteVerify is a third party email address verification service
	window.BriteVerify = function(APIKey)
	{
		var $this = this;

		$this.APIKey = APIKey;
		$this.Cache = {};

		$this.Verify = function(email, callback, error)
		{
			if(email && typeof email == 'string' && callback && typeof callback == 'function')
			{
				if($this.Cache[email])
				{
					if(typeof $this.Cache[email] != 'object')
					{
						return $this;
					}

					if(!($this.Cache[email]['TimedOut'] || false))
					{
						callback.call($this, $this.Cache[email], true);

						return $this;
					}
				}

				$this.Cache[email] = 'loading';

				var success = function(response)
				{
					if(response && typeof response == 'object' && !response.errors)
					{
						$this.Cache[email] = response;

						callback.call($this, response, false);
					}
					else if(error && typeof error == 'function')
					{
						$this.Cache[email] = null;

						error.call($this, response);
					}
				},

				timeoutstarted = new Date * 1,

				timeout = setTimeout(function()
				{
					$this.Cache[email] =
					{
						status: 'timeout',
						RequestDuration: ((new Date * 1) - timeoutstarted) / 1000,
						TimedOut: true
					};

					success($this.Cache[email]);
				}, 5000);

				$.ajax(
				{
					data:
					{
						address: email,
						apikey: $this.APIKey
					},
					dataType: 'json',
					success: function(data)
					{
						clearTimeout(timeout);
						
						data.RequestDuration = ((new Date * 1) - timeoutstarted) / 1000;

						success(data);
					},
					type: 'get',
					url: 'http://beta.staircase.tech/api/ext/bv'
				});
			}

			return $this;
		};

		return $this;
	};

	// Create an empty global list of staircase instances
	window.Staircases = {};

	// Create the Staircase object
	window.Staircase = function(dom, options)
	{
		var $ = window.jQuery, // Capture jQuery
			$this = $(dom), // Store the DOM element
			$events = {}, // Events API
			$staircase = this, // Create a scoped global
			$scrollTop = 0, // Store the window's scrollTop
			$options = // Populate the default options object
			{
				checkboxGroups: false, // Enable/Disable checkbox group scanning
				history: false, // Enable/Disable URL hash modifications
				ID: ''.hash(8), // An optional ID string for the URL
				notifyDelay: 3, // Seconds to wait before removing the `staircase-highlight-error` class from an invalid input
				steps: '.step', // Selector for steps
				stepBlur: null, // Extra function to call when a step is hidden from view
				stepFocus: null, // Extra function to call when a step enters the view
				validate: null, // Extra function to call during validation
				APIs: // Set of options for third party API integrations
				{
					briteverify: // Briteverify email verification
					{
						APIKey: null, // API Key for the service (service is disabled if this is left blank)
						fields: '[validate="email"]', // Specify which fields to verify
						markInput: false, // Whether to markl the email input as valid/invalid depending on the returned score
						scoreFieldName: null, // The generated score field name (leave blank to default to the main field name plus scoreFieldSuffix)
						scoreFieldSuffix: '_bvscore', // The field name suffix for the verification results
						logging: false // Logging is turned off by default
					},
					data8: // Data-8 Information Validation
					{
						APIKey: null, // API Key for the service (service is disabled if this is left blank)
						logging: false // Logging is turned off by default
					}
				}
			},

		// Sandbox is a WIP
		sandbox = function($class)
		{
			return $class;
		},

		// Recursively populate the options
		pop_options = function(from, to)
		{
			for(var i in to)
			{
				if(from[i] && typeof from[i] == 'object' && typeof to[i] == 'object')
				{
					from[i] = pop_options(from[i], to[i]);
				}
				else
				{
					from[i] = to[i];
				}
			}

			return from;
		};

		// Import user-defined options
		if(options && typeof options == 'object')
		{
			$options = pop_options($options, options);
		}

		// Submit a log
		$staircase.log = function(data, type)
		{
			$.ajax(
			{
				type: 'post',
				url: 'http://beta.staircase.tech/api/log',
				data:
				{
					data: data,
					info: {screen:{width:screen.width||0,height:screen.height||0},window:{width:$(window).width()||0,height:$(window).height()||0,x:window.screenLeft||window.screenX||0,y:window.screenTop||window.screenY||0},document:{title:document.title}},
					origin: window.location.href,
					type: (type || 'unknown'),
					scver: window.$scv + ' ' + window.$scb
				}
			});

			return $staircase;
		};

		// Scroll an element into view
		$staircase.scroll = function(target, context)
		{
			target = $(target);
			context = $(context ? context : document.body);

			if(target.length == 0 || context.length == 0)
			{
				return $staircase;
			}

			if(jQuery.fn.scrollTo)
			{
				context.scrollTo(target, 500);
			}
			else if(target[0].scrollIntoView)
			{
				try
				{
					target[0].scrollIntoView(
					{
						behavior: "smooth",
						block: "start"
					});
				}
				catch(e)
				{
					target[0].scrollIntoView();
				}

				context[0].scrollTop -= 20;
			}
			else
			{
				var offset = target.offset();

				if(offset)
				{
					context.scrollTop(offset.top - 20);
				}
			}

			return $staircase;
		};

		// Events API binding
		$staircase.on = function(ev, callback)
		{
			if(ev.trim().indexOf(' ') > -1)
			{
				ev = ev.trim().split(' ');

				for(var i in ev)
				{
					$staircase.on(ev[i], callback);
				}

				return $staircase;
			}

			ev = ev.trim();

			if(!$events[ev])
			{
				$events[ev] = [];
			}

			$events[ev].push(callback);

			return $staircase;
		};

		// Events API unbinding
		$staircase.off = function(ev, callback)
		{
			if(ev.trim().indexOf(' ') > -1)
			{
				ev = ev.trim().split(' ');

				for(var i in ev)
				{
					$staircase.off(ev[i], callback);
				}

				return $staircase;
			}

			ev = ev.trim();

			if($events[ev] && $events[ev].length > 0)
			{
				$newevents = [];

				if(callback !== undeefined)
				{
					for(var i in $events[ev])
					{
						if($events[ev][i] != callback)
						{
							$newevents.push($events[ev][i]);
						}
					}
				}

				$events[ev] = $newevents;
			}

			return $staircase;
		};

		// Events API triggering
		$staircase.trigger = function(ev, data)
		{
			try
			{
				if(ev.trim().indexOf(' ') > -1)
				{
					ev = ev.trim().split(' ');

					for(var i in ev)
					{
						$staircase.trigger(ev[i], data);
					}

					return $staircase;
				}

				ev = ev.trim();

				if($events[ev] && $events[ev].length > 0)
				{
					for(var i in $events[ev])
					{
						if($events[ev][i].apply($staircase, data ? data : []) === false)
						{
							return false;
						}
					}
				}
			}
			catch(e)
			{
				if(window.console)
				{
					console.error(e);
				}
			}

			return $staircase;
		};

		// Regular Expression Store
		$staircase.Patterns =
		{
			'currency':			/^(-)?([^a-zA-Z0-9 ])?([0-9\,]+)(\.([0-9]{2,}))?$/,
			'date':
			[
				/^([0-9]{1,2})(\/|-|\.|,| )([0-9]{1,2})(\/|-|\.|,| )([0-9]{2,4})$/,
				/^((mon|monday|tue|tues|tuesday|wed|wednesday|thu|thurs|thursday|fri|friday|sat|saturday|sun|sunday)([\s]+))?([0-9]{1,2})(st|nd|rd|th)?([\s]+)?(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december)([\s]+)?([0-9]{2,4})$/i,
				/^([0-9]{2})$/,
				/^(1|2)([0-9]{3})$/,
				/^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
			],
			'datepicker':		/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
			'default':			/^(?!\s*$).+/,
			'email':			/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			'filename':			/^(([^\/\\\?%\*:|"<>]+)?\.([^\/\\\?%\*:|"<>\.]+)|([^\/\\\?%\*:|"<>\.]+))$/,
			'fullname':			/^([A-Za-z\.\-\']{2,})( ([A-Za-z\.\-\']+)){1,}$/,
			'name':				/^([ A-Za-z\.\-']+)$/,
			'number':
			[
				/^-?([0-9]+)$/,
				/^-?([0-9]+)\.([0-9]+)$/,
				/^([0-9]+)$/,
				/^([0-9]+)\.([0-9]+)$/,
				/^-?([0-9]+)(\.([0-9]+))?$/
			],
			'phone':
			[
				function(){ return this.replace(/\s/g, '').match(/^0(?!.*(\d)\1{9,})\d{9,}$/) },
				function(){ return this.replace(/\s/g, '').match(/^07(?!.*(\d)\1{9,})\d{9,}$/) },
				function(){ return this.replace(/\s/g, '').match(/^0(?!.*(\d)\1{9,})\d{9,}$/) },
				/^0(?!.*(\d)\1{9,})\d{9,}$/,
				/^07(?!.*(\d)\1{9,})\d{9,}$/,
				/^0(?!.*(\d)\1{9,})\d{9,}$/
			],
			'postcode':			/^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/,
			'time':				/^([0-9]{1,2}):([0-9]{2})(:([0-9]{2}))?([\s]+)?(am|pm)?$/i,
			'nationalphone':	/^0([1-9])(?!.*(\d)\1{6,9})\d{6,9}$/,
			'zipcode':			/^(^\d{5}$)|(^\d{5}-\d{4}$)$/
		};

		// Prevent code inflation by copying objects
		$staircase.Patterns.mobile = $staircase.Patterns.phone[1];
		$staircase.Patterns.landline =
		$staircase.Patterns.telephone = $staircase.Patterns.phone;

		// Constraints Store
		$staircase.Constraints =
		{
			'letters':		/^([^0-9])$/,
			'numbers':		/^([^a-zA-Z])$/,
			'symbols':		/^([^0-9a-zA-Z])$/
		};

		$staircase.$object = $this; // Store the DOM element
		$staircase.$current = 0; // Current step
		$staircase.Steps = []; // Prepare an empty list of steps inside this staircase

		// When the hash or history state changes (i.e. When a user clicks 'Back')
		$(window).on('hashchange popstate', function()
		{
			var regex = /^#!\/([A-Z0-9<>\!\:\;\,\.\$]{8})\/([0-9]+)$/i;

			// If the URL is blank, go back to the first step
			if(window.location.hash.match(/^#!?\/?$/))
			{
				for(var i in window.Staircases)
				{
					if(window.Staircases[i].trigger('hashchange popstate', [window.Staircases[$staircase.$current], window.location.hash]) === false)
					{
						return false;
					}

					window.Staircases[i].Steps[0].Focus();
				}
			}

			// Otherwise, find the specific staircase/step pair via the URL and show it
			else if(window.location.hash.match(regex))
			{
				var ID = window.location.hash.replace(regex, '$1'),
					step = parseInt(window.location.hash.replace(regex, '$2'));

				if(window.Staircases[ID] && window.Staircases[ID].Steps[step] && window.Staircases[ID].Steps[step].Visited)
				{
					if(window.Staircases[ID].trigger('hashchange popstate', [ID, step]) === false)
					{
						return false;
					}

					// Focus the step if it exists and has been visited before
					window.Staircases[ID].Steps[step].Focus();
				}
			}

			// Scroll the form back into view
			$(window).scrollTop($scrollTop);
		});

		// Adds a regex pattern
		$staircase.Extend = function(name, pattern)
		{
			$staircase.Patterns[name] = pattern;

			return $staircase;
		};

		// The validation function - all elements with the [validate] attribute will be passed through this function on their change events and on the form's beforesubmit event.
		// This function must return either true (the input has passed validation) or false (if it fails)
		$staircase.Validate = function(input, validate)
		{
			// Ensure `input` is a jQuery object
			if(!input)
			{
				return false;
			}

			input = $(input);

			// Retrieve the input's validation method if one is not supplied
			if(!validate)
			{
				validate = input.attr('validate');
			}

			if(validate)
			{
				// If we are dealing with email or telephone validation
				if(validate.match(/^(email|(tele|national)?phone|mobile|landline|(post|zip)code)$/))
				{
					// Strip all whitespace from the input value
					input.val(input.val().replace(/\s/g, '').trim());
				}

				// Trigger the beforevalidate event
				if($staircase.trigger('beforevalidate', [input]) === false)
				{
					return false;
				}

				// If we're dealing with a select element
				if((validate == 'select' || validate == 'selected') && input.is('select'))
				{
					var myval = input.val(),
						// Find the first <option> in the <select> and store its value to check against
						placeholder = input.find('option').first(),
						placeholderval = (placeholder.attr('value') === undefined) ? placeholder.html() : placeholder.attr('value');

					// If we're dealing with a multiple select
					if(typeof myval == 'object')
					{
						for(var i in myval)
						{
							if(myval[i] == placeholderval)
							{
								return false;
							}
						}
					}

					// Otherwise just a simple string comparison
					if(myval == placeholderval)
					{
						// Trigger the validate events
						if($staircase.trigger('aftervalidate validate', [input, false]) === true)
						{
							return true;
						}

						return false;
					}

					// Trigger the validate events
					if($staircase.trigger('aftervalidate validate', [input, true]) === false)
					{
						return false;
					}

					return true;
				}

				else
				{
					// If the validator is looking for a checkbox
					if((validate == 'checked' || validate == 'unchecked') && (input.attr('type') == 'checkbox' || input.attr('type') == 'radio'))
					{
						var // Valid if the checkbox is in the same state as the validation requirement (checked or unchecked)
							valid = !((validate == 'checked' && !input.is(':checked')) || (validate == 'unchecked' && input.is(':checked'))),
							// Trigger the validate events
							trigresponse = $staircase.trigger('aftervalidate validate', [input, valid]);

						if(trigresponse === true || trigresponse === false)
						{
							return trigresponse;
						}

						return valid;
					}
					// If the validator is looking for a radiobox with at least one box in the radio series checked
					if(validate == 'exists' && input.attr('type') == 'radio' && input.attr('name'))
					{
						var // Retrieve all checked checkboxes in the radio series
							checked = $('input[type="radio"][name="' + input.attr('name') + '"]:checked'),
							// Valid if a checked radiobox exists in the radio series
							valid = !!(checked.length > 0),
							// Trigger the validate events
							trigresponse = $staircase.trigger('aftervalidate validate', [checked, valid]);

						if(trigresponse === true || trigresponse === false)
						{
							return trigresponse;
						}

						return valid;
					}

					// Find the element's corresponding regular expression
					var exp = $staircase.Patterns,
						key = (validate.indexOf('[') > -1) ? validate.replace(/\[([0-9]+)\]/g, '\n$1').split('\n') : [validate];

					// If the validation expression exists
					if(exp)
					{
						// Climb the attibute's key list (e.g. phone[0], date[1][2][3], etc.)
						if(key.length > 1)
						{
							for(var i = 0; i < key.length; i ++)
							{
								if(exp[key[i]])
								{
									exp = exp[key[i]];
								}
								else
								{
									break;
								}
							}
						}

						else
						{
							if(typeof exp[key[0]] == 'object' && !(exp[key[0]] instanceof RegExp))
							{
								exp = exp[key[0]][0];
							}
							else
							{
								exp = exp[key[0]];
							}
						}

						if(exp && (exp instanceof RegExp || typeof exp == 'function'))
						{
							var valid = false;

							if(exp instanceof RegExp)
							{
								// Valid if the expression matches the value
								valid = !!input[0].value.match(exp);
							}
							else if(typeof exp == 'function')
							{
								// Valid if the callback returns true
								valid = !!exp.call(input[0].value);
							}

							var // Trigger the validate events
								trigresponse = $staircase.trigger('aftervalidate validate', [input, valid]);

							if(trigresponse === true || trigresponse === false)
							{
								return trigresponse;
							}

							// Use `[0].value` rather than `.val()` to accommodate for <textbox>
							return valid;
						}
					}
				}
			}

			if($options.validate && typeof $options.validate == 'function')
			{
				var // If all else fails, call the optional user defined function
					valid = !!$options.validate.call(input[0], $staircase);

				// Trigger the validate events
				$staircase.trigger('aftervalidate validate', [input, valid]);

				return valid;
			}

			return false;
		};

		// Step switching functions
		$staircase.To = function(index)
		{
			// Trigger the switch event
			$staircase.trigger('switch', [index]);

			if(index < $staircase.$current)
			{
				$staircase.Steps[index].Focus();
			}
			else if($staircase.Steps[index] && $staircase.Steps[$staircase.$current].Validate())
			{
				$staircase.Steps[index].Focus();
			}

			return $staircase;
		};

		$staircase.Next = function()
		{
			// Trigger the next event
			$staircase.trigger('switch next', [$staircase.$current + 1]);

			if($staircase.Steps[$staircase.$current + 1] && $staircase.Steps[$staircase.$current].Validate())
			{
				$staircase.Steps[$staircase.$current + 1].Focus();
			}

			return $staircase;
		};

		$staircase.Prev = function()
		{
			// Trigger the previous event
			$staircase.trigger('switch prev previous', [$staircase.$current - 1]);

			if($staircase.Steps[$staircase.$current - 1])
			{
				$staircase.Steps[$staircase.$current - 1].Focus();
			}

			return $staircase;
		};

		$staircase.AwaitSubmit = function(button)
		{
			var check = function()
			{
				if($('.awaiting-validation', $this).length > 0)
				{
					setTimeout(check, 100);

					return false;
				}

				button.removeAttr('disabled').click();
			};

			check();

			return $staircase;
		};

		// Create a subclass to manage steps
		var Step = function()
		{
			var $this = $(arguments[0]), // Store the DOM element
				$step = this, // Create a super
				$visited = null; // Cache the `Visited` state
				$toconstrain = 'input:not([type="button"], [type="submit"], [type="image"])[constrain], textarea[constrain]', // Inputs to apply constraints to
				$allinputs = 'input:not([type="button"], [type="submit"], [type="image"])[name], select[name], textarea[name]', // All form data inputs
				$inputs = 'input:not([type="button"], [type="submit"], [type="image"])[validate], select[validate], textarea[validate]', // Input selector
				$buttons = 'input[type="button"].next, input[type="button"].continue, input[type="button"].submit, input[type="submit"], button', // Continue/Submit button selector
				$backbuttons = 'input[type="button"].prev, input[type="submit"].prev, button.prev, input[type="button"].back, input[type="submit"].back, button.back'; // Back button selector

			$step.$index = arguments[1]; // Store the step index
			$step.$object = $this; // Store the DOM element
			$step.$rules = []; // Create a blank rulebook

			// The `Visited` state of a step cannot be set to a falsy value - once a step has been visited, it cannot be un-visited
			Object.defineProperty($this, 'Visited',
			{
				get: function() { return $visited },
				set: function() { $visited = (arguments[0] ? arguments[0] : true) }
			});

			// `Focus` hides all other steps, shows this step and triggers a focus event on the DOM
			$step.Focus = function(silent)
			{
				// Blur all the other Steps
				for(var i in $staircase.Steps)
				{
					$staircase.Steps[i].Blur(silent);
				}

				// If this Step isn't already in focus
				if(!$this.is(':visible'))
				{
					// Set the current index
					$staircase.$current = $step.$index;

					// Observe the Step's `Visited` state
					if(!$this.Visited)
					{
						$this.Visited = new Date();
					}

					// Try to trigger a focus event
					if(!silent)
					{
						$this.trigger('focus');
					}

					// Show the Step
					$this.show();

					// Create the URL string
					var hash = '!/' + $options.ID + '/' + $step.$index;

					// Keep the current scroll position
					$scrollTop = $(window).scrollTop();

					// Update the URL
					if($step.$index > 0 && window.location.hash != '#' + hash)
					{
						location.hash = hash;
					}
					else if($step.$index == 0)
					{
						location.hash = '!/';
					}

					// Trigger the stepfocus event
					$staircase.trigger('stepfocus', [$step]);
				}

				return $step;
			};

			// `Blur` hides the step and triggers a blur event on the DOM
			$step.Blur = function(silent)
			{
				// If this Step isn't already hidden
				if($this.is(':visible'))
				{
					// Try to trigger a blur event
					if(!silent)
					{
						$this.trigger('blur');
					}

					// Hide the Step
					$this.hide();

					// Trigger the stepblur event
					$staircase.trigger('stepblur', [$step]);
				}

				return $step;
			};

			// Perform validation
			$step.Validate = function(input, forcevalid)
			{
				if(!input)
				{
					var result = true;

					$this.find($inputs).each(function()
					{
						if($(this).attr('optional'))
						{
							if($(this).val().trim() && !$step.Validate(this))
							{
								result = false;
							}
						}
						else if(!$step.Validate(this))
						{
							result = false;
						}
					});

					return result;
				}

				input = $(input);

				// Trigger the beforestepvalidate event
				if($staircase.trigger('beforestepvalidate', [$step, input]) === false)
				{
					return false;
				}

				var valid = (forcevalid !== undefined) ? (!!forcevalid) : (input.attr('optional') ? (!input.val().trim() || !!$staircase.Validate(input)) : !!$staircase.Validate(input)), // Convert the validation result to a boolean
					label = input.closest('label').length ? input.closest('label') : ((input.attr('id') && $('label[for="' + input.attr('id') + '"]').length) ? $('label[for="' + input.attr('id') + '"]') : false), // Find this input's label
					apply = $(label ? label.add(input) : input);

				// Remove the error classes
				apply.removeClass('staircase-has-error staircase-highlight-error');

				// If this input is not valid
				if(!valid)
				{
					// Apply the error classes
					apply.addClass('staircase-has-error staircase-highlight-error');

					// Remove the error notification class
					apply.data('notify-timeout', setTimeout(function()
					{
						apply.removeClass('staircase-highlight-error');
					},

					// If the delay is larger than 300 (5 minutes), interpret it as milliseconds. Otherwise, interpret as seconds and adjust
					$options.notifyDelay > 300 ? $options.notifyDelay : ($options.notifyDelay * 1000)));

					// Trigger the stepvalidate event
					$staircase.trigger('stepvalidate', [$step, false]);

					return false;
				}

				// Clear the notification class timer so that no classes are unintentionally removed in the near future
				if(apply.data('notify-timeout'))
				{
					window.clearTimeout(apply.data('notify-timeout'));
				}

				// Trigger the stepvalidate event
				$staircase.trigger('stepvalidate', [$step, true]);

				return true;
			};

			// Add a condition to the rulebook
			$step.Condition = function(code)
			{
				if(typeof code != 'function' && typeof code != 'string')
				{
					return $step;
				}

				var args = ['Staircase', 'Step', '$'],
					inputs = {};

				$this.find('input:not([type="button"], [type="submit"], [type="image"])[name], textarea[name], select[name]').each(function()
				{
					var name = $(this).attr('name');

					if(inputs[name])
					{
						if(inputs[name].length === undefined)
						{
							inputs[name] = [inputs[name]];
						}

						inputs[name].push(this);
					}
					else
					{
						args.push(name);
						inputs[name] = this;
					}
				});

				// Trigger the addcondition event
				$staircase.trigger('addcondition', [$step, $step.$rules.push(
				{
					callback: (typeof code == 'function') ? code : new Function(args, code),
					inputs: inputs
				}) - 1]);

				return $step;
			};

			// Bind constraints
			$this.on('keydown', $toconstrain, function(e)
			{
				var input = $(this),
					constraint = input.attr('constrain');
					constraint = $staircase.Constraints[constraint] ? $staircase.Constraints[constraint] : null;

				// Convert the pressed key to its character. If the key pressed is on the keypad, convert it to a number key
				if(constraint && !String.fromCharCode(e.keyCode >= 96 && e.keyCode <= 105 ? (e.keyCode - 48) : e.keyCode).match(constraint))
				{
					// Trigger the constrained event
					$staircase.trigger('constrained', [input, constraint]);

					return false;
				}
			});

			$this.on('focus blur keyup keydown change paint', $inputs, function(e)
			{
				var input = $(this),
					apply = input.closest('label');

				apply = (apply.length == 0 && input.attr('name')) ? $('label[for="' + input.attr('name') + '"]') : apply;
				apply = (apply.length > 0) ? apply.add(input) : input;

				switch(e.type)
				{
					case 'focusin': apply.addClass('focus'); break;
					case 'focusout': apply.removeClass('focus'); break;
					default: apply[input.val().trim() ? 'removeClass' : 'addClass']('empty'); break;
				}
			});

			$($inputs).trigger('paint');

			// Bind each validatable input field within this step to the validate function
			$this.on('change validate', $inputs, function()
			{
				var input = $(this),
					label = input.closest('label'),
					apply = $(label ? label.add(input) : input);

				if($options.APIs.briteverify.APIKey && input.filter(function()
				{
					var fields = $options.APIs.briteverify.fields,
						valid = false;

					if(typeof fields == 'string')
					{
						if(fields.indexOf(',') > -1)
						{
							fields = fields.split(', ');
						}
						else
						{
							fields = [fields];
						}
					}

					fields.push('*[bv-score]');

					for(var i in fields)
					{
						if(fields[i].trim())
						{
							valid = valid ? true : input.is(fields[i].trim());
						}
					}

					return valid;
				}).length && $staircase.Validate(input[0], 'email'))
				{
					// Trigger the beforebriteverify event
					if($staircase.trigger('beforebriteverify', [input]) === false)
					{
						return false;
					}

					var scoreFieldName = input.attr('bv-score') ? input.attr('bv-score') : ($options.APIs.briteverify.scoreFieldName ? $options.APIs.briteverify.scoreFieldName : input.attr('name') + ($options.APIs.briteverify.scoreFieldSuffix || '_score')),
						scoreField = ($('input[name="' + scoreFieldName + '"]').length > 0) ? $('input[name="' + scoreFieldName + '"]') : input.data('briteverify-scorefield');

					if(!scoreField)
					{
						scoreField = $('<input type="hidden" tabindex="-1" name="' + scoreFieldName + '" />')
							.insertAfter(input)
							.on('focus', function()
							{
								input.focus()
							});
					}

					input.data('briteverify-scorefield', scoreField);

					// Tell staircase to wait for this input to validate
					apply.addClass('awaiting-validation');

					// If BriteVerify has not yet been initialised
					if(!$staircase.BriteVerify)
					{
						// Create a BriteVerify instance
						$staircase.BriteVerify = new BriteVerify($options.APIs.briteverify.APIKey);
					}

					$staircase.BriteVerify.Verify(input[0].value, function(result, cached)
					{
						// Staircase no longer needs to wait for this input
						apply.removeClass('awaiting-validation');

						// If the response object does not contain a solid verifiable boolean
						if(typeof result != 'object' || result.status === undefined)
						{
							// Cancel the script
							return;
						}

						// If we need to mark the original input as valid/invalid
						if($options.APIs.briteverify.markInput)
						{
							// If the input value is valid
							if(result.status.trim().toLowerCase() != 'invalid')
							{
								// Remove the error classes
								apply.removeClass('staircase-has-error staircase-highlight-error');

								// Run staircase validation with a forced value to tell the step if it can continue or not
								$step.Validate(input[0], true);
							}
							else
							{
								// Apply the error classes
								apply.addClass('staircase-has-error staircase-highlight-error');

								// Remove the error notification class after a delay
								input.data('notify-timeout', setTimeout(function()
								{
									apply.removeClass('staircase-highlight-error');
								},

								// If the delay is larger than 300 (5 minutes), interpret it as milliseconds. Otherwise, interpret as seconds and adjust
								$options.notifyDelay > 300 ? $options.notifyDelay : ($options.notifyDelay * 1000)));

								// Run staircase validation with a forced value to tell the step if it can continue or not
								$step.Validate(input[0], false);
							}
						}
						else
						{
							// Run staircase validation with a forced value to tell the step if it can continue or not
							$step.Validate(input[0], !(result.status.trim().toLowerCase() == 'invalid'));
						}

						// If logging is enabled
						if(options.APIs.briteverify.logging && !cached)
						{
							// Log the response
							$staircase.log(
							{
								response: result,
								input: input.val()
							}, 'briteverify');
						}

						// Trigger the briteverify event
						$staircase.trigger('briteverify', [input, result.status, result]);

						// Update the score field
						scoreField.val(result.status);
					});
				}
				// If the input utilizes Data8 integration
				else if((input.attr('d8') || input.attr('d8-lookup-street')) && input[0].value && $options.APIs.data8 && $options.APIs.data8.APIKey)
				{
					// If the input requires extra Data8 validation
					if(input.attr('d8'))
					{
						// If the input passes primary validation
						if($step.Validate(input[0]))
						{
							// Tell staircase to wait for this input to validate
							apply.addClass('awaiting-validation');

							// Trigger the beforedata8 event
							if($staircase.trigger('beforedata8', [input]) === false)
							{
								// Cancel the await request
								return apply.removeClass('awaiting-validation'), false;
							}

							// If Data8 has not yet been initialised
							if(!$staircase.Data8)
							{
								// Create a Data8 instance
								$staircase.Data8 = new Data8API($options.APIs.data8.APIKey, $options.APIs.data8.License);
							}

							// Authenticate the Data8 API if it has not been already
							$staircase.Data8.Authenticate(function()
							{
								// When a response is received from Data8
								$staircase.Data8.Verify(input.val().trim(), input.attr('d8'), function(response, cached)
								{
									// Staircase no longer needs to wait for this input
									apply.removeClass('awaiting-validation');

									// If the response object does not contain a solid verifiable boolean
									if(typeof response != 'object' || response.IsValid === undefined)
									{
										// Cancel the script
										return;
									}

									// If the input value is valid
									if(response.IsValid)
									{
										// Remove the error classes
										apply.removeClass('staircase-has-error staircase-highlight-error');

										// Run staircase validation with a forced value to tell the step if it can continue or not
										$step.Validate(input[0], true);
									}
									else
									{
										// Apply the error classes
										apply.addClass('staircase-has-error staircase-highlight-error');

										// Remove the error notification class after a delay
										input.data('notify-timeout', setTimeout(function()
										{
											apply.removeClass('staircase-highlight-error');
										},

										// If the delay is larger than 300 (5 minutes), interpret it as milliseconds. Otherwise, interpret as seconds and adjust
										$options.notifyDelay > 300 ? $options.notifyDelay : ($options.notifyDelay * 1000)));

										// Run staircase validation with a forced value to tell the step if it can continue or not
										$step.Validate(input[0], false);
									}

									// If logging is enabled
									if(options.APIs.data8.logging && !cached)
									{
										// Log the response
										$staircase.log(
										{
											response: response,
											input: input.val()
										}, 'data8');
									}

									// Trigger the data8 event
									$staircase.trigger('data8', [input, response.IsValid, response]);
								});
							});
						}
					}
					// If the input needs to call an address lookup
					else if(input.attr('d8-lookup-street'))
					{
						var lastvalidated = input.data('d8-postcode-validated-successfully');

						if(!lastvalidated || lastvalidated != input.val().replace(/[^a-zA-Z0-9]/g, '').toUpperCase())
						{
							var // Get the target input
								lookuptarget = $('*[name="' + input.attr('d8-lookup-street').trim() + '"]'),
								lookupcity = input.attr('d8-lookup-city') || '';

							if(lookupcity)
							{
								lookupcity = $('*[name="' + lookupcity.trim() + '"]');

								if(lookupcity.length == 0)
								{
									lookupcity = $('<input type="hidden" name="' + input.attr('d8-lookup-city') + '" />').insertAfter(lookuptarget);

									$staircase.trigger('data8lookupcityappended', [input, lookupcity]);
								}
							}

							// If the input passes validation
							if($step.Validate(input[0]))
							{
								// Tell staircase to wait for this input to validate
								apply.addClass('awaiting-validation');

								// Trigger the beforedata8lookup event
								if($staircase.trigger('beforedata8lookup', [input, lookuptarget]) === false)
								{
									// Cancel the await request
									return apply.removeClass('awaiting-validation'), false;
								}

								// If Data8 has not yet been initialised
								if(!$staircase.Data8)
								{
									// Create a Data8 instance
									$staircase.Data8 = new Data8API($options.APIs.data8.APIKey, $options.APIs.data8.License);
								}

								// Authenticate the Data8 API if it has not been already
								$staircase.Data8.Authenticate(function()
								{
									// When a response is received from Data8
									$staircase.Data8.Lookup(input[0].value, function(response, postcode, cached)
									{
										// Staircase no longer needs to wait for this input
										apply.removeClass('awaiting-validation');

										// If the response object does not contain a solid verifiable boolean
										if(typeof response != 'object' || response.IsValid === undefined)
										{
											// Cancel the script
											return;
										}

										// Clean up the postcode
										postcode = postcode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

										if(!response.IsValid)
										{
											// Run staircase validation with a forced value to tell the step if it can continue or not
											return $step.Validate(input[0], false), false;
										}
										else
										{
											input.data('d8-postcode-validated-successfully', input.val().replace(/[^a-zA-Z0-9]/g, '').toUpperCase());

											$step.Validate(input[0], true);
										}

										var // A list of attributes to carry over from the target to its selectbox counterpart
											attrs = ['class', 'id', 'name', 'style'];

										// Iterate through possible multiple targets
										lookuptarget.each(function()
										{
											var // Keep the current target
												curr = $(this),
												sel = curr;

											if(!curr.data('current-postcode') || curr.data('current-postcode') != postcode)
											{
												// If the current target has not yet been converted to a select box
												if(!curr.is('select'))
												{
													sel = $('<select validate="selected"></select>').on('change', function()
													{
														if(this.value == 'N/A')
														{
															lookuptarget.each(function()
															{
																var s = $(this).data('select-counterpart');

																$(this).insertAfter(s);
																s.remove();
															})
															.first().focus();
														}
														else
														{
															var option = $(this).find('option[value="' + this.value + '"]');

															if(lookupcity)
															{
																lookupcity.val(option.attr('city'));
															}
														}
													});

													for(var i in attrs)
													{
														if(curr.is('[' + attrs[i] + ']'))
														{
															sel.attr(attrs[i], curr.attr(attrs[i]));
														}
													}

													sel.insertAfter(curr).data('original', curr);
													curr.data('select-counterpart', sel).detach();
												}

												sel
													.data('current-postcode', postcode)
													.html('<option value="">Please Select Your Address...</option>');

												for(var i in response.Results)
												{
													var addr = [],
														trueaddr = [];

													for(var j = 0; j < (response.Results[i].Address.Lines.length - 1); j ++)
													{
														var ln = response.Results[i].Address.Lines[j];

														if(j < 2)
														{
															if (ln != "") {
																addr.push(ln);
															}
														}

														trueaddr.push(ln);
													}

													addr = addr.join(', ');

													sel.append('<option value="' + addr + '" city="' + trueaddr[3] + '">' + addr + '</option>');

													if(lookupcity && trueaddr[3] && lookupcity[0].value != trueaddr[3])
													{
														lookupcity.val(trueaddr[3]);
													}
												}

												sel.append('<option value="N/A">My address is not listed here</option>');
											}
										});

										// If logging is enabled
										if(options.APIs.data8.logging && !cached)
										{
											// Log the response
											$staircase.log(
											{
												response: response,
												input: input.val()
											}, 'data8-address-lookup');
										}

										// Trigger the data8lookup event
										$staircase.trigger('data8lookup', [input, response]);
									});
								});
							}
						}
					}
				}
				else
				{
					// Run staircase validation to tell the step if it can continue or not
					$step.Validate(input[0]);
				}
			});

			$this.on('click', $backbuttons, function()
			{
				if(!$(this).is($buttons))
				{
					// Trigger the back event
					if($staircase.trigger('back', [$step, $(this)]) === false)
					{
						return false;
					}

					if($step.$index > 0)
					{
						$staircase.Steps[$step.$index - 1].Focus();
					}

					return false;
				}
			});

			$this.on('click', $buttons, function()
			{
				if(!$(this).is($backbuttons))
				{
					var // Script don't fail me now!
						failed = false;

					// Trigger the beforesubmit event
					if($staircase.trigger('beforesubmit', [$step, $(this)]) === false)
					{
						return false;
					}

					// trigger validation on each input
					$this.find($inputs).trigger('validate');

					// If validation has passed (or been ignored) check for checkbox groups
					if($options.checkboxGroups)
					{
						// If a selector has been specified, search for it. Fallback to `.checkbox-group`, then to the Step's DOM Element.
						$((typeof $options.checkboxGroups == 'string') ? $this.find($options.checkboxGroups) : (($this.find('.checkbox-group').length) > 0 ? $this.find('.checkbox-group') : $this)).each(function()
						{
							var // Store a reference to this group
								group = $(this);

							// If the group does not contain any other type of input, we can continue with the validation
							if(group.find('input:not([type="button"], [type="submit"], [type="image"]), select, textbox').length == group.find('input[type="checkbox"]').length)
							{
								// If no checkboxes within the group are checked
								if(group.find('input[type="checkbox"]:checked').length == 0)
								{
									// Apply the error classes
									group.addClass('staircase-has-error staircase-highlight-error');

									// Remove the error notification class
									group.data('notify-timeout', setTimeout(function()
									{
										group.removeClass('staircase-highlight-error');
									},

									// If the delay is larger than 300 (5 minutes), interpret it as milliseconds. Otherwise, interpret as seconds and adjust
									$options.notifyDelay > 300 ? $options.notifyDelay : ($options.notifyDelay * 1000)));
								}

								// Otherwise, remove the error classes
								else
								{
									// Remove the error classes
									group.removeClass('staircase-has-error staircase-highlight-error');

									// Clear the notification class timer so that no classes are unintentionally removed in the near future
									if(group.data('notify-timeout'))
									{
										window.clearTimeout(group.data('notify-timeout'));
									}
								}
							}
						});
					}

					if($this.is('.staircase-has-error, .awaiting-validation') || $this.find('.staircase-has-error, .awaiting-validation').length > 0)
					{
						if($this.is('.awaiting-validation') || $this.find('.awaiting-validation').length > 0)
						{
							$staircase.AwaitSubmit($(this).attr('disabled', true));

							return false;
						}

						// Trigger the submitfailed event
						$staircase.trigger($step.$object.is('.step:last') ? 'submitfailed' : 'nextfailed continuefailed', [$step, $this.find('.staircase-has-error, .awaiting-validation')]);

						// Scroll to the first error
						$staircase.scroll($('.staircase-has-error, .awaiting-validation').first());

						// If there are any errors, cancel the submit event
						failed = true;
					}

					// Process any hard-coded rules
					var ruleresult = true;

					if($step.$rules.length > 0)
					{
						var rules = $step.$rules;

						for(var i in rules)
						{
							var rule = rules[i],
								// Prepare the Staircase and Step arguments as sandboxed functions with limited access to Staircase
								args = [sandbox($staircase), sandbox($step), window.jQuery];

							// Loop through the inputs that were present when the rule was set up (to prevent any hacking or muddling)
							for(var j in rule.inputs)
							{
								var input = $(rule.inputs[j]);

								// Check for checkboxes or radio boxes
								if(input.length > 1)
								{
									input = input.filter(function()
									{
										return (($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio') && !$(this).is(':checked')) ? false : true;
									});
								}

								// Add the input's value to the rule arguments
								args.push((input.length > 0) ? input : undefined);
							}

							// Execute the rule
							if(rule.callback.apply(rule, args) === false)
							{
								ruleresult = false;
							}
						}
					}

					if(!ruleresult)
					{
						// Trigger the submitfailed event
						$staircase.trigger($step.$object.is('.step:last') ? 'submitfailed' : 'nextfailed continuefailed', [$step]);

						// Scroll to the first error
						$staircase.scroll($('.staircase-has-error, .awaiting-validation').first());

						failed = true;
					}

					if(failed)
					{
						return false;
					}

					// If this is NOT the last step, focus the next step and cancel the submit event
					if($staircase.Steps.length > ($step.$index + 1))
					{
						// Trigger the next events
						if($staircase.trigger('next continue', [$step, $staircase.Steps[$step.$index + 1]]) === false)
						{
							return false;
						}

						return $staircase.Steps[$step.$index + 1].Focus(), false;
					}

					// If there is no form, default to debug
					if(!$this.closest('form').length && window.console)
					{
						console.log('%cStaircase Submit Event:', 'font-weight: bold; font-size: 1.2em; color: #333;');
						console.log('%cYou are seeing this table because no submissible <form> element was found in the DOM.', 'font-size: .8em;');
						console.log(' ');

						var table = [];

						$($allinputs).each(function()
						{
							table.push(
							{
								Field: $(this).attr('name'),
								Value: String(this.value).trim().match(/^-?([0-9]+)(\.([0-9]+))?$/) ? parseFloat(this.value) : this.value,
								Type: (typeof this.value == 'object') ? 'object' : (String(this.value).trim().match(/^-?([0-9]+)(\.([0-9]+))$/) ? 'float' : (String(this.value).trim().match(/^-?([0-9]+)$/) ? 'int' : 'string'))
							});
						});

						if(window.console.table)
						{
							console.table(table, ['Field', 'Value', 'Type']);
						}
						else
						{
							console.log(table);
						}

						// Trigger the debug event
						$staircase.trigger('debug', [$staircase, $step]);
					}

					// Trigger the submit event
					if($staircase.trigger('submit', [$staircase]) === false)
					{
						return false;
					}
				}
			});

			// If checkbox groups are enabled
			if($options.checkboxGroups)
			{
				// If a selector has been specified, search for it. Fallback to `.checkbox-group`, then to the Step's DOM Element.
				$((typeof $options.checkboxGroups == 'string') ? $this.find($options.checkboxGroups) : (($this.find('.checkbox-group').length) > 0 ? $this.find('.checkbox-group') : $this)).on('change', 'input[type="checkbox"]', function()
				{
					// If this checkbox is checked
					if($(this).is(':checked'))
					{
						// Remove this checkbox group's error class
						$(this).closest('.staircase-has-error').removeClass('staircase-has-error');
					}
				});
			}

			$this.find('script[type="staircase/condition"]').each(function()
			{
				$step.Condition($(this).html());
			}).remove();

			return $step; // Supply the resulting step object
		};

		// Find each step within this Staircase and assign it a Step object
		$this.find($options.steps).each(function()
		{
			$staircase.Steps.push(new Step(this, arguments[0]).Blur(true)); // Save the step to the list
		});

		// Show the first step without triggering an event
		$staircase.Steps[0].Focus(true);

		// Add this instance to the global list
		window.Staircases[$options.ID] = $staircase;

		return $staircase; // Supply the resulting staircase object
	};
})();
