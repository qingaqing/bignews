// 思路:
// 1. 一跳转到这个页面就要发送ajax请求
// 2. 将请求回来的当前登陆用户的信息显示在用户页面上
$(function () {
  // 发送ajax的请求
  $.ajax({
    type: 'get',
    url: BigNew.user_detail,
    succes: function (res) {
      // 渲染页面 
      if (res.code == 200) {
        // 简单的做法
        for (var key in res.data) {
          $(`#form .${key}`).val(res.data[key])
        }
        $(`#form .user_pic`).attr('src', res.data.userPic)
      }
    }
  })
  // 图片预览功能
  $('#exampleInputFile').on('change', function () {
    // 将图片呈现在页面
    $('.user_pic').attr('src', URL.createObjectURL(this.files[0]))
  })
  // 更新个人中心数据
  // 给修改按钮注册事件
  $('.btn-edit').on('click', function (e) {
    console.log(115);
    // 阻止默认行为
    e.preventDefault()
    var data = new FormData($('#form')[0])
    // 发送ajax的请求
    $.ajax({
      type: 'post',
      url: BigNew.user_edit,
      data: data,
      //不要将上传的数据添加请求头
      contentType: false,
      //不要对上传的数据进行字符串的拼接
      processData: false,
      succes: function (res) {
        console.log(res);
        if (res.code == 200) {
          $.ajax({
            type: 'get',
            url: BigNew.user_info,
            succes: function (res) {
              console.log(res);
              if (res.code == 200) {
                //将服务器端响应回来的用户昵称和图像显示到页面对应的位置
                //将服务器端响应回来的昵称显示出来
                parent.$('.user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
                //显示登陆用户的头像
                parent.$('.user_info img').attr('src', res.data.userPic)
                //个人中心旁边的头像也要替换
                parent.$('.header_bar img').attr('src', res.data.userPic)
              }
            }
          })
        }

      }
    })

  })






















})