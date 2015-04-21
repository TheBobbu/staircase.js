#Staircase 5.0.0

Staircase is a lightweight framework for online form validation and auto population.
Requires jQuery 1.11.1 or later.


##Preparing the DOM
Staircase was written with ease of use in mind. Setting up a form is simple. Any element type can be used for the main form, however each step of the form must match the `step selector` (see **Javascript API &raquo; Options**).

To add validation to an input, give it a `validate` attribute (see **Attributes**). The validation is run when any `input[type="submit"]` or `.continue` element is clicked.

```html
<form id="staircase" action="submit.php" method="post" enctype="multipart/form-data">
	<div class="step">
		<input type="text" name="first-name" validate="name" placeholder="First Name..." />
		<input type="text" name="last-name" validate="name" placeholder="Last Name..." />
		<input type="email" name="email" validate="email" placeholder="Email Address..." />
		<button>Continue</button>
	</div>
	<div class="step">
		<p>Do you agree to the <a href="terms.html">terms and conditions</a>?</p>
		<label><input type="radio" name="agree" value="yes" /> I Agree</label>
		<label><input type="radio" name="agree" value="no" /> I Do Not Agree</label>
		<button>Continue</button>
	</div>
</form>
```

##Initialising Staircase
A window can contain as many instances of Staircase as are needed. Initialising an instance is easy and straightforward and can be done using either the built-in jQuery extension or with plain Javascript:

```javascript
$('#form').staircase(
{
	ID:			'form-1',
	history:	true
});

// is the same as...

new Staircase(document.getElementById('form'),
{
	ID:			'form',
	history:	true
})
```

The `options` parameter is optional and allows the modification of various settings and behaviours (see **Javascript API &raquo; Options**).

##Attributes

Once initialised, Staircase scans the DOM for compatible elements.

Attribute | Effect
:---:| ---
`validate` | Applies a validation rule to the element (see **Validation Rules**)
`staircase-value` | Fills the input with specifiable data harvested from the `window` (see **Javascript API &raquo; Prefiller**)

##Validation Rules

Below is a list of predefined rules and what they ask for from a value. You can add your own values via `Staircase.Extend()` (see **Javascript API &raquo; Methods**)

Rule | Criteria
:---:| ---
`currency` | An amount of money
`date` | `[0]` - A short date string, accepting American and standard formats (e.g. 21/04/15)<br />`[1]` - A long date string (e.g. Monday 21st April 2015)
`datepicker` | The default format for jQuery's datepicker
`default` | A non-empty string
`email` | RFC 2822 formatted email addresses
`filename` | A valid filename
`name` | A non-empty string containing no numbers or non-unicode characters
`number` | `[0]` - Any integer (negatives allowed)<br />`[1]` - Any float (negatives allowed)
`phone` | `[0]` - A valid UK landline number<br />`[1]` - A valid UK mobile number<br />`[2]` - A valid US phone number
`postcode` | A valid UK postcode
`time` | A time string (e.g. 15:06:30, 12:00 am, 3:06pm)
`zipcode` | A valid US zipcode

##Conditions

You can define your own conditional code that runs after validation but before the 'Next' or 'Submit' buttons are clicked. This opens up the ability to switch to a certain step depending on an input's value, send the user an alert box if they've typed something wrong, or do something else. *The only limit is your imagination.*

To define a condition, you can do one of two things;

1. Embed the javascript code in a `<script type="staircase/condition">` element
2. Add the condition programatically via `Step.Condition(function(){ ... })` (see **Javascript API &raquo; Methods**)

When a condition is run, each `<input>`, `<select>` and `<textarea>` within the condition's Step is supplied as a variable that corresponds to its `name` attribute and `value` property. For example; `<input name="firstName" value="John" />` corresponds to the `firstName` variable, which contains the value `John`.

Along with these variables, an instance of jQuery (`$`) plus sandboxed instances of `Staircase` and `Step` are also supplied.

Have a look at the following example that takes place inside a `Step`: (see **Javascript API** for more info on `Staircase` and `Step`)

```html
<input name="myAge" value="22" />

<script type="staircase/condition">
	if(myAge < 16)
	{
		alert('As you are under the age of 16, please ensure you have an adult present before signing this form.');
		$('.age-warning').show();
	}
</script>
```

##Prefiller
Staircase comes with a nifty little script that scans the document for any `input` elements with a `staircase-value` attribute and fills it with data by passing the attribute value through a filter. Have a look at the following examples:

```html
<input staircase-value="#{location.href}" /> <!-- http://example.com/page.html -->
<input staircase-value="Size: #{document.body.clientWidth}" /> <!-- Size: 1920 -->
<input staircase-value="#{screen.width}, #{screen.height}" /> <!-- 1920, 1080 -->
```

`#{...}` is a filter tag. The contents between `{` and `}` are searched for in the `window` object and placed in the output if they are found.

##Javascript API

###Javascript Objects
`window.Staircases` - An array of Staircase objects available in the current window<br />
`window.location.params` - A named array of HTTP Query parameters in the current URL

`Staircase( DOMElement element[, Object options] )`<br />
Initialise a new Staircase instance, attach it to `element` and provide `options` if it has been specified.

`Step( DOMElement element, Int index )`<br />
Create a new Step object at `index` and attach it to `element`.

###Options
Each Staircase instance can be customized with a set of options presented as an `Object`.

Option | Type | Effect
:---:|:---:| ---
`history` | `Boolean` | Allows Staircase to modify the `location.hash`, which allows the user to click 'Back' and return to a previous step on the form. Having multiple instances of Staircase with history enabled may behave badly.
`ID` | `String` | A unique ID string for the Staircase instance. Shows in the URL if `history` is enabled.
`notifyDelay` | `Int` | Number of seconds (or milliseconds if the value is larger than 30) to wait before removing the `staircase-highlight-error` class from erroneous inputs.
`stepBlur` | `function` | Additional callback function that is triggered when a step gets sent to the background
`stepFocus` | `function` | Additional callback function that is triggered when a step enters the foreground
`steps` | `String` | CSS selector used to search for Steps within the instance's DOM Element.
`validate` | `function` | Additional function to check against during validation. `this` represents the current `input` element and the first argument represents the Staircase instance. Be sure to return `false` if your custom validation fails.

###Properties & Methods

####`Staircase`
Property | Meaning
:---:| ---
`$current` | The index of the currently focussed Step (Note that this is an **Array Index**, meaning index **0** is actually the **first** item in the array)
`$object` | The DOM Element bound to the Staircase instance
`Patterns` | An object containing regular expressions that are matched against during validation (see **Validation Rules**). This can be extended via `Staircase.Extend()` (see **Javascript API &raquo; Methods**)
`Steps` | An array containing all Steps within the instance

Method | Arguments | Action
:---:|:---:| ---
`Extend` | `name`, `pattern` | Add `pattern` as `name` to the validation rules list (see **Validation Rules**).
`Locate` | `postcode`, `callback` | Find the Street, City and County of an address by Postcode and supply `address` as an object to the `callback` function.
`Next` | - | Perform validation on the current Step and attempt to skip forward to the next step
`Prev` | - | Skip back to the last step
`To` | `index` | Attempt to skip to the Step at `index` (Note that this is an **Array Index**, meaning index **0** is actually the **first** item in the array). This function **cannot** skip through validation errors.
`Validate` | `input` | Process validation on `input` (can be a CSS selector, DOM Element or jQuery Object). Returns `true` or `false` depending on whether validation has passed or not.

####`Step`
Property | Meaning
:---:| ---
`$index` | The Step's numeric index (Note that this is an **Array Index**, meaning index **0** is actually the **first** item in the array)
`$object` | The DOM Element bound to the Step object
`Quantum` | Changes once the Step has been focussed. Cannot be changed manually.

Method | Arguments | Action
:---:|:---:| ---
`Blur` | `silent` | Hides the Step from view and triggers a `blur` event on the Step's DOM Element (unless `silent` is supplied).
`Condition` | `code` | Creates a new condition (see **Conditions**) and adds it to the Step's rulebook. `code` can either be a `String` or a `function`.
`Focus` | `silent` | Bring the Step into focus and hide all other steps in the Staircase instance. Triggers a `focus` event on the Step's DOM Element unless `silent` is supplied.
`Validate` | `input` | Performs `Staircase.Validate()` on `input` and applies the `staircase-has-error` and `staircase-highlight-error` classes to the `input` and any applicable `<label>` elements upon failure. `staircase-highlight-error` will be removed after a delay (see **Javascript API &raquo; Options**). Returns `true` or `false` depending on whether validation has passed or not.