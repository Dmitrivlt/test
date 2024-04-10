<template>
  <div>
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Боты</h3>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
      <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
          <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">
              Список ботов
            </h3>
          </div>

          <div class="kt-portlet__head-toolbar">
            <div class="kt-portlet__head-wrapper">
              <div class="kt-portlet__head-actions">
                <a data-toggle="modal" href="#addBot" class="btn btn-success btn-elevate btn-icon-sm">
                  <i class="la la-plus"></i>
                  Добавить бота
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="kt-portlet__body">
          <table class="table table-striped- table-bordered table-hover table-checkable" id="bots">
            <thead>
            <tr>
              <th>ID</th>
              <th>Имя пользователя</th>
              <th>Тип</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="bot in bots" :key="bot.id">
              <td>{{ bot.id }}</td>
              <td>{{ bot.username }}</td>
              <td v-if="bot.type === 'deposit'">Депозит</td>
              <td v-if="bot.type === 'bot'">Бот</td>
              <td v-if="bot.type === 'bonus'">Бонус</td>
              <td>
                <a style="cursor: pointer" @click="getBot(bot.id)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Редактировать">
                  <i class="la la-edit"></i>
                </a>
                <a style="cursor: pointer" @click="rebootBot(bot.id)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Перезапустить">
                  <i class="la la-refresh"></i>
                </a>
                <a v-if="bot.enabled" style="cursor: pointer" @click="setEnableBot(bot.id, false)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Выключить">
                  <i class="la la-pause"></i>
                </a>
                <a v-else style="cursor: pointer" @click="setEnableBot(bot.id, true)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Запустить">
                  <i class="la la-play"></i>
                </a>
                <a style="cursor: pointer" @click="deleteBot(bot.id)" class="btn btn-sm btn-danger btn-icon btn-icon-md" title="Удалить">
                  <i class="la la-trash"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addBot" tabindex="-1" role="dialog" aria-labelledby="newLabel" style="display: none;" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Создать бота</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <form class="kt-form-new" onclick="return false;">
            <div class="modal-body">
              <div class="form-group">
                <label>Username:</label>
                <input type="text" class="form-control" v-model="createData.username">
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="text" class="form-control" v-model="createData.password">
              </div>
              <div class="form-group">
                <label>shared_secret:</label>
                <input type="text" class="form-control" v-model="createData.shared_secret">
              </div>
              <div class="form-group">
                <label>identity_secret:</label>
                <input type="text" class="form-control" v-model="createData.identity_secret">
              </div>
              <div class="form-group">
                <label>steamid:</label>
                <input type="text" class="form-control" v-model="createData.steamid">
              </div>
              <div class="form-group">
                <label>trade url:</label>
                <input type="text" class="form-control" v-model="createData.trade_url">
              </div>
              <div class="form-group">
                <label>proxy:</label>
                <input type="text" class="form-control" v-model="createData.proxy">
              </div>
              <div class="form-group">
                <label>Тип:</label>
                <select class="form-control" v-model="createData.type">
                  <option value="deposit">Депозит</option>
                  <option value="bot">Бот</option>
                  <option value="bonus">Бонус</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
              <button type="submit" class="btn btn-primary" v-on:click="createBot">Создать</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editBot" tabindex="-1" role="dialog" aria-labelledby="newLabel" style="display: none;" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Редактировать бота</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <form class="kt-form-new" onclick="return false;">
            <div class="modal-body">
              <div class="form-group">
                <label>Username:</label>
                <input type="text" class="form-control" v-model="editData.username">
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="text" class="form-control" v-model="editData.password">
              </div>
              <div class="form-group">
                <label>shared_secret:</label>
                <input type="text" class="form-control" v-model="editData.shared_secret">
              </div>
              <div class="form-group">
                <label>identity_secret:</label>
                <input type="text" class="form-control" v-model="editData.identity_secret">
              </div>
              <div class="form-group">
                <label>steamid:</label>
                <input type="text" class="form-control" v-model="editData.steamid">
              </div>
              <div class="form-group">
                <label>trade url:</label>
                <input type="text" class="form-control" v-model="editData.trade_url">
              </div>
              <div class="form-group">
                <label>proxy:</label>
                <input type="text" class="form-control" v-model="editData.proxy">
              </div>
              <div class="form-group">
                <label>Тип:</label>
                <select class="form-control" v-model="editData.type">
                  <option :selected="editData.type === 'deposit'" value="deposit">Депозит</option>
                  <option :selected="editData.type === 'bot'" value="bot">Бот</option>
                  <option :selected="editData.type === 'bonus'" value="bonus">Бонус</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
              <button type="submit" class="btn btn-primary" v-on:click="editBot">Сохранить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bots: {},
      createData: {},
      editData: {}
    }
  },
  created() {
    this.getBots()
  },
  methods: {
    getBots() {
      this.$root.request('GET', '/admin/bots')
          .then((data) => {
            this.bots = data

            setTimeout(() => {
              $('#bots').dataTable({
                "order": [[0, 'DESC']]
              })
            }, 50)
          })
    },
    createBot() {
      this.$root.request('POST', '/admin/bots/create', this.createData)
          .then(() => {
            $('#addBot').modal('hide');

            $('#bots').dataTable().fnDestroy();

            this.getBots()

            $.wnoty({
              type: 'success',
              message: 'Бот создан'
            })
          })
          .catch((e) => {
            $.wnoty({
              type: 'error',
              message: e
            })
          })
    },
    deleteBot(id) {
      this.$root.request('POST', `/admin/bots/delete/${id}`)
          .then(() => {
            $('#bots').dataTable().fnDestroy();

            this.getBots()

            $.wnoty({
              type: 'success',
              message: 'Бот удален'
            })
          })
          .catch((e) => {
            $.wnoty({
              type: 'error',
              message: e
            })
          })
    },
    getBot(id) {
      this.$root.request('GET', `/admin/bots/getById/${id}`)
          .then((data) => {
            this.editData = data

            $('#editBot').modal('show');
          })
    },
    editBot() {
      this.$root.request('POST', `/admin/bots/edit/${this.editData.id}`, this.editData)
          .then(() => {
            $('#editBot').modal('hide');

            $('#bots').dataTable().fnDestroy();

            this.getBots()

            $.wnoty({
              type: 'success',
              message: 'Бот обновлен'
            })
          })
          .catch((e) => {
            $.wnoty({
              type: 'error',
              message: e
            })
          })
    },
    rebootBot(id) {
      this.$root.request('POST', `/admin/bots/reboot/${id}`)
          .then(() => {
            $.wnoty({
              type: 'success',
              message: 'Бот перезапущен'
            })
          })
          .catch((e) => {
            $.wnoty({
              type: 'error',
              message: e
            })
          })
    },
    setEnableBot(id, enable) {
      this.$root.request('POST', `/admin/bots/enable/${id}`, {
        enable
      })
          .then(() => {
            $('#bots').dataTable().fnDestroy();

            this.getBots()

            $.wnoty({
              type: 'success',
              message: enable ? 'Бот запущен' : 'Бот выключен'
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