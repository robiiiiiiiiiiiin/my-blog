---
title: Traduisons un site avec node-static-i18n
date: "2020-12-03T22:12:03.284Z"
thumbnail: "./thumbnail.jpg"
tags: ['Accessibilité']
description: "On a vu la théorie dans le précédent article, cette fois on met les mains à la pâte et on code de l'internationalisation!"
---

Cette article fait suite à mon dernier article "[i18n et l10n](https://golb.ch/i18netl10n/)". Nous avions vu la démarche à avoir lorsqu'on aimerait rendre un site statique accessible en plusieurs langages. Et ce n'est pas un total hasard si j'ai choisi cette article, car j'avais comme projet de proposer une version française de mon [site personnel](https://robinbecherraz.ch) qui est actuellement uniquement en anglais. (Bien qu'à l'instant où vous lirez ces lignes, il sera déjà disponible dans les deux langues). Je ne vais cependant pas aller autant en détail que dans l'article. Mais je vais déjà mettre en place l'essentiel, c'est à dire la traduction des textes.

## L'état actuel du site

Une première particularité est que le site est déjà en production, et n'a pas forcément été pensé pour être multilingue. 

J'utilise Webpack pour automatiser plusieurs chose.

Premièrement, pour le JavaScript. Je fais passer mes fichiers .js à travers Babel et ils sont ensuite packagé dans un fichier bundle.js

Deuxièmement, pour le CSS. Ça ne nous intéresse pas trop mais en gros ça convertit et bundle mes fichiers .scss.

Troisièmement, Pour le HTML. Et c'est là où ça va principalement interférer avec la traduction. J'utilise [handlebars-webpack-plugin](https://github.com/sagold/handlebars-webpack-plugin) afin de pouvoir utiliser des templates HTML. En l'occurrence en utilisant la fonctionnalité de [partials de Handlebars](https://handlebarsjs.com/guide/partials.html). Le plugin webpack me permet de compiler ces templates lors du build de Webpack afin d'avoir des fichiers statiques sur le serveur. Pas besoins de savoir précisément comment ça marche, la seule chose à retenir est que ces templates utilisent une [syntaxe de type {{ mustache }}](http://mustache.github.io/mustache.5.html).

## Résultat attendu

Je voulais que mon site reste statique, je ne voulais pas utiliser PHP ou autre pour traduire mes pages. J'ai donc décidé d'organiser mes fichiers selon la structure suivante:

```
dist
+-- en
|	+-- index.html
|	+-- projects
|		+-- firstproject.html
|		+-- ...
+-- fr
|	+-- index.html
|	+-- projets
|		+-- premierprojet.html
|		+-- ...
+-- index.html
```

J'ai décidé de traduire les urls. Par exemple `robinbecherraz.ch/en/projects/firstproject` en anglais et `robinbecherraz.ch/fr/projets/premierprojet` en français. J'ai fais ça pour apporter plus de sémantique et d'accessibilité aux urls. Un des inconvénients est que si on change juste le `/en/` en `/fr/` dans l'url, on tombera sur un 404. Mais bon il y a des boutons pour changer de langue qui sont plutôt visibles, le site étant assez sobre, donc je ne pense pas que ce soit très grave. De plus, si je veux vraiment palier à se problème, je pourrais mettre en place des redirections.

## Mise en place de i18n

Le module npm [node-static-i18n](https://github.com/claudetech/node-static-i18n) s'est assez vite imposé puisqu'il correspond exactement à mes besoins. Je vous passe l'étape d'installation qui est assez simple pour passer directement à l'utilisation de i18n. 

Vous devrez premièrement créer un fichier json pour chaque langue. Par exemple `locales/fr.json` avec à l'intérieur:

```
{
  "home": {
    "title": "Mon site web"
  }
}
```

Et `locales/en.json`

```
{
  "home": {
    "title": "My website"
  }
}
```

Pour chaque balise dont vous voudrez traduire le contenu, vous devrez utiliser l'attribut `data-t`, avec à l'intérieur la clé de la valeur souhaitée dans vos fichiers json. Par exemple, dans `index.html`

```html
<title data-t>home.title</title>
```

Ensuite, vous lancez la traduction de vos fichiers en lançant

```
$ static-i18n -l fr -i en -i fr dist
```

Ceci vous générera la structure suivante:

```
dist
+-- en
|	+-- index.html
|	+-- projects
|		+-- firstproject.html
|		+-- ...
+-- index.html
+-- projets
|		+-- firstproject.html
|		+-- ...
```

le fichier `dist/index.html`contiendra

```html
<title>Mon site web</title>
```

et `dist/en/index.html`

```html
<title>My website</title>
```

Incroyable non?

## Premiers problèmes

### Structure générée

Alors c'est cool mais c'est pas vraiment la structure que j'aimerais. J'ai cherché et je n'ai pas trouvé de moyen pour que static-i18n me génère la structure que je souhaite. Du coup j'ai écris un petit script bash pour déplacer mes fichiers une fois créés

```
#!/bin/bash

# Move /dist/projects into /dist/fr/projets and copy /index.html to /fr/index.html
mkdir -p ./dist/fr/projets
mv ./dist/projects/* ./dist/fr/projets/
rm -rf ./dist/projects
cp ./dist/index.html ./dist/fr/index.html
```

Ce n'est certainement pas la meilleure manière de faire mais ça fait le taff.

### Nom des fichiers

Malheureusement, i18n n'est pas capable de traduire les noms des fichiers (à ma connaissance). Du coup, j'ai ajouté ces quelques lignes au début de mon script

```
# Translate files name
mv ./dist/projects/firstproject.html ./dist/projects/premierprojet.html
```

## Rediriger le client sur la bonne langue

Ma page `dist/index.html` est la page racine de mon site. Elle est en français. J'aimerais donc

1. Rediriger un utilisateur qui a déjà visité mon site sur la langue qu'il utilisait
2. Essayer de connaitre la langue préférée du client si celui-ci n'a jamais visité mon site

Pour cette deuxième étape, j'ai décidé d'utiliser la propriété [`navigator.language`](https://developer.mozilla.org/fr/docs/Web/API/NavigatorLanguage/language). C'est selon moi la plus fiable des méthode pour déterminer le langage souhaité par un utilisateur. J'ai donc ajouté le script suivant à mon fichier `dist/index.html`

```javascript
const storedLang = localStorage.getItem('lang');

function checkBrowserLang() {
    const lang = navigator.language
    if(/^en.*/.test(lang)){
        localStorage.setItem('lang', 'en');
        window.location.href="en";
    } else if (/^fr.*/.test(lang)) {
        localStorage.setItem('lang', 'fr');
    }
}

switch (storedLang) {
    case 'en':
        window.location.href="en";
        break;
    case 'fr':
        break;
    default:
        checkBrowserLang()
        break;
}
```

## Aller plus loin avec i18n

On a vu l'utilisation de base d'i18n. Mais j'ai évidemment dû faire certaines choses un peu plus complexes. Par exemple, traduire l'attribut `content` du meta tag suivant qui se trouve dans une partial Handlebars:

```html
<meta property='og:title' content='{{project.title}} - a project by Robin Bécherraz' />
```

Si vous avez déjà utilisé un système de templating, vous devriez comprendre cette ligne.

À noter que j'ai ajouté le texte "a project by Robin Bécherraz" dans mes fichiers `locales`/ sous la clé `projects.addToMetaTitle`

### Fonctionnement de mes templates Handlebars

la variable `project.title` passée à ma partial provient d'un fichier json `data/projects.json`

```
{
    "firstproject": {
        "title": "My cool project"
    }
}
```

J'appelle ensuite ma partial ainsi

```
{{> partials/mypartials data=data project=firstproject }}
```

(le `data=data` est spécifique à handlebars-webpack-plugin, ça pointe en gros sur mon fichier `data/projects.json`)

Du coup, j'ai du traduire les titre de mes projets en procédant ainsi:

```
{
    "firstproject": {
        "title": "firstproject.title"
    }
}
```

### Interpolation de valeur d'attribut avec i18n

Voici, selon la doc de static-i18n, comment traduire un attribut avec en plus de l'interpolation:

```html
<link rel="canonical" data-attr-t data-attr-t-interpolate href-t="{{links.baseAbsolute}}filename.{{links.extension}}" />
```

Vous voyez peut-être le problème, static-i18n et Handlebars utilisent la même syntaxe {{ mustache }} pour faire deux choses différentes. On a donc un conflit entre ces deux outils. 

### Solution

Cette article est déjà super long donc je vais vous montrer directement la solution que j'ai trouvée. Afin de rendre la ligne suivante traduisible

```html
<meta property='og:title' content='{{project.title}} - a project by Robin Bécherraz' />
```

Je l'ai modifiée ainsi

```html
<meta property='og:title' data-attr-t data-attr-t-interpolate content-t='{{surroundWithCurlyBraces project.title}} - {{surroundWithCurlyBraces "projects.addToMetaTitle"}}' />
```

Vous voyez donc que pour palier ce conflit de syntaxe entre static-i18n et Handlebars, j'ai créé un helpers "surroundWithCurlyBraces". La ligne ci-dessus va donc être compilée par handlebars-webpack-plugin ainsi

```html
<meta property='og:title' data-attr-t data-attr-t-interpolate content-t='{{firstproject.title}} - {{projects.addToMetaTitle}}' />
```

Puis static-i18n va la traduire ainsi

```html
<meta property="og:title" content="My cool project - a project by Robin Bécherraz">
```

## Conclusion

ouf... pour ceux qui n'ont pas encore fuit, j'espère que vous aurez trouvé cet article intéressant malgré ce contexte très spécifique avec Handlebars. Cependant, il existe aujourd'hui beaucoup de systèmes de templating qui utilisent cette notation {{ mustache }}, donc vous serez peut-être confrontés aux mêmes problèmes que moi même si vous n'utilisez pas Handlebars.

Mon environnement de développement a été pas mal complexifié par cette mise en place d'i18n. Mais les outils marchent plutôt bien. Les points pouvant être améliorés sont ces petits scripts que j'ai ajouté afin de traduire et d'organiser les fichiers traduits. Ils ralentissent pas mal le processus de traduction.

