nodejs

#skill

##fs

* require : `var fs = require ("fs");`

* `fs.readFile(file[, options], callback)`

*callback* : `callback(error, data)`
*data* est le content du fichier (sous forme de buffer ou de string).
*file* :<string> | <integer> : filename ou filedescriptor
*option* : <undefined> | <string Encoding> 

exemple :
```js
fs.readFile('/etc/passwd', 'utf8', callback);
```

***

##path

* require : `var path = require ("path");`

* `path.extname(p)`

```js
path.extname('index.html')
// returns
'.html'

path.extname('index.coffee.md')
// returns
'.md'

path.extname('index.')
// returns
'.'
```

* `fs.readdir(path, callback)`

*callback* : `callback(error, files` - *files* est un array de string représentant
les noms des fichiers.

*path* : le chemin du dossier, sous forme de strng 

