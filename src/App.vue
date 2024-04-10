<template>
  <div v-if="$root.user">
    <div id="kt_header_mobile" class="kt-header-mobile  kt-header-mobile--fixed ">
      <div class="kt-header-mobile__logo">
        <router-link :to="{name: 'Index'}">
          <img alt="Logo" src="/dash/img/logo-light.png"/>
        </router-link>
      </div>
      <div class="kt-header-mobile__toolbar">
        <button class="kt-header-mobile__toggler kt-header-mobile__toggler--left" id="kt_aside_mobile_toggler">
          <span></span></button>
        <button class="kt-header-mobile__toggler" id="kt_header_mobile_toggler"><span></span></button>
        <button class="kt-header-mobile__topbar-toggler" id="kt_header_mobile_topbar_toggler"><i
            class="flaticon-more"></i></button>
      </div>
    </div>
    <div class="kt-grid kt-grid--hor kt-grid--root">
      <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
        <button class="kt-aside-close " id="kt_aside_close_btn"><i class="la la-close"></i></button>

        <div class="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop"
             id="kt_aside">

          <div class="kt-aside__brand kt-grid__item " id="kt_aside_brand">
            <div class="kt-aside__brand-logo">
              <router-link tag="a" :to="{name: 'Index'}">
                <img alt="Logo" src="/dash/img/logo-light.png"/>
              </router-link>
            </div>
          </div>

          <div class="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper">
            <div id="kt_aside_menu" class="kt-aside-menu " data-ktmenu-vertical="1" data-ktmenu-scroll="1"
                 data-ktmenu-dropdown-timeout="500">
              <ul class="kt-menu__nav ">
                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Index')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Index'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Статистика</span>
                  </router-link>
                </li>

                <li class="kt-menu__section ">
                  <h4 class="kt-menu__section-text">Интерфейс</h4>
                  <i class="kt-menu__section-icon flaticon-more-v2"></i>
                </li>

                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Users')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Users'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Пользователи</span>
                  </router-link>
                </li>

                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Games')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Games'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Игры</span>
                  </router-link>
                </li>

                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Giveaways')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Giveaways'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Розыгрыши</span>
                  </router-link>
                </li>

                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Tickets')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Tickets'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Поддержка</span>
                  </router-link>
                </li>

                <li class="kt-menu__section ">
                  <h4 class="kt-menu__section-text">Система</h4>
                  <i class="kt-menu__section-icon flaticon-more-v2"></i>
                </li>

                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Bots')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Bots'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Боты</span>
                  </router-link>
                </li>

                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Items')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Items'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Предметы</span>
                  </router-link>
                </li>

                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Online')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Online'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Онлайн</span>
                  </router-link>
                </li>

                <li v-if="$root.user.role === 'admin'" class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Comission')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Comission'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Комиссия</span>
                  </router-link>
                </li>

                <li class="kt-menu__item" v-bind:class="{'kt-menu__item--active':(page === 'Settings')}"
                    aria-haspopup="true">
                  <router-link tag="a" :to="{name: 'Settings'}" class="kt-menu__link">
                    <span class="kt-menu__link-text">Настройки</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
          <div id="kt_header" class="kt-header kt-grid__item  kt-header--fixed ">
            <button class="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i
                class="la la-close"></i></button>
            <div class="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
              <button @click="rebootSite" style="margin: 10px;" class="btn btn-brand">Перезапустить сайт</button>
            </div>

            <div class="kt-header__topbar" v-if="$root.user">
              <div class="kt-header__topbar-item kt-header__topbar-item--user">
                <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">
                  <div class="kt-header__topbar-user">
                    <span class="kt-header__topbar-welcome kt-hidden-mobile">Привет,</span>
                    <span class="kt-header__topbar-username kt-hidden-mobile">{{ $root.user.username }}</span>
                    <img alt="Pic" :src="$root.user.avatar"/>
                  </div>
                </div>
                <div
                    class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
                  <div class="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
                       style="background-image: url(/dash/img/bg-1.jpg)">
                    <div class="kt-user-card__avatar">
                      <img alt="Pic" :src="$root.user.avatar"/>
                    </div>
                    <div class="kt-user-card__name">
                      {{ $root.user.username }}
                    </div>
                  </div>
                  <div class="kt-notification">
                    <div class="kt-notification__custom">
                      <a @click="$root.redirectToFrontend()" class="btn btn-label-brand btn-sm btn-bold">Вернуться на
                        сайт</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
            <router-view></router-view>
          </div>

          <div class="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop">
            <div class="kt-footer__copyright">
              2024 © Сайт разработан пользователем Vol8
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="kt_scrolltop" class="kt-scrolltop">
      <i class="fa fa-arrow-up"></i>
    </div>

    <Items />
  </div>
</template>

<script>
import Items from "@/components/Items";
export default {
  components: {Items},
  data() {
    return {
      page: null
    }
  },
  beforeMount() {
    this.page = this.$router.currentRoute.name;
  },
  beforeUpdate() {
    this.page = this.$router.currentRoute.name;
  },
  methods: {
    rebootSite() {
      $.wnoty({
        type: 'success',
        message: 'Сайт будет перезапущен в течении минуты'
      })

      this.$root.request('POST', `/admin/rebootSite`)
          .then(() => {

          })
    }
  }
}
</script>