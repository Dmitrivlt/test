<template>
  <div v-if="statistic">
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Статистика</h3>
      </div>
    </div>

    <div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">

      <div class="kt-portlet">
        <div class="kt-portlet__body  kt-portlet__body--fit">
          <div class="row row-no-padding row-col-separator-xl">
            <div class="col-md-12 col-lg-6 col-xl-3">
              <div class="kt-widget24">
                <div class="kt-widget24__details">
                  <div class="kt-widget24__info">
                    <h4 class="kt-widget24__title">
                      Профит
                    </h4>
                    <span class="kt-widget24__desc">за сегодня</span>
                  </div>

                  <span class="kt-widget24__stats kt-font-success">
                    {{ statistic.today }}<i class="la la-usd"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-lg-6 col-xl-3">
              <div class="kt-widget24">
                <div class="kt-widget24__details">
                  <div class="kt-widget24__info">
                    <h4 class="kt-widget24__title">
                      Профит
                    </h4>
                    <span class="kt-widget24__desc">за неделю</span>
                  </div>

                  <span class="kt-widget24__stats kt-font-success">
                    {{ statistic.week }}<i class="la la-usd"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-lg-6 col-xl-3">
              <div class="kt-widget24">
                <div class="kt-widget24__details">
                  <div class="kt-widget24__info">
                    <h4 class="kt-widget24__title">
                      Профит
                    </h4>
                    <span class="kt-widget24__desc">за месяц</span>
                  </div>

                  <span class="kt-widget24__stats kt-font-success">
                    {{ statistic.month }}<i class="la la-usd"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-lg-6 col-xl-3">
              <div class="kt-widget24">
                <div class="kt-widget24__details">
                  <div class="kt-widget24__info">
                    <h4 class="kt-widget24__title">
                      Профит
                    </h4>
                    <span class="kt-widget24__desc">за все время</span>
                  </div>

                  <span class="kt-widget24__stats kt-font-success">
                    {{ statistic.all }}<i class="la la-usd"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-4">
          <div class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Последние пользователи
                </h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <div class="kt-widget3 kt-scroll" data-scroll="true" data-height="616">

                <div v-for="user in statistic.usersRegistration" :key="user.id" class="kt-widget3__item">
                  <div class="kt-widget3__header">
                    <div class="kt-widget3__user-img">
                      <img class="kt-widget3__img" :src="user.avatar" alt="">
                    </div>
                    <div class="kt-widget3__info">
                      <router-link tag="a" :to="{name: 'User', params: {id: user.id}}"
                                   class="kt-widget3__username">
                        {{ user.username }}
                      </router-link>
                      <br>
                    </div>
                    <span class="kt-widget3__status kt-font-success">
                      {{ $root.parseDate(user.created_at) }}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8">
          <div class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Последние игры
                </h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <div class="kt-widget3 kt-scroll" data-scroll="true" data-height="616">
                <div class="kt-portlet__body">
                  <table class="table table-striped- table-bordered table-hover table-checkable" id="games">
                    <thead>
                    <tr>
                      <th>ID</th>
                      <th>Победитель</th>
                      <th>Сумма</th>
                      <th>Комиссия</th>
                      <th>Шанс</th>
                      <th>Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="game in statistic.history" :key="game.id">
                      <td>
                        <router-link tag="a" :to="{name: 'Game', params: {id: game.id}}"
                                     class="kt-widget3__username">
                          {{ game.id }}
                        </router-link>
                      </td>
                      <td>
                        <router-link tag="a" :to="{name: 'User', params: {id: game.user.id}}"
                                     class="kt-widget3__username">
                          {{ game.user.username }}
                        </router-link>
                      </td>
                      <td>
                        {{ game.bank.toFixed(2) }}$
                      </td>
                      <td>
                        {{ game.commission_bank.toFixed(2) }}$
                      </td>
                      <td>
                        {{ game.chance.toFixed(2) }}%
                      </td>
                      <td>
                        {{ $root.parseDate(game.created_at) }}
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Ставки в текущей игре
                </h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <div class="kt-widget3 kt-scroll" data-scroll="true" data-height="616">
                <div class="kt-portlet__body">
                  <table class="table table-striped- table-bordered table-hover table-checkable" id="gameUsers">
                    <thead>
                    <tr>
                      <th>ID игры</th>
                      <th>Пользователь</th>
                      <th>Сумма</th>
                      <th>Шанс</th>
                      <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="bet in statistic.gameBets" :key="bet.id">
                      <td>
                        <router-link tag="a" :to="{name: 'Game', params: {id: bet.game_id}}"
                                     class="kt-widget3__username">
                          {{ bet.game_id }}
                        </router-link>
                      </td>
                      <td>
                        <router-link tag="a" :to="{name: 'User', params: {id: bet.user.id}}"
                                     class="kt-widget3__username">
                          {{ bet.user.username }}
                        </router-link>
                      </td>
                      <td>
                        {{ bet.sum.toFixed(2) }}$
                      </td>
                      <td>
                        {{ ((bet.sum / statistic.lastGame.bank) * 100).toFixed(2) }}%
                      </td>
                      <td>
                        <button type="submit" @click="setWinner(bet.user.id)" class="btn btn-brand">Подкрутить</button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="kt-portlet">
            <div class="kt-portlet__head">
              <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                  Фейк ставка
                </h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <div class="kt-widget3 kt-scroll" data-scroll="true" data-height="616">
                <div class="kt-portlet__body">
                  <form class="kt-form-new" onclick="return false;">
                    <div class="modal-body">
                      <div class="form-group">
                        <label>Пользователь:</label>
                        <select style="width: 100%;" id="selectUser"></select>
                      </div>
                      <div class="form-group">
                        <label>Сумма от $:</label>
                        <input v-model="fakeBet.min" type="number" class="form-control">
                      </div>
                      <div class="form-group">
                        <label>Сумма до $:</label>
                        <input v-model="fakeBet.max" type="number" class="form-control">
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                      <button type="submit" class="btn btn-primary" v-on:click="addFakeBet()">Добавить</button>
                    </div>
                  </form>
                </div>
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
      statistic: null,
      fakeBet: {}
    }
  },
  created() {
    this.loadStatistic()
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      setTimeout(() => {
        $('#selectUser').select2({
          theme: 'bootstrap4',
          ajax: {
            delay: 250,
            url: `${process.env.VUE_APP_BACKEND_URL}/api/admin/getUsers`,
            type: "GET",
            headers: {
              "Authorization": `Bearer ${this.$cookie.get('token')}`
            },
            data: function (params) {
              const query = {
                search: params.term,
                page: params.page || 0
              };

              return query;
            },
            processResults: function (data) {
              return {
                results: data.results,
                pagination: {
                  more: data.more
                }
              };
            }
          }
        });
      }, 500)
    },
    loadStatistic() {
      this.$root.request('GET', '/admin/statistic')
          .then((data) => {
            this.statistic = data

            setTimeout(() => {
              $('#games').dataTable({
                "order": [[0, 'DESC']]
              })
              $('#gameUsers').dataTable({
                "order": [[0, 'DESC']]
              })
            }, 50)
          })
    },
    setWinner(id) {
      this.$root.request('POST', `/admin/setWinner/${id}`)
          .then(() => {
            $.wnoty({
              type: 'success',
              message: 'Победитель выбран'
            })
          })
    },
    addFakeBet() {
      this.fakeBet.user_id = parseInt($('#selectUser option').last().val())

      this.$root.request('POST', `/admin/fakeBet`, {
        user: this.fakeBet
      })
          .then(() => {
            $.wnoty({
              type: 'success',
              message: 'Ставка добавлена'
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