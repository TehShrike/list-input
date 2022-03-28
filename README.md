# list-input

Because every other spreadsheet-like form on the web sucks.

## Status

This is just a hobby project written in anger, it's not a real thing yet.

## In progress

- Increase the horizontal padding of table header columns without messing up all the borders
- custom keyboard interactions
	- enter should take you to either the column below, or to the first column of the next row
	- shift+enter should take you to the column above

### Other future features

- option to pass in an "empty row" object so that there will always be an empty row at the bottom of the list
- dropdowns
- resizable columns
	- emitting an event on resize so that you can store them in user preferences
	- https://stackoverflow.com/questions/46044589/dynamically-resize-columns-in-css-grid-layout-with-mouse
	- `resize: horizontal`
- a proper `computed` implementation where calculations are lazy and and you can reference other `computed` values
	- there may be some way to use https://github.com/TehShrike/warg
