<template>
  <div v-if="config">
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Настройки</h3>
      </div>
    </div>

    <div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
      <div class="kt-portlet kt-portlet--tabs">
        <div class="kt-portlet__head">
          <div class="kt-portlet__head-toolbar">
            <ul class="nav nav-tabs nav-tabs-line nav-tabs-line-danger nav-tabs-line-2x nav-tabs-line-right" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#site" role="tab" aria-selected="true">
                  Настройки сайта
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#bots" role="tab" aria-selected="true">
                  Настройки ботов
                </a>
              </li>
            </ul>
          </div>
        </div>
        <form class="kt-form" onclick="return false;">
          <div class="kt-portlet__body">
            <div class="tab-content">
              <div class="tab-pane active" id="site" role="tabpanel">
                <div class="kt-section">
                  <h3 class="kt-section__title">
                    Настройки сайта:
                  </h3>
                  <div class="form-group row">
                    <div class="col-lg-4">
                      <label>Игроков до старта:</label>
                      <input type="text" class="form-control" v-model="config.game_users_to_start" name="game_users_to_start">
                    </div>
                    <div class="col-lg-4">
                      <label>Время до старта (сек):</label>
                      <input type="text" class="form-control" v-model="config.game_time_to_start" name="game_time_to_start">
                    </div>
                    <div class="col-lg-4">
                      <label>Комиссия в игре (%):</label>
                      <input type="text" class="form-control" v-model="config.game_fee" name="game_fee">
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-lg-4">
                      <label>Минимальная ставка ($):</label>
                      <input type="text" class="form-control" v-model="config.game_min_bet" name="game_min_bet">
                    </div>
                    <div class="col-lg-4">
                      <label>Фейк онлайн:</label>
                      <input type="text" class="form-control" v-model="config.fake_online" name="fake_online">
                    </div>
                    <div class="col-lg-4">
                      <label>Ссылка на обмен для комиссии:</label>
                      <input type="text" class="form-control" v-model="config.commission_trade_url" name="commission_trade_url">
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="bots" role="tabpanel">
                <div class="kt-section">
                  <h3 class="kt-section__title">
                    Настройки сайта:
                  </h3>
                  <div class="form-group row">
                    <div class="col-lg-6">
                      <label>Минимальная сумма ставки в $:</label>
                      <input type="number" class="form-control" v-model="config.game_min_fake_bet" name="game_min_fake_bet">
                    </div>
                    <div class="col-lg-6">
                      <label>Максимальная сумма ставки в $:</label>
                      <input type="number" class="form-control" v-model="config.game_max_fake_bet" name="game_max_fake_bet">
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-lg-6">
                      <label>Минимальное кол-во ботов в игре:</label>
                      <input type="number" class="form-control" v-model="config.game_min_fake_users" name="game_min_fake_users">
                    </div>
                    <div class="col-lg-6">
                      <label>Максимальное кол-во ботов в игре:</label>
                      <input type="number" class="form-control" v-model="config.game_max_fake_users" name="game_max_fake_users">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kt-portlet__foot">
            <div class="kt-form__actions">
              <button type="submit" class="btn btn-primary" v-on:click="save">Сохранить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: null,
      oldConfig: null,
      mailing: null
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      this.$root.request('GET', `/admin/config`)
          .then((config) => {
            this.config = config
            this.oldConfig = config
          })
          .catch(() => {
            this.$router.back()
          })
    },
    save() {
      this.$root.request('POST', '/admin/config/save', this.config)
          .then(() => {
            $.wnoty({
              type: 'success',
              message: 'Настройки сохранены'
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
