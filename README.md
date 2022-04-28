# list-input

Because every other spreadsheet-like form on the web sucks.

## Status

This is just a hobby project written in anger, it's not a real thing yet.

## Closest competition

Not really, since it's a general spreadsheet and I'm aiming for something specialized, and it's way larger and does more, but [canvas-datagrid](https://github.com/TonyGermaneri/canvas-datagrid) ([demo](https://canvas-datagrid.js.org/demo.html)) is pretty sweet

### Future features

- don't delete empty rows when focus is inside of them
- dragging to reorder rows
- enter/shift+enter should select cell contents like tab/shift+tab do
- dropdowns?
- resizable columns?
	- emitting an event on resize so that you can store them in user preferences
	- https://stackoverflow.com/questions/46044589/dynamically-resize-columns-in-css-grid-layout-with-mouse
	- `resize: horizontal`
