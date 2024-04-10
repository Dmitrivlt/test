<template>
  <div v-if="user">
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Редактирование пользователя</h3>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid">
      <div class="row">
        <div class="col-xl-4">
          <div class="kt-portlet kt-portlet--fit kt-portlet--head-lg kt-portlet--head-overlay">
            <div class="kt-portlet__head kt-portlet__space-x">
              <div class="kt-portlet__head-label" style="width: 100%;">
                <h3 class="kt-portlet__head-title text-center" style="width: 100%;">
                  {{ user.username }}
                </h3>
              </div>
            </div>
            <div class="kt-portlet__body">
              <div class="kt-widget28">
                <div class="kt-widget28__visual"
                     :style="'background: url('+user.avatar+') bottom center no-repeat'"></div>
                <div class="kt-widget28__wrapper kt-portlet__space-x">
                  <div class="tab-content">
                    <div id="menu11" class="tab-pane active">
                      <div class="kt-widget28__tab-items">
                        <div class="kt-widget12">
                          <div class="kt-widget12__content">
                            <div class="kt-widget12__item">
                              <div class="kt-widget12__info text-center">
                                <span class="kt-widget12__desc">Игр сыграно</span>
                                <span class="kt-widget12__value">{{ user.total_played }}</span>
                              </div>
                              <div class="kt-widget12__info text-center">
                                <span class="kt-widget12__desc">Игр выграно</span>
                                <span class="kt-widget12__value">{{ user.total_wins }}</span>
                              </div>
                              <div class="kt-widget12__info text-center">
                                <span class="kt-widget12__desc">Сумма выигрышей</span>
                                <span class="kt-widget12__value">{{ user.total_win.toFixed(2) }} <i
                                    class="la la-usd"></i></span>
                              </div>
                            </div>
                          </div>

                          <div class="kt-widget12__content">
                            <div class="kt-widget12__item">
                              <div class="kt-widget12__info text-center">
                                <span class="kt-widget12__desc">Дата регистрации</span>
                                <span class="kt-widget12__value">{{ $root.parseDate(user.created_at) }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                  Информация о пользователе
                </h3>
              </div>
            </div>
            <form class="kt-form" v-on:submit="save" onsubmit="return false;">
              <div class="kt-portlet__body">
                <div class="form-group row">
                  <div class="col-lg-4">
                    <label>Имя:</label>
                    <input type="text" class="form-control" v-model="user.username">
                  </div>
                  <div class="col-lg-4">
                    <label>Уровень:</label>
                    <input type="text" class="form-control" v-model="user.lvl">
                  </div>
                  <div class="col-lg-4">
                    <label>SteamID64:</label>
                    <input type="text" class="form-control" v-model="user.steamId" disabled>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-6">
                    <label>Ссылка на обмен:</label>
                    <input type="text" class="form-control" v-model="user.trade_url">
                  </div>
                  <div class="col-lg-6">
                    <label>Профиль STEAM:</label>
                    <div class="kt-input-icon">
                      <input type="text" class="form-control"
                             :value="'https://steamcommunity.com/profiles/'+user.steamId+'/'" disabled>
                      <span class="kt-input-icon__icon kt-input-icon__icon--right"><span><i
                          class="la la-steam"></i></span></span>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div v-if="$root.user.role === 'admin'" class="col-lg-4">
                    <label>Роль:</label>
                    <select class="form-control" v-model="user.role">
                      <option :selected="user.role === 'user'" value="user">Пользователь</option>
                      <option :selected="user.role === 'moderator'" value="moderator">Модератор</option>
                      <option :selected="user.role === 'admin'" value="admin">Администратор</option>
                    </select>
                  </div>
                  <div class="col-lg-4">
                    <label>Блокировка в чате:</label>
                    <select class="form-control" v-model="user.is_ban_chat">
                      <option :selected="!user.is_ban_chat" value="0">Не заблокирован</option>
                      <option :selected="user.is_ban_chat" value="1">Заблокирован</option>
                    </select>
                  </div>
                </div>

                <div class="kt-portlet__foot kt-portlet__foot--solid">
                  <div class="kt-form__actions">
                    <div class="row">
                      <div class="col-12">
                        <button type="submit" class="btn btn-brand">Сохранить</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid">
      <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
          <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">
              Список игр
            </h3>
          </div>
        </div>
        <div class="kt-portlet__body">
          <table class="table table-striped- table-bordered table-hover table-checkable" id="games">
            <thead>
            <tr>
              <th>ID</th>
              <th>Банк</th>
              <th>Комиссия</th>
              <th>Шанс</th>
              <th>Статус</th>
              <th>Дата</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid">
      <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
          <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">
              Список обменов
            </h3>
          </div>
        </div>
        <div class="kt-portlet__body">
          <table class="table table-striped- table-bordered table-hover table-checkable" id="trades">
            <thead>
            <tr>
              <th>ID</th>
              <th>ID игры</th>
              <th>Тип</th>
              <th>Предметы</th>
              <th>Статус</th>
              <th>Дата</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      info: {}
    }
  },
  mounted() {
    const app = this

    $(document).on('click', '.editItems', function() {
      app.openModalItems($(this).attr('data-id'));
    });

    this.getUser()
  },
  methods: {
    async getUser()  {
      this.$root.request('GET', `/admin/user/${this.$route.params.id}`)
          .then((data) => {
            this.user = data.user
            this.info = data.info

            this.user.is_ban_chat = Number(this.user.is_ban_chat)

            setTimeout(() => {
              this.getGames()
              this.getTrades()
            }, 100)
          })
          .catch(() => {
            this.$router.back()
          })
    },
    async save() {
      this.$root.request('POST', `/admin/user/${this.$route.params.id}`, {
        user: this.user
      })
          .then(() => {
            $.wnoty({
              type: 'success',
              message: 'Информация обновлена'
            })
          })
          .catch((e) => {
            $.wnoty({
              type: 'error',
              message: e
            })
          })
    },
    async getGames() {
      const app = this

      $('#games').dataTable().fnDestroy();

      $('#games').DataTable({
        responsive: true,
        searchDelay: 500,
        processing: true,
        serverSide: true,
        ajax: {
          url: `${process.env.VUE_APP_BACKEND_URL}/api/admin/user/${this.user.id}/getGames`,
          type: "GET",
          headers: {
            "Authorization": `Bearer ${this.$cookie.get('token')}`
          }
        },
        order: [[ 0, 'DESC' ]],
        columns: [
          { data: "game_id", searchable: true,
            render: function (data, type, row) {
              return `<a href="/games/${row.game_id}">${row.game_id}</a>`
            }
          },
          {data: "game.bank", searchable: true,
            render: function (data, type, row) {
              return `${row.game.bank.toFixed(2)}$`
            }
          },
          {data: "game.commission_bank", searchable: true,
            render: function (data, type, row) {
              return `${row.game.commission_bank.toFixed(2)}$`
            }
          },
          {data: "game.chance", searchable: true,
            render: function (data, type, row) {
              return `${row.game.chance.toFixed(2)}%`
            }
          },
          {data: null, searchable: true,
            render: function (data, type, row) {
              if (row.game.status !== 3) {
                return 'Ожидает'
              } else {
                if (row.game.winner_id === app.user.id) {
                  return '<span style="color: green;">Выиграл</span>'
                } else {
                  return '<span style="color: red;">Проиграл</span>'
                }
              }
            }
          },
          { data: "created_at", searchable: false,
            render: function (data, type, row) {
              return app.$root.parseDate(row.created_at)
            }
          }
        ],
        "language": {
          "processing": "Подождите...",
          "search": "Поиск:",
          "lengthMenu": "Показать _MENU_ записей",
          "info": "Записи с _START_ по _END_ из _TOTAL_ записей",
          "infoEmpty": "Записи с 0 до 0 из 0 записей",
          "infoFiltered": "(отфильтровано из _MAX_ записей)",
          "infoPostFix": "",
          "loadingRecords": "Загрузка записей...",
          "zeroRecords": "Записи отсутствуют.",
          "emptyTable": "В таблице отсутствуют данные",
          "paginate": {
            "first": "Первая",
            "previous": "Предыдущая",
            "next": "Следующая",
            "last": "Последняя"
          },
          "aria": {
            "sortAscending": ": активировать для сортировки столбца по возрастанию",
            "sortDescending": ": активировать для сортировки столбца по убыванию"
          }
        }
      });
    },
    async getTrades() {
      const app = this

      $('#trades').dataTable().fnDestroy();

      $('#trades').DataTable({
        responsive: true,
        searchDelay: 500,
        processing: true,
        serverSide: true,
        ajax: {
          url: `${process.env.VUE_APP_BACKEND_URL}/api/admin/user/${this.user.id}/getTrades`,
          type: "GET",
          headers: {
            "Authorization": `Bearer ${this.$cookie.get('token')}`
          }
        },
        order: [[ 0, 'DESC' ]],
        columns: [
          { data: "id", searchable: true},
          { data: "game_id", searchable: false,
            render: function (data, type, row) {
              return `<a href="/games/${row.game_id}">${row.game_id}</a>`
            }
          },
          { data: "type", searchable: false,
            render: function (data, type, row) {
              if (row.type === 'deposit') {
                return 'Депозит'
              } else {
                return 'Выигрыш'
              }
            }
          },
          { data: "type", searchable: false,
            render: function (data, type, row) {
              return `<a href="#" onclick="return false;" class="editItems" data-id="${row.id}">Открыть предметы</a>`
            }
          },
          { data: "status", searchable: false },
          { data: "created_at", searchable: false,
            render: function (data, type, row) {
              return app.$root.parseDate(row.created_at)
            }
          }
        ],
        "language": {
          "processing": "Подождите...",
          "search": "Поиск:",
          "lengthMenu": "Показать _MENU_ записей",
          "info": "Записи с _START_ по _END_ из _TOTAL_ записей",
          "infoEmpty": "Записи с 0 до 0 из 0 записей",
          "infoFiltered": "(отфильтровано из _MAX_ записей)",
          "infoPostFix": "",
          "loadingRecords": "Загрузка записей...",
          "zeroRecords": "Записи отсутствуют.",
          "emptyTable": "В таблице отсутствуют данные",
          "paginate": {
            "first": "Первая",
            "previous": "Предыдущая",
            "next": "Следующая",
            "last": "Последняя"
          },
          "aria": {
            "sortAscending": ": активировать для сортировки столбца по возрастанию",
            "sortDescending": ": активировать для сортировки столбца по убыванию"
          }
        }
      });
    },
    openModalItems(id) {
      this.$root.request('GET', `/admin/games/trades/${id}`)
          .then((data) => {
            this.$root.openItemModal(JSON.parse(data.items))
          })
          .catch(() => {
            $.wnoty({
              type: 'error',
              message: e
            })
          })
    }
  }
}
</script>