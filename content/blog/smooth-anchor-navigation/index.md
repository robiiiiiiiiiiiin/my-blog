---
title: Smooth anchor navigation en javascript
date: "2021-05-24T12:00:00.284Z"
description: "La navigation par ancre c'est cool, mais on aimerait souvent ajouter une petite animation smooth. Il existe beaucoup de solutions pour le faire, qui marchent toutes plus ou moins (surtout moins). Voici les meilleures solutions que j'ai trouvées."
tags: ['Javascript']
thumbnail: "./thumbnail.jpg"

---

Un petit article rapide sur comment ajouter un effet smoooooth sur votre navigation interne par ancre. Je vous donne mes deux solutions qui sont, pour moi, le juste milieu entre la simplicité d'implémentation et le plus cross-browser possible.

## scroll-behavior

La solution la plus simple serait la propriété CSS [scroll-behavior](https://developer.mozilla.org/docs/Web/CSS/scroll-behavior)

```css
html {
  scroll-behavior: smooth;
}
```

Ce sera certainement la solution à adopter dans quelque temps, mais pour l'instant j'ai remarqué des bugs sur mobile, notamment sur Firefox. Et tout comme la prochaine solution, elle n'est pas supportée par Safari. Cependant, il existe [ce polyfill](https://github.com/iamdustan/smoothscroll) sensé régler le problème. Malheureusement je n'ai pas de Safari sous la main pour tester, mais vu la popularité du repo, ça doit certainement marcher.

## .scrollIntoView()

La solution la plus stable que j'ai trouvée est la fonction javascript [scrollIntoView()](https://developer.mozilla.org/docs/Web/API/Element/scrollIntoView).  Cette fonction s'utilise sur l'élément vers lequel vous voulez scroller. Vous y ajoutez l'option "smooth" et le tour est joué.

```html
<a href="#a-propos" class="inner-link">À propos</a>

<h2 id="a-propos">À propos</h2>
```

```javascript
// On sélectionne tous nos liens internes
document.querySelectorAll('a.inner-link').forEach(link => {
    // On leur ajoute un listener sur le clic
    link.addEventListener('click', (e) => {
        // On enlève le comportement par défaut
        e.preventDefault()
        // On récupère l'ancre
        let anchor = e.currentTarget.href
        // On scroll smoothement vers l'ancre :)
        document.querySelector(anchor).scrollIntoView({
            behavior: 'smooth'
        })
    })
})
```

Cette solution marche extrêmement bien sur tous les navigateurs que j'ai pu tester, excepté Safari, bien entendu.  Donc désolé si vous vous attendiez à la solution parfaite, mais pour l'instant il ne semble y avoir aucune solution native réellement cross-browser.

Si vous détenez la solution miracle, je suis preneur!