<template>
  <div v-if="game">
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Игра #{{ game.id }}</h3>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="kt-portlet">
            <div class="kt-portlet__head" style="align-items: center;">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Информация о игре
                </h3>
              </div>

              <button @click="$root.redirectToGame(game.id)" class="btn btn-brand">Перейти на игру на сайте</button>
            </div>

            <div class="kt-form">
              <div class="kt-portlet__body">
                <div class="form-group row">
                  <div class="col-lg-3">
                    <label>Банк:</label>
                    <input type="text" disabled class="form-control" :value="`${game.bank.toFixed(2)}$`">
                  </div>
                  <div class="col-lg-3">
                    <label>Комиссия:</label>
                    <input type="text" disabled class="form-control" :value="`${game.commission_bank.toFixed(2)}$`">
                  </div>
                  <div class="col-lg-3">
                    <label>Пользователи:</label>
                    <input type="text" disabled class="form-control" :value="game.users">
                  </div>
                  <div class="col-lg-3">
                    <label>Предметы:</label>
                    <input type="text" disabled class="form-control" :value="game.items">
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-lg-3">
                    <label>Победитель:</label>
                    <router-link
                        tag="a"
                        :to="{name: 'User', params: {id: game.user.id}}"
                        class="form-control"
                        style="background-color: #f7f8fa;"
                    >
                      {{ game.user.username }}
                    </router-link>
                  </div>
                  <div class="col-lg-3">
                    <label>Шанс:</label>
                    <input type="text" disabled class="form-control" :value="`${game.chance.toFixed(2)}%`">
                  </div>
                  <div class="col-lg-3">
                    <label>Номер раунда:</label>
                    <input type="text" disabled class="form-control" :value="game.round_number">
                  </div>
                  <div class="col-lg-3">
                    <label>Хеш:</label>
                    <input type="text" disabled class="form-control" :value="game.hash">
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-lg-6">
                    <label>Дата старта игры:</label>
                    <input type="text" disabled class="form-control" :value="`${$root.parseDate(game.created_at)}`">
                  </div>
                  <div class="col-lg-6">
                    <label>Дата окончания игры:</label>
                    <input type="text" disabled class="form-control" :value="`${$root.parseDate(game.updated_at)}`">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="kt-portlet">
            <div class="kt-portlet__head" style="align-items: center;">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Выигранные предметы
                </h3>
              </div>

              <div>
                <span>
                  Статус:
                  <span v-if="game.error_send_bot_ids !== null" style="color: red;">Ошибка</span>
                  <span v-else style="color: green;">Отправлен</span>
                </span>
                <button
                    v-if="game.error_send_bot_ids !== null"
                    @click="resendItems"
                    class="btn btn-brand"
                >Переотправить предметы
                </button>
              </div>
            </div>

            <div class="kt-form">
              <div class="kt-portlet__body">
                <div class="history_goods">
                  <div
                      class="history_good tooltip"
                      v-for="(item, i) in JSON.parse(game.win_items)"
                      :key="i"
                  >
                    <div class="img_box">
                      <img
                        :src="`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/330x192`"
                        alt="">
                    </div>
                    <div class="descript">
                      <p>${{ item.price.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="kt-portlet">
            <div class="kt-portlet__head" style="align-items: center;">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Комиссионные предметы
                </h3>
              </div>
            </div>

            <div class="kt-form">
              <div class="kt-portlet__body">
                <div class="history_goods">
                  <div
                      class="history_good tooltip"
                      v-for="(item, i) in JSON.parse(game.commission_items)"
                      :key="i"
                  >
                    <div class="img_box">
                      <img
                          :src="`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/330x192`"
                          alt="">
                    </div>
                    <div class="descript">
                      <p>${{ item.price.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="kt-portlet">
            <div class="kt-portlet__head" style="align-items: center;">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Список обменов в игре
                </h3>
              </div>
            </div>

            <div class="kt-form">
              <div class="kt-portlet__body">
                <table class="table table-striped- table-bordered table-hover table-checkable" id="trades">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Пользователь</th>
                    <th>Тип</th>
                    <th>Предметы</th>
                    <th>Статус</th>
                    <th>Дата</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="trade in info.trades" :key="trade.id">
                    <td>
                      {{ trade.id }}
                    </td>
                    <td>
                      <router-link tag="a" :to="{name: 'User', params: {id: trade.user.id}}">{{ trade.user.username }}</router-link>
                    </td>
                    <td>
                      <span v-if="trade.type === 'deposit'">Депозит</span>
                      <span v-else>Выигрыш</span>
                    </td>
                    <td>
                      <a href="#" onclick="return false;" @click="$root.openItemModal(JSON.parse(trade.items))">Открыть предметы</a>
                    </td>
                    <td>
                      {{ trade.status }}
                    </td>
                    <td>{{ $root.parseDate(trade.created_at) }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      game: null,
      info: null
    }
  },
  mounted() {
    this.getGame()
  },
  methods: {
    getGame() {
      this.$root.request('GET', `/admin/games/game/${this.$route.params.id}`)
          .then((data) => {
            this.game = data.game
            this.info = data.info

            setTimeout(() => {
              $('#trades').dataTable({
                "order": [[ 0, 'DESC' ]]
              })
            }, 100)
          })
          .catch(() => {
            this.$router.back()
          })
    },
    resendItems() {
      $.wnoty({
        type: 'warning',
        message: 'Обмен отправляется'
      })

      this.$root.request('POST', `/admin/games/game/${this.$route.params.id}/resend`)
          .then(() => {
            $('#trades').dataTable().fnDestroy();

            this.getGame();

            $.wnoty({
              type: 'success',
              message: 'Обмен отправлен'
            })
          })
          .catch((e) => {
            $.wnoty({
              type: 'error',
              message: e
            })
          })
    }
  }
}
</script>