<template>
  <div>
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
      <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Розыгрыши</h3>
      </div>
    </div>

    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
      <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
          <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">
              Список розыгрышей
            </h3>
          </div>
          <div class="kt-portlet__head-toolbar">
            <div class="kt-portlet__head-wrapper">
              <div class="kt-portlet__head-actions">
                <a data-toggle="modal" href="#addGiveaway" class="btn btn-success btn-elevate btn-icon-sm">
                  <i class="la la-plus"></i>
                  Добавить розыгрыш
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="kt-portlet__body">
          <table class="table table-striped- table-bordered table-hover table-checkable" id="giveaways">
            <thead>
            <tr>
              <th>ID</th>
              <th>Предмет</th>
              <th>Пользователей</th>
              <th>Победитель</th>
              <th>Дата окончания</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addGiveaway" tabindex="-1" role="dialog" aria-labelledby="newLabel" style="display: none;" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Создать розыгрыш</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <form class="kt-form-new" onclick="return false;">
            <div class="modal-body">
              <div class="form-group">
                <label>Предмет:</label>
                <select id="selectItem"></select>
              </div>
              <div class="form-group">
                <label>Дата окончания:</label>
                <div class="input-group date" id="datetimepicker">
                  <input type="text" class="form-control"/>
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
              <button type="submit" class="btn btn-primary" v-on:click="createGiveaway">Создать</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const app =  this;

    this.loadTable()
    this.loadInventoryItem()

    $('#datetimepicker').datetimepicker({
      locale: 'ru'
    });

    $(document).on('click', '.showUsersGiveaway', function() {
      app.showUsers($(this).attr('data-id'));
    });

    $(document).on('click', '.deleteGiveaway', function() {
      app.delete($(this).attr('data-id'));
    });
  },
  methods: {
    async loadTable() {
      const app =  this;
      const table = $('#giveaways');

      table.dataTable().fnDestroy();

      table.DataTable({
        responsive: true,
        searchDelay: 500,
        processing: true,
        serverSide: true,
        ajax: {
          url: `${process.env.VUE_APP_BACKEND_URL}/api/admin/giveaways`,
          type: "GET",
          headers: {
            "Authorization": `Bearer ${this.$cookie.get('token')}`
          }
        },
        columns: [
          { data: "id", searchable: true },
          { data: "item_id", searchable: true,
            render: function (data, type, row) {
              return `${row.item.market_hash_name}`
            }
          },
          { data: "users", searchable: true },
          { data: "winner_id", searchable: true,
            render: function (data, type, row) {
              return row.winner_id !== null ? `<a href="/user/${row.winner.id}">${row.winner.username}</a>` : ''
            }
          },
          { data: "end_time", searchable: true,
            render: function (data, type, row) {
              return app.$root.parseDate(row.end_time)
            }
          },
          { data: null, searchable: false,
            render: function (data, type, row) {
              return '<a style="cursor: pointer" class="btn btn-sm btn-clean btn-icon btn-icon-md showUsersGiveaway" data-id="'+row.id+'" title="Пользователи">\n' +
                  '<i class="la la-user"></i>\n' +
                  '</a>' +
                  '<a style="cursor: pointer" class="btn btn-sm btn-danger btn-icon btn-icon-md deleteGiveaway" data-id="'+row.id+'" title="Удалить">\n' +
                  '<i class="la la-trash"></i>\n' +
                  '</a>'
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
    async loadInventoryItem() {
      setTimeout(() => {
        $('#selectItem').select2({
          theme: 'bootstrap4',
          dropdownParent: $("#addGiveaway"),
          ajax: {
            delay: 250,
            url: `${process.env.VUE_APP_BACKEND_URL}/api/admin/findItemsInInventory`,
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
    async showUsers(id) {
      this.$router.push({
        name: 'Giveaway',
        params: {
          id: id
        }
      });
    },
    async delete(id) {
      this.$root.request('POST', `/admin/giveaways/${id}/del`)
          .then(() => {
            this.loadTable()

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
    async createGiveaway() {
      this.$root.request('POST', '/admin/giveaways/create', {
        end_time: $('#datetimepicker').data('date'),
        item_id: $('#selectItem option').last().val()
      })
          .then(() => {
            $('#addGiveaway').modal('hide');

            this.loadTable()

            $.wnoty({
              type: 'success',
              message: 'Розыгрыш создан'
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