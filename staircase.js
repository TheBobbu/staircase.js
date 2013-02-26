
/* Staircase - AMP form step and validation management
 * Version 2.4a3
 */

// Add some essential instant-css
document.write('<style type="text/css">var, #sc-title, .condition { display: none; } .staircase, .step, .indicator { display: block; } .pip, .result { display: inline-block; } .error { border-color: #f00; border-radius: 2px; } label.error { border-width: 1px; border-style: solid; }</style>');

// Initialize the jQuery library if it has not already been included
if(!window.jQuery)document.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>');var staircase=

// Define the staircase class
{
  // Function to fire when the class is initialized
	__construct__: function($)
	{
		var docTitle = (($('#sc-title').size() > 0 ? $('#sc-title').hide().html() : false) || null);
		if(!docTitle) docTitle = $('h1').first().html();
		if(!docTitle) docTitle = $('img').first().attr('alt');
		if(!docTitle) docTitle = $('h2').first().html();
		if(!docTitle) docTitle = window.location.href;

		document.title = docTitle;

		$('input[type="text"], input[type="password"], input[type="file"], textarea, select').attr('bypass_validation', '1');

		staircase.init.call(this, $);
	},

	// Validation Definitions
	validation:
	{
		email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
		firstName: /^([A-Za-z\.-]+)$/,
		lastName: /^([A-Za-z\.-]+)$/,
		name: /^([ A-Za-z\.]+)$/,
		telephone: /^(\+([0-9]{1,5})|0)(?!.*(\d)\1{7,})\d{7,}$/,
		mobile: /^(\+([0-9]{1,5})|07)(?!.*(\d)\1{7,})\d{7,}$/,
		number: /^([0-9]+)$/,
		currency: /^([0-9\,]+)(\.([0-9]{2}))?$/,
		USzipcode: /^(^\d{5}$)|(^\d{5}-\d{4}$)$/,
		UKpostcode: /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/,
		timeSuffix: /^(am|pm)$/i,
		filename: /^(([^\/\\\?%\*:|"<>]+)?\.([^\/\\\?%\*:|"<>\.]+)|([^\/\\\?%\*:|"<>\.]+))$/,
		select: '-- Please Select --',
		'default': /^(?!\s*$).+/
	},

	// Generic Validation Messages
	validation_strings:
	{
		email: 'Please enter a valid email address.',
		firstName: 'Please enter a valid first name.',
		lastName: 'Please enter a valid last name.',
		name: 'Please enter a valid name.',
		telephone: 'Please enter a valid telephone number of 10 or 11 digits beginning with 0, including your area code. Mobile numbers must begin with 07.',
		mobile: 'Please enter a valid mobile telephone number of 10 or 11 digits beginning with 07.',
		number: 'Please enter a valid integer.',
		currency: 'Please enter a valid price.',
		USzipcode: 'Please enter a valid US Zipcode.',
		UKpostcode: 'Please enter a valid UK Postcode.',
		timeSuffix: 'Please enter either AM or PM.',
		filename: 'Please enter a valid filename.',
		select: 'Please select an option from the highlighted menu.',
		'default': 'Please ensure all highlighted fields are filled in correctly.'
	},

	conditions_glob_alert: [],
	parse_conditions: function($, step)
	{
		var cont = true;

		staircase.conditions_glob_alert = [];

		if(!step)
		{
			$('.staircase .condition').hide();
		}
		else
		{
			$(step).find('.condition').each(function()
			{
				var alert_msg = $(this).html() ? $(this).html().replace(/(\r\n|\r|\n|<br \/>|<br\/>|<br>)/i, '\n') : null,
				failed_action = $(this).attr('on-failed') ? new Function(['$'], $(this).attr('on-failed')) : null,
				passed_action = $(this).attr('on-passed') ? new Function(['$'], $(this).attr('on-passed')) : null,

				test_value = ($($(this).attr('input')).size() > 0 ? $($(this).attr('input'))[0].value : null),

				value_is = $(this).attr('value') ? $(this).attr('value') : null,
				value_not = $(this).attr('value-not') ? $(this).attr('value-not') : null;

				if(test_value != null)
				{
					if(value_is == null && value_not == null) value_not = '';

					if(value_is == null)
					{
						if(test_value == value_not)
						{
							if(failed_action) failed_action.call($($(this).attr('input'))[0], $);
							if(alert_msg) staircase.conditions_glob_alert.push(alert_msg);

							cont = false;
						}
						else
						{
							if(passed_action) passed_action.call($($(this).attr('input'))[0], $);
						}
					}
					else
					{
						if(test_value != value_is)
						{
							if(failed_action) failed_action.call($($(this).attr('input'))[0], $);
							if(alert_msg) staircase.conditions_glob_alert.push(alert_msg);

							cont = false;
						}
						else
						{
							if(passed_action) passed_action.call($($(this).attr('input'))[0], $);
						}
					}
				}
			});
		}

		if(staircase.conditions_glob_alert != '')
		{
			var alert_msgs = [];

			$.each(staircase.conditions_glob_alert, function(i, el)
			{
				if($.inArray(el, alert_msgs) === -1) alert_msgs.push(el);
			});

			alert('Information:\n' + alert_msgs.join('\n'));
		}

		return cont;
	},

	update_indicator: function(Staircase, $)
	{
		if($(Staircase).find('.indicator').size() <= 0) return;

		$(Staircase).find('.indicator .pips .pip').removeClass('active');
		
		for(var i = 0; i < ($(Staircase).find('.step:visible').index() + 1); i ++)
		{
			$(Staircase).find('.indicator .pips .pip').eq(i).addClass('active');
		}
		
		$(Staircase).find('.indicator').attr('class', 'indicator step-' + i);
		
		$(Staircase).find('.indicator .current-step').html(($(Staircase).find('indicator').attr('step-prefix') ? $(Staircase).find('.indicator').attr('step-prefix') : '') + i);
		
		$(Staircase).find('.indicator .pips .pip').each(function()
		{
			$(this).css(
			{
				left: ($(this).index() / ($(Staircase).find('.indicator .pips .pip').size() - 1) * 100) + '%',
				margin: '0 0 0 -' + ($(this).width() / 2) + 'px'
			}).html($(this).closest('.indicator').attr('pip-html') ? $(this).closest('.indicator').attr('pip-html').replace('{s}', $(this).index() + 1) : '');
		});
	},

	next: function(count)
	{
		for(var i = 0; i < count; i ++)
			staircase.next_step.call(this, $(this).closest('.staircase'), $, true);
	},
	
	next_step: function(Staircase, $, bypass_validation)
	{
		if(!bypass_validation)
		{
			$(this).closest('.step').find('[validate]').each(function()
			{
				$(this).trigger('change');
			});
		}
		
		if($(this).closest('.step').find('.error:not([not-required])').size() > 0)
		{
			var errorStr = [];

			$(this).closest('.step').find('.error:not([not-required])').each(function()
			{
				if($(this).attr('on-failed'))
				{
					var newFunc = new Function(['Staircase', '$'], String($(this).attr('on-failed')));

					newFunc.call(this, $(this).closest('.staircase'), $);
				}

				if($(this).attr('on-failed-alert'))
				{
					errorStr.push($(this).attr('on-failed-alert'));
				}
				else if(staircase.validation_strings[$(this).attr('validate')])
				{
					errorStr.push(staircase.validation_strings[$(this).attr('validate')]);
				}
			});

			if(errorStr.length > 0)
				errorStr = errorStr.join('\n') + '\n';
			else
				errorStr = '';

			errorStr += '-\nPlease correct the errors above and try again.';

			alert('Oops! - Validation Error:\n-\n' + errorStr);
			
			return false;
		}

		if(!staircase.parse_conditions($, $(this).closest('.step'))) return false;
		
		if($(Staircase).find('.step:visible').attr('onhide'))
		{
			var new_func = new Function(['$'], $(Staircase).find('.step:visible').attr('onhide'));

			new_func.call($(Staircase).find('.step:visible')[0], $);
		}

		$(Staircase).find('.step:visible').hide().next('.step').show().find('input[type="text"], input[type="password"], textarea').first().focus();
		
		if($(Staircase).find('.step:visible').attr('onshow'))
		{
			var new_func = new Function(['$'], $(Staircase).find('.step:visible').attr('onshow'));

			new_func.call($(Staircase).find('.step:visible')[0], $);
		}

		staircase.update_indicator(Staircase, $);
	},

	back: function(count)
	{
		for(var i = 0; i < count; i ++)
			staircase.prev_step.call(this, $(this).closest('.staircase'), $, true);
	},
	
	prev_step: function(Staircase, $, bypass_validation)
	{
		if(!bypass_validation)
		{
			$(this).closest('.step').find('[validate]').each(function()
			{
				$(this).trigger('change');
			});
		}
		
		$(Staircase).find('.step:visible').hide().prev('.step').show();
		
		if($(Staircase).find('.step:visible').size() <= 0) $(Staircase).find('.step').first().show();

		$(Staircase).find('.step:visible').find('input[type="text"], input[type="password"], textarea').first().focus();

		staircase.update_indicator(Staircase, $);
	},

	skipTo: function(step)
	{
		$('.staircase').find('.step:visible').hide();
		$('.staircase').find('.step').eq(step - 1).show();
	},
		
	init: function($)
	{
		function ucfirst(string)
		{
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		staircase.parse_conditions($);
		
		$('.staircase').each(function()
		{
			var Staircase = this;

			$(Staircase).find('.step').not($(Staircase).find('.step').first()).hide();
			
			$(Staircase).find('.step').each(function()
			{
				$(Staircase).find('.indicator .pips').append('<span class="pip" />');
			});
			
			$(Staircase).find('.step').hide().first().show();
			
			staircase.update_indicator(Staircase, $);
			
			$(Staircase).find('input.next-button').each(function()
			{
				$(this).click(function()
				{
					staircase.next_step.call(this, Staircase, $);
					
					return false;
				});
			});
			
			$(Staircase).find('input.prev-button').each(function()
			{
				$(this).click(function()
				{
					staircase.prev_step.call(this, Staircase, $);
					
					return false;
				});
			});
			
			$(Staircase).find('.result').each(function()
			{
				var input_name = $(this).attr('input'),
				input = $(Staircase).find('[name="' + input_name + '"]');
				
				if(!$(input).is('input') && !$(input).is('select') && !$(input).is('textarea')) return;
				
				$(input).bind('change', function()
				{
					$(Staircase).find('.result[input="' + input_name + '"]').hide().filter('[value="' + $(this)[0].value.replace('"', '\\"') + '"]').show();
				}).trigger('change');
			});

			$(Staircase).find('input[type="checkbox"][validate="checked"]').each(function()
			{
				$(this).bind('change', function()
				{
					if(!$(this).is(':checked'))
					{
						$(this).addClass('error').closest('label').attr('title', 'Validation Errors: Please ensure you have checked the checkbox to continue.').addClass('error');
					}
					else
					{
						$(this).removeClass('error').closest('label').removeAttr('title').removeClass('error');
					}
				});
			});

			$(Staircase).find('select[validate]').each(function()
			{
				$(this).find('option[selected]').removeAttr('selected');

				$(this)
				.prepend('<option selected="selected">' + staircase.validation.select + '</option>')
				.bind('change', function()
				{
					if($(this).val() == staircase.validation.select)
					{
						$(this).attr('title', 'Validation Errors: Please Select an Option').addClass('error');
					}
					else
					{
						$(this).removeAttr('title').removeClass('error');
					}
				});
			});

			$(Staircase).find('input[validate], textarea[validate]').bind('change', function()
			{
				if(staircase.validation[$(this).attr('validate')])
				{
					if(!$(this)[0].value.match(staircase.validation[$(this).attr('validate')]))
					{
						$(this).attr('title', 'Validation Errors: ' + ucfirst($(this).attr('validate'))).addClass('error');
					}
					else
					{
						$(this).removeAttr('title').removeClass('error');
					}
				}
				else
				{
					var valdt = String($(this).attr('validate')).split(':');

					if(valdt[0] == 'confirm')
					{
						if($(this).val() != $(valdt[1]).val())
						{
							$(this).attr('title', 'Validation Errors: Please confirm this field.').addClass('error');
						}
						else
						{
							$(this).removeAttr('title').removeClass('error');
						}
					}
				}
			});
			
			$(Staircase).find('input[type="text"], input[type="password"]').bind('keyup', function(e)
			{
				if(e.keyCode == 13)
				{
					if($(this).closest('.step').index() == ($(this).closest('.staircase').find('.step').size() - 1))
					{
						$(this).closest('.staircase').find('input[type="submit"], button:not([onclick])').last().click();
					}
					else
					{
						staircase.next_step.call($(Staircase).find('.step:visible').find('input').first(), Staircase, $);
					}

					return false;
				}
			});

			$(Staircase).find('input[type="submit"], button:not([onclick])').each(function()
			{
				if(($(this).is('button') && !$(this).parent().is('a')) || $(this).is('input[type="submit"]'))
				{
					$(this).click(function()
					{
						$(this).closest('.staircase').find('[validate]').each(function()
						{
							var steps_limit = $(this).closest('.staircase').find('step:visible').index();

							if($(this).closest('.step').index() <= steps_limit) $(this).trigger('change');
						});

						if($(this).closest('.step').find('.error:not([not-required])').size() > 0)
						{
							var errorStr = [];

							$(this).closest('.step').find('.error:not([not-required])').each(function()
							{
								if($(this).attr('on-failed'))
								{
									var newFunc = new Function(['Staircase', '$'], String($(this).attr('on-failed')));

									newFunc.call(this, $(this).closest('.staircase'), $);
								}

								if($(this).attr('on-failed-alert'))
								{
									errorStr.push($(this).attr('on-failed-alert'));
								}
								else if(staircase.validation_strings[$(this).attr('validate')])
								{
									errorStr.push(staircase.validation_strings[$(this).attr('validate')]);
								}
							});

							if(errorStr.length > 0)
								errorStr = errorStr.join('\n') + '\n';
							else
								errorStr = '';

							errorStr += '-\nPlease correct the errors above and try again.';

							alert('Oops! - Validation Error:\n-\n' + errorStr);
							
							return false;
						}

						if(!staircase.parse_conditions($, $(this).closest('.step'))) return false;

						return true;
					});
				}
			});
		});
	}
}

// Loads the class when jQuery is ready
,waitforjquery,dofinaljquery;window.onload=waitforjquery=function(){setTimeout(function(){if(window.jQuery)dofinaljquery(window.jQuery.noConflict());else waitforjquery();},100);};dofinaljquery=function($){staircase.__construct__.call(window,$);};
