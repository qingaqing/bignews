$(function () {
  // 思路:
  // 1. 一跳转到这个页面就要发送ajax请求
  // 2. 将请求回来的当前登陆用户的信息显示在用户页面上

  // 1.1 发送ajax请求
  $.ajax({
    type: 'get',
    url: BigNew.user_detail,
    success: function (res) {
      // console.log(res)
      // 渲染数据
      if (res.code == 200) {
        // $('#form .username').val(res.data.username)
        // $('#form .email').val(res.data.email)
        // $('#form .password').val(res.data.password)
        // $('#form .nickname').val(res.data.nickname)

        // 简单的做法
        for (var key in res.data) {
          $(`#form .${key}`).val(res.data[key])
        }
        $('#form .user_pic').attr('src', res.data.userPic)
      }
    }
  })

  // 2. 图片预览功能
  // 2.1 给input注册change事件
  $('#exampleInputFile').on('change', function () {
    // 2.2 获取要上传的图片，生成一个图片链接
    // var url = URL.createObjectURL(this.files[0])

    // // 2.3 将图片在页面呈现
    // $('.user_pic').attr('src',url)
    $('.user_pic').attr('src', URL.createObjectURL(this.files[0]))
  })

  // 3.更新个人中心数据
  // 3.1 给修改按钮注册事件
  $('.btn-edit').on('click', function (e) {
    console.log(116)
    // 3.2 阻止默认行为
    e.preventDefault()

    // 3.3 准备formData数据 
    // FormData会将form表单中所有的具有name属性的input select  textarea标签中的值一并获取
    // 然后转换成二进制数据
    var data = new FormData($('#form')[0])
    // 3.4 发送ajaxy请求
    $.ajax({
      type: 'post',
      url: BigNew.user_edit,
      data: data,
      contentType: false, // 不要将上传的数据添加请求头
      processData: false, // 不要对上传的数据进行字符串的拼接
      success: function (res) {
        console.log(res)
        if (res.code == 200) {
          // window.location.reload()
          // window.parent.location.reload() // 让父页面刷新 会让父页面整体刷新，没有必要
          // 如果个人中心里的数据更新完毕之后，要让父页面中的头像和昵称重新渲染成最新的数据
          // 此时只需要重新发送一次请求，获取最新的服务器中的数据即可

          // 1. 获取数据渲染用户名和头像
          // 1.1 发送ajax请求
          $.ajax({
            type: 'get',
            url: BigNew.user_info,
            success: function (res) {
              console.log(res)
              if (res.code == 200) {
                // 1.2 将服务器端响应回来的用户昵称和图像显示到页面对应的位置
                // 将服务器端响应回来的昵称显示出来
                parent.$('.user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)

                // 显示登陆用户的头像
                parent.$('.user_info img').attr('src', res.data.userPic)

                // 个人中心旁边的头像也要替换
                parent.$('.header_bar img').attr('src', res.data.userPic)
              }
            }
          })
        }
      }
    })
  })

})