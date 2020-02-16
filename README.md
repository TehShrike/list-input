# list-input

Because every other spreadsheet-like form on the web sucks.

## Status

This is just a hobby project written in anger, it's not a real thing yet.

## In progress

- change detection
	- an event fired when an item changes
	- have the demo page update tax based on the checkbox, and update the total based on quantity*price+tax
- jank
	- field background color when checkboxes have focus
	- zeros after the decimal point on number inputs in Firefox
- custom keyboard interactions
	- enter should take you to either the column below, or to the first column of the next row
	- shift+enter should take you to the column above
- option to pass in an "empty row" object so that there will always be an empty row at the bottom of the list
- dropdowns
- resizable columns
	- emitting an event on resize so that you can store them in user preferences

## Think about

- ability to put arbitrary content into fields (buttons, autocomplete controls)
- should probably just use text inputs instead of number inputs
	- at least when focus isn't in the element
		- is that possible/a good idea?
