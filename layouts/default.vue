
<template lang="pug">
    div
        nav.navbar.header.has-shadow.is-primary(role="navigation" arial-label="main navigation")
          a.navbar-item(href="/")
            img(src="~assets/buefy.png" alt="Buefy" height="28")
          div.navbar-burger
            span
            span
            span
        section.main-content.columns
          aside.column.is-2.section
            p.menu-label.is-hidden-touch General
            ul.menu-list
              li(v-for="(item, key) of items" :key="key")
                nuxt-link(:to="item.to" exact-active-class="is-active")
                  b-icon(:icon="item.icon") 
                  | {{item.title}}
          div.container.column.is-10
            nuxt
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Home', icon: 'home', to: { name: 'index' } },
        { title: 'Inspire', icon: 'lightbulb', to: { name: 'inspire' } },
        { title: 'Buefy Test', icon: 'lightbulb', to: { name: 'buefy' } },
        {
          title: 'Form Builder', icon: 'lightbulb', to: { name: 'formBuilder' }
        }
      ]
    }
  }
}
</script>
