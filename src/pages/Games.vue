<template>
  <div>
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Игры</h3>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
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
              <th>Победитель</th>
              <th>Сумма</th>
              <th>Комиссия</th>
              <th>Шанс</th>
              <th>Статус отправки</th>
              <th>Дата</th>
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
      const app = this;
      const table = $('#games');

      table.dataTable().fnDestroy();

      table.DataTable({
        responsive: true,
        searchDelay: 500,
        processing: true,
        serverSide: true,
        ajax: {
          url: `${process.env.VUE_APP_BACKEND_URL}/api/admin/games`,
          type: "GET",
          headers: {
            "Authorization": `Bearer ${this.$cookie.get('token')}`
          }
        },
        order: [[ 0, 'DESC' ]],
        columns: [
          {data: "id", searchable: true},
          {data: "user.username", searchable: true,
            render: function (data, type, row) {
              return `<a href="/users/${row.user.id}">${row.user.username}</a>`
            }
          },
          {data: "bank", searchable: true,
            render: function (data, type, row) {
              return `${row.bank.toFixed(2)}$`
            }
          },
          {data: "commission_bank", searchable: true,
            render: function (data, type, row) {
              return `${row.commission_bank.toFixed(2)}$`
            }
          },
          {data: "chance", searchable: true,
            render: function (data, type, row) {
              return `${row.chance.toFixed(2)}%`
            }
          },
          {data: "error_send_bot_ids", searchable: true,
            render: function (data, type, row) {
              if (row.error_send_bot_ids === null) {
                return '<span style="color: green;">Отправлен</span>'
              } else {
                return '<span style="color: red;">Ошибка</span>'
              }
            }
          },
          {data: "created_at", searchable: true,
            render: function (data, type, row) {
              return app.$root.parseDate(row.created_at)
            }
          },
          {
            data: null, searchable: false,
            render: function (data, type, row) {
              return '                                <a class="btn btn-sm btn-clean btn-icon btn-icon-md editGame" data-id="' + row.id + '" title="Редактировать">\n' +
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

      $(document).on('click', '.editGame', function () {
        app.edit($(this).attr('data-id'));
      });
    },
    async edit(id) {
      this.$router.push({
        name: 'Game',
        params: {
          id: id
        }
      });
    }
  }
}
</script>