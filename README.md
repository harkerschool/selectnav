# SelectNav

Converts menu into a select menu

## Options

### defaultText: 
Text for default select option. Default: 'Go to...'

### onchange
Function to run when option is selected in select menu. Default: 
```
function(nav) {
    // loads selected page
    window.location = $(nav).find("option:selected").val();
}
```