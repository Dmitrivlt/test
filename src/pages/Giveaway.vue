<template>
  <div>
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Пользователи участвующие в розыгрыше</h3>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
      <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
          <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">
              Список пользователей
            </h3>
          </div>

          <div class="kt-portlet__head-toolbar">
            <div class="kt-portlet__head-wrapper">
              <div class="kt-portlet__head-actions">
                <a data-toggle="modal" href="#addBot" class="btn btn-success btn-elevate btn-icon-sm">
                  <i class="la la-plus"></i>
                  Добавить пользователя
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="kt-portlet__body">
          <table class="table table-striped- table-bordered table-hover table-checkable" id="users">
            <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Победитель</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>
                <router-link :to="{name: 'user', params: {id: user.user_id}}" tag="a">
                  {{ user.user.username }}
                </router-link>
              </td>
              <td>
                <span v-if="user.is_winner">Победитель</span>
              </td>
              <td>
                <a style="cursor: pointer" @click="deleteUser(user.id)"
                   class="btn btn-sm btn-danger btn-icon btn-icon-md" title="Удалить">
                  <i class="la la-trash"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addBot" tabindex="-1" role="dialog" aria-labelledby="newLabel" style="display: none;"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Добавить пользователя</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <form class="kt-form-new" onclick="return false;">
            <div class="modal-body">
              <div class="form-group">
                <label>Пользователь:</label>
                <select id="selectUser"></select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
              <button type="submit" class="btn btn-primary" v-on:click="addUser()">Добавить</button>
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
      users: {},
      createData: {}
    }
  },
  mounted() {
    this.getGiveaway()
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      setTimeout(() => {
        $('#selectUser').select2({
          theme: 'bootstrap4',
          dropdownParent: $("#addBot"),
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
    getGiveaway() {
      this.$root.request('GET', `/admin/giveaways/${this.$route.params.id}/getUsers`)
          .then((users) => {
            this.users = users

            setTimeout(() => {
              $('#users').dataTable({
                "order": [[0, 'desc']]
              });
            }, 100)
          })
          .catch(() => {
            this.$router.back()
          })
    },
    deleteUser(id) {
      this.$root.request('POST', `/admin/giveaways/deleteUser/${id}`)
          .then(() => {
            const index = this.users.findIndex(x => x.id === id)

            if (index > -1) {
              this.users.splice(index, 1)

              this.$forceUpdate()

              $('#users').dataTable().fnDestroy();

              this.$nextTick(function () {
                $('#users').DataTable();
              });
            }

            $.wnoty({
              type: 'success',
              message: 'Пользователь удален'
            })
          })
          .catch((e) => {
            $.wnoty({
              type: 'error',
              message: e
            })
          })
    },
    addUser() {
      const user = parseInt($('#selectUser option').last().val())

      this.$root.request('POST', `/admin/giveaways/addUser/${user}`, {
        giveaway_id: this.$route.params.id
      })
          .then(() => {
            $('#users').dataTable().fnDestroy();
            this.getGiveaway()

            this.$forceUpdate()

            $('#addBot').modal('hide')

            $.wnoty({
              type: 'success',
              message: 'Пользователь добавлен'
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