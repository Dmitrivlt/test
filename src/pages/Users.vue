<template>
  <div>
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Пользователи</h3>
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
        </div>
        <div class="kt-portlet__body">
          <table class="table table-striped- table-bordered table-hover table-checkable" id="users">
            <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Steam профиль</th>
              <th>Игр сыграно</th>
              <th>Игр выиграно</th>
              <th>Выиграно</th>
              <th>Роль</th>
              <th>Действия</th>
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
  mounted() {
    this.loadTable()
  },
  methods: {
    async loadTable() {
      const app =  this;
      const table = $('#users');

      table.dataTable().fnDestroy();

      table.DataTable({
        responsive: true,
        searchDelay: 500,
        processing: true,
        serverSide: true,
        ajax: {
          url: `${process.env.VUE_APP_BACKEND_URL}/api/admin/users`,
          type: "GET",
          headers: {
            "Authorization": `Bearer ${this.$cookie.get('token')}`
          }
        },
        order: [[ 0, 'DESC' ]],
        columns: [
          { data: "id", searchable: true },
          { data: "username", searchable: true },
          { data: null, searchable: false,
            render: function (data, type, row) {
              return '<a href="https://steamcommunity.com/profiles/'+row.steamId+'/">Профиль Steam</a>'
            }
          },
          { data: "total_played", searchable: true },
          { data: "total_wins", searchable: true },
          { data: "total_win", searchable: true,
            render: function (data, type, row) {
              return `${row.total_win.toFixed(2)}$`
            }
          },
          { data: "role", searchable: true,
            render: function (data, type, row) {
              if (row.is_fake) {
                return 'Бот'
              }

              if (row.role === 'admin') {
                return 'Администратор';
              } else if (row.role === 'moderator') {
                return 'Модератор';
              } else {
                return 'Пользователь';
              }
            }
          },
          { data: null, searchable: false,
            render: function (data, type, row) {
              return '                                <a class="btn btn-sm btn-clean btn-icon btn-icon-md editUser" data-id="'+row.id+'" title="Редактировать">\n' +
                  '                                    <i class="la la-edit"></i>\n' +
                  '                                </a>'
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

      $(document).on('click', '.editUser', function() {
        app.edit($(this).attr('data-id'));
      });
    },
    async edit(id) {
      this.$router.push({
        name: 'User',
        params: {
          id: id
        }
      });
    }
  }
}
</script>