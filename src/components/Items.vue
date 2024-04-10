<template>
  <div class="modal fade" id="itemsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Предметы в обмене</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="history_goods">
            <div
                class="history_good tooltip"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {}
    }
  },
  mounted() {
    this.$root.$on('showItemModal', items => {
      this.items = items

      $('#itemsModal').modal('show')
    })
  }
}
</script>