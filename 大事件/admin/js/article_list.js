$(function () {
  // 一跳转这个页面立即触发ajax的请求
  
  $.ajax({
    type: 'get',
    url: BigNew.article_query,
    success: function (res) {
      if (res.code == 200) {
        console.log(res)

        var htmlStr = template('articleTmp', res.data)
        $('tbody').html(htmlStr)
        if (res.data.totalCount == 0) {
          $('#pagination-demo').hide().next().show()
        } else {
          $('#pagination-demo').show().next().hide()
          // 调用分页函数实现分页功能
          pagination(res)
        }
      }
    }
  })
  // 将分页功能封装到一个单独的函数当中
  var currentPage;
  // function pagination(res, visiblepages) {
  //   $('#pagination-demo').twbsPagination({
  //     // 总页数
  //     totalPages: res.data.totalPage,
  //     // 当前页面显示的最大页码数
  //     visiblePages: visiblePages || 7,

      function pagination(res, visiblePages) {
        // 当数据响应回来的时候，要实现分页
        $('#pagination-demo').twbsPagination({
          // totalPages: 35, // 总页数
          totalPages: res.data.totalPage, // 总页数
          visiblePages: visiblePages || 7,
      first: "第1页",
      last: '最后1页',
      next: '下一页',
      prev: '上一页',
      // 默认不起用初次单击
      initiateStartPageClick: false,
      onPageClick: function (event, page) {
        // 将当前页码传到一个变量当中
        currentPage = page
        // 当单击当前页码的时候,发送ajax请求,获取当前页面的最新数据
        $.ajax({
          type: 'get',
          url: BigNew.article_query,
          data: {
            key: $('#key').val(),
            type: $('#selCategory').val(),
            state: $('#selStatus').val(),
            page: page,
            perpage: 6
          },
          success: function (res) {
            console.log(res);
            if (res.code == 200) {
              var htmlStr = template('articleTmp', res.data)
              $('tbody').html(htmlStr)
            }
          }
        })
      }
    })
  }
  // 文章列表页面中的文章分类数据渲染
  // 只要是一跳转到这个页面，就立即发送ajax请求获取文章所有的分类 
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
      console.log(res);
      if (res.code == 200) {
        // 将服务器响应回来的数据显示在页面上
        var htmlStr = template('categoryTmp', res)
        
        $('#selCategory').html(htmlStr)
      }
    }
  })
  // 文章筛选功能
  // 给筛选按钮注册事件
  $('#btnSearch').on('click', function (e) {
    console.log(119)
    // 阻止默认行为
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'get',
      url: BigNew.article_query,
      data: {
        key: $('#key').val(),
        type: $('#selCategory').val(),
        state: $('#selStatus').val(),
        page: 1,
        perpage: 6
      },
      success: function (res) {
        console.log(res)
        // 将响应回来的数据渲染在表格上
        if (res.code == 200) {
          var htmlStr = template('articleTmp', res.data)
          $('tbody').html(htmlStr)
          if (res.data.totalCount == 0) {
            $('#pagination-demo').hide().next().show()
          } else {
            $('#pagination-demo').show().next().hide()
            // 改变页码显示
            // 第1个参数是当总页码改变的时候
            // 第2个参数是现在的总页码值
            // 第3个参数是默认显示的页码值
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
          }
        }
      }
    })
  })
  // 删除文章
  // 给模态框注册显示时的事件 是为了获取删除按钮中的id 
  $('#myModal').on('shown.bs.modal', function (e) {
    // 获取删除按钮中的id
    window.articleId = $(e.relatedTarget).data('id')
  })
  // 给模态框的确定按钮注册事件
  $('.btn-sure').on('click', function () {
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: BigNew.article_delete,
      data: {
        id: articleId
      },
      success: function (res) {
        console.log(res)
        if (res.code == 204) {
          // 隐藏模态框
          $('#myModal').modal('hide')
          // 重新渲染表格
          $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
              key: $('#key').val(),
              type: $('#selCategory').val(),
              state: $('#selStatus').val(),
              page: currentPage,
              perpage: 6
            },
            success: function (res) {
              console.log(res)
              if (res.code == 200) {
                var htmlStr = template('articleTmp', res.data)
                $('tbody').html(htmlStr)
                if (res.data.totalCount == 0) {
                  $('#pagination-demo').hide().next().show()
                } else {
                  $('#pagination-demo').show().next().hide()
                }
              }
            }
          })
        }
      }
    })
  })





})