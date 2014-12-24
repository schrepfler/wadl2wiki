[![Stories in Ready](https://badge.waffle.io/schrepfler/wadl2wiki.png?label=ready&title=Ready)](https://waffle.io/schrepfler/wadl2wiki)
# WADL to WIKI
# WORK IN PROGRES

A simple WADL to Wiki (Confluence / JIRA Markup) documentation generator, written for Node.js.

## Confluence / Jira wiki Process

Output can be pasted into Confluence, using the Insert Markup feature; 


![Wiki menu](https://raw.github.com/jhitchcock/raml2wiki/master/wikimenu.png)

![Wiki insert](https://raw.github.com/jhitchcock/raml2wiki/master/wikiinsert.png)


## Install
```
npm i -g wadl2wiki
```


## Usage

### As a command line script

```
wadl2wiki example.wadl > example.txt
wadl2wiki -i example.wadl -o example.txt
wadl2wiki -s -i example.wadl -o example.txt
```

Using your own templates:

```
wadl2txt -t custom-template.handlebars -r custom-resource.handlebars -m custom-item.handlebars -i example.wadl -o example.txt
```

## Example Output

### Start of Wiki Page
![Start of Wiki Page](https://raw.github.com/jhitchcock/raml2wiki/master/wikiExample1.png)

### Example Endpoint Section
![Example Endpoint](https://raw.github.com/jhitchcock/raml2wiki/master/wikiExample2.png)

This script uses the parsing method and wadl2json script by Rodolphe Belouin
(https://github.com/rbelouin/wadl2json)