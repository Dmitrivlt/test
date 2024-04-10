<template>
  <div>
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Онлайн</h3>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
      <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
          <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">
              Список пользователей онлайн
            </h3>
          </div>
        </div>
        <div class="kt-portlet__body">
          <table class="table table-striped- table-bordered table-hover table-checkable" id="bots">
            <thead>
            <tr>
              <th>ID</th>
              <th>Имя пользователя</th>
              <th>SteamID64</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in online" :key="user.id">
              <td>{{ user.id }}</td>
              <td>
                <router-link tag="a" :to="{name: 'User', params: {id: user.id}}">{{ user.username }}</router-link>
              </td>
              <td>{{ user.steamId }}</td>
            </tr>
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
      online: {}
    }
  },
  created() {
    this.getOnline()
  },
  methods: {
    getOnline() {
      this.$root.request('GET', '/admin/online')
          .then((data) => {
            this.online = data

            setTimeout(() => {
              $('#online').dataTable({
                "order": [[0, 'DESC']]
              })
            }, 50)
          })
    },
  }
}
</script>