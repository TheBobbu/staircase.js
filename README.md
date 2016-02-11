# Staircase 5.2.2

Staircase is a lightweight framework for online form validation and auto population.
Requires jQuery 1.8 or later.

To embed Staircase in your document, simply add the following script tag below jQuery:  

`<script type="text/javascript" src="http://staircase.tech/5.2.2/staircase.min.js"></script>`


If you want to live on the bleeding edge (we advise against this as Staircase is always evolving and features may change), you can instead use the following:

`<script type="text/javascript" src="http://staircase.tech/latest/staircase.min.js"></script>`


## Preparing the DOM
Staircase was written with ease of use in mind. Setting up a form is simple. Any element type can be used for the main form, however each step of the form must match the `step selector` (see **Javascript API &raquo; Options**).

To add validation to an input, give it a `validate` attribute (see **Attributes**).  
To add a character constraint to an input, give it a `constrain` attribute (see **Constraints**).

```html
<form id="staircase" action="submit.php" method="post" enctype="multipart/form-data">
	<div class="step">
		<input type="text" name="first-name" validate="name" /> First Name
		<input type="text" name="last-name" validate="name" /> Last Name
		<input type="email" name="email" validate="email" /> Email Address
		<input type="text" name="house-number" validate="number[0]" constrain="numbers" /> House Number
		<button>Continue</button>
	</div>
	<div class="step">
		<p>Do you agree to the terms and conditions?</p>
		<label><input type="radio" name="agree" value="yes" /> I Agree</label>
		<label><input type="radio" name="agree" value="no" /> I Do Not Agree</label>
		<button>Submit</button>
	</div>
</form>
```

## Initialising Staircase
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

***Note:*** *If Staircase cannot find a usable `<form>` element, it will display all input data as a table in the developer console when the submit button is clicked.*

## Attributes

Once initialised, Staircase scans the DOM for the following attribute modifiers. These modifiers are optional.

Attribute | Value | Effect
:---: | --- | ---
`bv-score` | see **Third Party APIs &raquo; BriteVerify** | The field name for the element's BriteVerify result
`constrain` | see **Constraints** | Constrains user input to a specific set of characters
`optional` | `anything` | Only validates the field if it contains data
`staircase-value` | see **Javascript API &raquo; Prefiller** | Fills the input with data harvested from the `window`
`validate` | see **Validation Rules** | Applies a validation rule to the element

## Validation Rules

Below is a list of predefined rules and what they ask for from a value. You can add your own values via `Staircase.Extend()` (see **Javascript API &raquo; Methods**)

Rule | Criteria
--- | ---
`currency` | An amount of money
`checked` | Checkbox or Radio button must be checked
`date[0]` | A short date string, accepting American and standard formats (e.g. 21/04/15)
`date[1]` | A long date string (e.g. Monday 21st April 2015)
`date[2]` | A short year (e.g. 15)
`date[3]` | A long year (e.g. 2015)
`datepicker` | The default format for jQuery's datepicker
`default` | A non-empty string
`email` | RFC 2822 formatted email addresses
`filename` | A valid filename
`name` | A non-empty string containing no numbers or non-unicode characters
`number[0]` | Any integer (negatives allowed)
`number[1]` | Any float (negatives allowed)
`number[2]` | Any non-negative integer
`number[3]` | Any non-negative float
`number[4]` | Any integer or float, negative or non-negative
`phone[0]` | A valid UK landline number
`phone[1]` | A valid UK mobile number
`phone[2]` | A valid US phone number
`postcode` | A valid UK postcode
`selected` | Select input must have a valid (non-empty) option selected
`time` | A time string (e.g. 15:06:30, 12:00 am, 3:06pm)
`unchecked` | Checkbox or Radio button must **not** be checked
`zipcode` | A valid US zipcode

## Constraints

Below is a list of constraints that will allow the user to only enter certain characters in an input

Constraint | Effect
--- | ---
`letters` | Only allows the user to enter letters (A-Z)
`numbers` | Only allows the user to enter numbers (0-9)
`symbols` | Prevents the user from entering numbers or letters (0-9, A-Z)

## Conditions

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

***Note:*** *Checkboxes and Radio boxes will only hold a value if they are checked. If more than one box is checked, the values will be in an array.*

## Checkbox Groups
If the `checkboxGroups` option (see **Options**) is enabled, an extra validation step is added to any Step within the instance whose input elements are all checkboxes. At least one checkbox must be checked for validation to pass.

## Prefiller
Staircase comes with a nifty little script that scans the document for any `input` elements with a `staircase-value` attribute and fills it with data by passing the attribute value through a filter. Have a look at the following examples:

```html
<input staircase-value="#{location.href}" /> <!-- http://example.com/page.html -->
<input staircase-value="Size: #{document.body.clientWidth}" /> <!-- Size: 1920 -->
<input staircase-value="#{screen.width}, #{screen.height}" /> <!-- 1920, 1080 -->
```

`#{...}` is a filter tag. The contents between `{` and `}` are searched for in the `window` object and placed in the output if they are found.

## Title Scanner
If the `document.title` is left blank or looks like a filename, or there is no `<title>` tag in the document, Staircase will attempt to auto-fill the document's title by searching for the first piece of relevant text within the page.

The scanner searches using the following process:

1. Find the first `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>` or `<h6>` element and use its text content
2. Find the first `<img>` element with an alt tag and use its alt tag text content
3. Find the first `<p>` element and use the first four words
4. Find the first available text node and use the first four words
5. Use a clean version of the document's URL (e.g. some-website.com &raquo; Some Website)

## Javascript API

### Javascript Objects
`window.Staircases` - An array of Staircase objects available in the current window<br />
`window.location.params` - A named array of HTTP Query parameters in the current URL

`Staircase( DOMElement element[, Object options] )`<br />
Initialise a new Staircase instance, attach it to `element` and provide `options` if it has been specified.

`Step( DOMElement element, Int index )`<br />
Create a new Step object at `index` and attach it to `element`.

### Options
Each Staircase instance can be customized with a set of options presented as an `Object`.

Option | Type | Default | Effect
:---:|:---:|:---:| ---
`APIs` | `Object` | `{}` | API configuration object (see **Third Party APIs**)
`checkboxGroups` | `Boolean` or `String` | `false` | Enable checkbox groups (see **Checkbox Groups**). You can specify a CSS selector to only apply checkbox group validation to a specific element within the Step. If set to `true`, the default selector is `.checkbox-group` and falls back to the entire Step.
`history` | `Boolean` | `false` | Allows Staircase to modify the `location.hash`, which allows the user to click 'Back' and return to a previous step on the form. Having multiple instances of Staircase with history enabled may behave badly.
`ID` | `String` | random | A unique ID string for the Staircase instance. Shows in the URL if `history` is enabled. If left undefined, a random 8-character string is generated.
`notifyDelay` | `Int` | `3` | Number of seconds (or milliseconds if the value is larger than 300) to wait before removing the `staircase-highlight-error` class from erroneous inputs.
`steps` | `String` | `.step` | CSS selector used to search for Steps within the instance's DOM Element.
`stepBlur` | `Function` | none | Additional callback function that is triggered when a step gets sent to the background
`stepFocus` | `Function` | none | Additional callback function that is triggered when a step enters the foreground
`validate` | `Function` | none | Additional function to check against during validation. `this` represents the current `input` element and the first argument represents the Staircase instance. Be sure to return `false` if your custom validation fails.

### Events
Staircase triggers a number of events that can be tapped into using `.on()` and `.toggle()` (see **Properties & Methods**)  
These events are supplied with `arguments` and some can be cancelled by returning `false`.  
`this` refers to the Staircase instance.

Event | Cancelable | Arguments | Called
--- |:---:| --- | ---
`addcondition` | *no* | `step`, `condition` | After a `condition` has been added to the `step`
`back` | *yes* | `step`, `button` | After the back `button` was pressed but before the `step` changes
`beforestepvalidate` | *yes* | `step`, `input(s)` | Before the `step` validates its contents
`beforesubmit` | *yes* | `step`, `button` | Before the main form is submitted
`beforevalidate` | *yes* | `input` | Before an input is validated
`constrained` | *no* | `input`, `constraint` | When a constraint is preventing user input
`continue` | *yes* | `step`, `nextstep` | Before the successfully validated `step` proceeds to the `nextstep`
`continuefailed` | *no* | `step`, `inputs` | The `step` has failed validation because of the marked `inputs`
`hashchange` | *yes* | `step`, `hash` | Before the detected URL `hash` alteration causes the current `step` to change
`stepblur` | *no* | `step` | After the step loses focus
`stepvalidate` | *no* | `step`, `valid` | After the `step` performs validation on itself
`submit` | *yes* | `staircase` | After the `staircase` form is submitted but before the window location changes
`submitfailed` | *no* | `step` | When the final `step` fails validation
`validate` | *yes* | `input`, `valid` | After an `input` is validated by staircase. Can be 'cancelled' by returning `true` (to pass validation) or `false` (to fail)

### Properties & Methods

#### `Staircase`
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
`on` | `event`, `callback` | Bind a `callback` function to an `event`
`off` | `event`[, `callback`] | Remove an `event` handler (with optional `callback` filter)
`trigger` | `event`[, `data`] | Trigger all event handlers for `event` to fire (with optional `data` array)

#### `Step`
Property | Meaning
:---:| ---
`$index` | The Step's numeric index (Note that this is an **Array Index**, meaning index **0** is actually the **first** item in the array)
`$object` | The DOM Element bound to the Step object
`$rules` | A list of conditions for this Step (see **Conditions**).
`Visited` | Becomes a `Date` once the Step has been focussed. Cannot be changed manually.

Method | Arguments | Action
:---:|:---:| ---
`Blur` | `silent` | Hides the Step from view and triggers a `blur` event on the Step's DOM Element (unless `silent` is supplied).
`Condition` | `code` | Creates a new condition (see **Conditions**) and adds it to the Step's rulebook. `code` can either be a `String` or a `function`.
`Focus` | `silent` | Bring the Step into focus and hide all other steps in the Staircase instance. Triggers a `focus` event on the Step's DOM Element unless `silent` is supplied.
`Validate` | `input` | Performs `Staircase.Validate()` on `input` and applies the `staircase-has-error` and `staircase-highlight-error` classes to the `input` and any applicable `<label>` elements upon failure. `staircase-highlight-error` will be removed after a delay (see **Javascript API &raquo; Options**). Returns `true` or `false` depending on whether validation has passed or not.


## Third Party APIs

The `APIs` options object contains data pertaining to third party API integration.  
The default `APIs` object is as follows:

```json
{
    "briteverify":
    {
        "APIKey": null
    },
	"data8":
	{
		"APIKey": null,
		"License": null
	}
}
```


### BriteVerify

[BriteVerify](http://www.briteverify.com) is an email verification service.  
You can enable BriteVerify by providing your API Key as part of the `options` object (see **Initialising Staircase**)

The BriteVerify options object accepts the following values:

| Option | Type | Default | Effect |
| --- | --- | --- | --- |
| `APIKey` | `String` | `null` | Links the BriteVerify instance to your account and enables the service |
| `fields` | `String` or `Array` | `[validate="email"]` | Tells Staircase which elements need to be verified |
| `scoreFieldName` | `String` | `null` | The field name for the generated score input - if left blank will default to the main input's name plus `scoreFieldSuffix` |
| `scoreFieldSuffix` | `String` | `_bvscore` | The name suffix for the generated score input |

*Note that you can also provide a `scoreFieldName` per element via the `bv-score` attribute (see* ***Attributes****)*

Here is an example of a simple setup with BriteVerify:

```js
$('#form').staircase(
{
    APIs:
    {
        briteverify:
        {
            APIKey:         "...",
            fields:         "input[name='email']",
            scoreFieldName: "email_verify_status"
        }
    }
});
```

`<input type="text" name="email" placeholder="Email Address..." />`

Once the user has entered their email, the following field is generated and placed underneath the `email` field:

`<input type="hidden" tabindex="-1" name="email_verify_status" value="valid" />`

You can read about the value that is populated over in [BriteVerify's API Documentation](http://docs.briteverify.com/status-key).  
Staircase retrieves the **Primary Statuses** column only.

### Data8

[Data8](https://www.data-8.co.uk/) is a general information verification service.  
You can enable Data8 by providing your ajax API key as part of the `options` object (see **Initialising Staircase**)

The Data8 options object accepts the following values:

| Option | Type | Default | Effect |
| --- | --- | --- | --- |
| `APIKey` | `String` | `null` | Links the Data8 instance to your account and enables the service |
| `License` | `String` | `null` | Provides a license type for Data8 to use with Postcode Address Lookup |

Data8 fields require attributes to function correctly. Below is a list of acceptable attributes:

| Argument | Value | Effect |
| --- | --- | --- |
| `d8` | `"telephone"`, `"phone"` or `"email"` | Enables telephone or email verification on the input, which fires when the input's value is changed |
| `d8-lookup-street` | `String` | Provide an input's `name` attribute as this attribute's value to convert the element to a `select` box filled with all available street addresses for the entered postcode. |
| `d8-lookup-city` | `String` | Provide a `name` to create a hidden 'city' field containing the city of the selected address. Must be applied in conjunction with `d8-lookup-city`. |
