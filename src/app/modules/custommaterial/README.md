
## Description 

This module adds some custom css rules to angular material. This is more like a hack and on any update we need to copy the
$MD_THEME_CSS constant out of the angular-material.js into the WU_THEME_CSS.txt

Be careful and dont overrite the custom rules at the bottom


## Usage 
fg = foreground
bg = background

[Angular Material theming syntax](https://material.angularjs.org/HEAD/#/Theming/02_declarative_syntax)

Add the following classes to elements to style them according to your theme setting:

wu-fg md-default-theme md-primary
wu-fg md-default-theme md-accent 
wu-fg md-default-theme md-warn
wu-bg md-default-theme md-primary 
wu-bg md-default-theme md-accent
wu-bg md-default-theme md-warn


you can also add md-hue1, md-hue2, md-hue3 for accents of the colors:
