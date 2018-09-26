<template>
  <nav class="journey__navigation"
       data-qa="navigation-menu"
       ref="mobileMenu">
    <button class="navigation__mobileToggle"
            data-qa="mobile-menu-toggler"
            @click="toggleMobileMenu()">
      <i class="mdi mdi-24px mdi-menu"></i>
    </button>
    <ul>
      <li v-for="(value, name) in links"
          :key="name"
          :class="value.active ? 'active' : ''"
          :data-qa="'navigation-' + name">
        <a :href="'#' + name"
           :name="name"
           @click.prevent="scrollToSection(name)">
          <i :class="'mdi mdi-24px mdi-' + value.icon"
             :data-qa="'navigation-' + name"></i>
          <div class="link__text">{{ value.label }}</div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import _ from 'underscore'
import Bus from '@/Bus'

export default {
  name: 'Navigation',
  data () {
    return {
      links: {
        'home': {
          label: 'Home',
          active: false,
          icon: 'home'
        },
        'route': {
          label: 'Popular Route',
          active: false,
          icon: 'routes'
        },
        'map': {
          label: 'Map',
          active: false,
          icon: 'map-search'
        },
        'range': {
          label: 'Range',
          active: false,
          icon: 'gauge'
        },
        'charging': {
          label: 'Charging',
          active: false,
          icon: 'battery-charging-90'
        },
        'maintenance': {
          label: 'Maintenance',
          active: false,
          icon: 'wrench'
        },
        'connectedConvenient': {
          label: 'Connected & Convenient',
          active: false,
          icon: 'car-connected'
        },
        'summary': {
          label: 'My Summary',
          active: false,
          icon: 'flag-checkered'
        }
      }
    }
  },
  computed: {
    linksNames () {
      return Object.keys(this.links)
    },
    numberOfLinks () {
      return this.linksNames.length
    },
    activeIndex () {
      return this.linksNames.findIndex(link => this.links[link].active)
    }
  },
  mounted () {
    this.checkScroll()

    window.addEventListener('scroll', this.checkScroll)

    Bus.$on('navigate', this.scrollToSection)
    Bus.$on('scroll:nextSection', this.scrollToNextSection)
    Bus.$on('scroll:previousSection', this.scrollToPreviousSection)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.checkScroll)

    Bus.$off('navigate', this.scrollToSection)
    Bus.$off('scroll:nextSection', this.scrollToNextSection)
    Bus.$off('scroll:previousSection', this.scrollToPreviousSection)
  },
  methods: {
    scrollToSection (name) {
      const offset = this.loadOffsetForLink(name)

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      })
    },
    scrollToNextSection () {
      const nextSectionIndex = this.activeIndex + 1

      if (nextSectionIndex >= this.numberOfLinks) return

      this.scrollToSection(this.linksNames[nextSectionIndex])
    },
    scrollToPreviousSection () {
      const nextSectionIndex = this.activeIndex - 1

      if (nextSectionIndex <= 0) return

      this.scrollToSection(this.linksNames[nextSectionIndex])
    },
    checkScroll: _.debounce(function () {
      this.closeMobileMenu()

      let active = 'home'

      Object.keys(this.links).forEach((link) => {
        this.links[link].active = false

        const offset = this.loadOffsetForLink(link)

        if (window.scrollY >= offset - (window.innerHeight / 2)) active = link
      })

      this.links[active].active = true
    }),
    loadOffsetForLink (link) {
      const anchor = document.querySelector(`a[name=${link}] + section`)
      if (anchor === null) return 0
      return (anchor.getBoundingClientRect().top + window.scrollY)
    },
    toggleMobileMenu () {
      this.$refs.mobileMenu.classList.toggle('journey__navigation--toggled')
    },
    closeMobileMenu () {
      this.$refs.mobileMenu.classList.remove('journey__navigation--toggled')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/config';

  .journey__navigation {
    box-sizing: border-box;
    line-height: 1rem;
    text-align: center;
    padding: 100px 0 0;
    height: 100vh;
    position: fixed;
    z-index: 100000001;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navigation__mobileToggle,
  li a {
    line-height: 50px;
    height: 50px;
  }

  li {
    padding: 0;
    margin: 0;

    a {
      color: $ev-green;
      text-decoration: none;
      display: block;
      height: 50px;
      position: relative;
    }

    &.active {
      &, &:hover {
        a {
          background-color: $ev-green;
          color: #FFF;
        }
      }
    }

    &:hover {
      a {
        background-color: $dark-gray;
      }

      .link__text {
        background-color: $ev-green;
        text-align: left;
        line-height: 30px;
        color: #FFF;
        padding: 0 20px;
        position: absolute;
        top: 10px;
        left: 75px;
        height: 30px;
        width: 175px;
        border-radius: 5px;
        display: block;

        &::before {
          background-color: $ev-green;
          content: ' ';
          transform: rotate(45deg);
          position: absolute;
          top: 5px;
          left: -8px;
          width: 19px;
          height: 20px;
        }
      }
    }
  }

  .link__text {
    display: none;
  }

  .navigation__mobileToggle {
    display: none;
  }

  @media screen and (max-width: $mobile-maximum) {
    .journey__navigation {
      text-align: left;
      padding: 0;
      height: auto;
      width: 100vw;

      &.journey__navigation--toggled {
        ul {
          display: block;
        }
      }
    }

    .navigation__mobileToggle, i {
      text-align: center;
      width: 50px;
    }

    .navigation__mobileToggle {
      background-color: transparent;
      border: none;
      display: block;
    }

    ul {
      display: none;
    }

    li {
      a {
        display: flex;
        position: unset;
      }

      &:hover {
        a {
          background-color: transparent;
        }

        .link__text {
          background-color: transparent;
          color: $ev-green;
          line-height: 50px;
          padding: unset;
          position: static;

          &::before {
            content: unset;
          }
        }
      }
    }

    .link__text {
      display: block;
    }
  }
</style>
