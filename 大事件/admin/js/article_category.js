$(function () {
  // 1. 获取所有的文章分类渲染到页面中
  // 发送ajax的请求 
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: BigNew.category_list,
      success: function (res) {
        if (res.code == 200) {
          // 服务器响应回来的显示在页面上
          var htmlStr = template('categoryList', res)
          $('tbody').html(htmlStr)
        }
      }
    })
  }
  // 新增文章分类
  $('#myModal').on('shown.bs.modal', function (e) {
    // 根据id来判断是新增还是编辑
    if ($(e.relatedTarget).attr('id') == 'xinzengfenlei') {
      // 给弹出的框设置内容
      $('#myModal h4').text('新增文章分类')
      // 清空框中的内容
      $('#myForm')[0].reset()
      // 来清除隐藏域中的id
      $('#myForm input[name=id]').val('')
    } else {
      // 给弹出框中显示内容
      $('#myModal h4').text('更新文章分类')
      // 发送ajax的请求获取到分类信息
      $.ajax({
        type: 'get',
        url: BigNew.category_search,
        data: {
          id: $(e.relatedTarget).data('id'),
        },
        success: function (res) {
          console.log(res);
          if (res.code == 200) {
            // 渲染的数据渲染到页面上面
            $('#myForm input[name=id]').val(res.data[0].id)
            $('#myForm input[name=name]').val(res.data[0].name)
            $('#myForm input[name=slug]').val(res.data[0].slug)
          }
        }
      })
    }
  })
  // 1. 此时确定按钮有可能是新增分类 有可能是更新分类
  // 2. 我们要根据隐藏域中的id值来区分
  // 3. 如果隐藏域中有值说明 是更新 反之是新增
  $('.btn-sure').on('click', function () {
    // 获取隐藏域中的id
    var id = $('#myForm input[name=id]').val()
    // 2.2 发送ajax请求
    $.ajax({
      type: 'post',
      url: id ? BigNew.category_edit : BigNew.category_add,
      data: $('#myForm').serialize(),
      success: function (res) {
        console.log(res);
        if (res.code == 201 || res.code == 200) {
          // 2.3 如果添加成功要隐藏模态框 
          $('#myModal').modal('hide')
          // 2.4 刷新当前表格
          render()
        }
      }
    })
  })
  // 3. 删除文章分类
  $('#delModal').on('shown.bs.modal', function (e) {
    window.categoryId = $(e.relatedTarget).data('id')
  })
  //如果单击了模态框中的确定按钮，才是真正的删除分类
  $('.btn-sure-del').on('click', function () {
    //发送ajax请求
    $.ajax({
      type: 'post',
      url: BigNew.category_delete,
      data: {
        id: window.categoryId
      },
      success: function (res) {
        //删除成功之后要隐藏模态框还要重新刷新表格
        if (res.code == 204) {
          $('#delModal').modal('hide')
          //重新渲染表格
          render()
        }
      }
    })
  })







})