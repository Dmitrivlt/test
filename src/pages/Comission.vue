<template>
  <div v-if="$root.user.role === 'admin'">
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Комиссия</h3>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="kt-portlet">
            <div class="kt-form">
              <div class="kt-portlet__body">
                <div class="history_goods">
                  <div
                      class="history_good tooltip"
                      :style="[typeof selectedItems[item.id] !== 'undefined' ? {'border': '5px solid red'} : {}]"
                      style="cursor: pointer;"
                      @click="selectInventory(item.id)"
                      v-for="(item, i) in items"
                      :key="i"
                  >
                    <div class="img_box">
                      <img
                          :src="`https://steamcommunity-a.akamaihd.net/economy/image/${item.item.icon_url}/330x192`"
                          alt="">
                    </div>
                    <div class="descript">
                      <p>${{ item.item.price.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="kt-portlet__body">
                <button style="width: 200px; margin-bottom: 10px;" @click="selectAll" type="submit" class="btn btn-brand">Выбрать все</button>
                <input type="text" v-model="trade_url" class="form-control" placeholder="Ссылка на обмен">
                <button @click="sendItems" type="submit" style="margin-top: 10px;" class="btn btn-brand">Отправить</button>
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
      items: {},
      selectedItems: {},
      trade_url: '',
      selectedAll: false
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      this.$root.request('GET', '/admin/comission')
          .then((data) => {
            this.items = data
          })
    },
    selectInventory(id) {
      if (typeof this.selectedItems[id] !== "undefined") {
        delete this.selectedItems[id];
      } else {
        this.selectedItems[id] = id;
      }

      this.$forceUpdate();
    },
    selectAll() {
      if (!this.selectedAll) {
        this.items.map((item) => {
          this.selectedItems[item.id] = item.id;
        })
      } else {
        this.items.map((item) => {
          if (typeof this.selectedItems[item.id] !== "undefined") {
            delete this.selectedItems[item.id];
          }
        })
      }

      this.selectedAll = !this.selectedAll

      this.$forceUpdate();
    },
    sendItems() {
      this.$root.request('POST', `/admin/comission/send`, {
        trade_url: this.trade_url,
        items: this.selectedItems
      })
          .then(() => {
            this.getItems()

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