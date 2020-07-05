$(function () {
  // 1. 跳转到当前页面就立即要发送请求
  // 2. 获取服务器响应回来的数据替换到页面对应的位置
  // 3. 用户名 头像  
  // 发送ajax的请求
  $.ajax({
    type: 'get',
    url: BigNew.user_info,
    success: function (res) {
      console.log(res);
      if (res.code == 200) {
        // 将服务器端响应回来的昵称显示出来
        $('.user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
        // 显示登录用户的头像
        $('.user_info img').attr('src', res.data.userPic)
        // 个人中心的头像也要替换
        $('.header_bar img').attr('src', res.data.userPic)
      }
    }
  })
  // 2.1 给退出按钮注册事件
  $('.header_bar .logout').on('click', function () {
    // 2.2 删除本地的token
    window.localStorage.removeItem('token')
    // 2.3 跳转到登陆页面
    window.location.href = './login.html'
  })
  // 3. 让左侧名称高亮显示 本质就是给当前被单击的标签添加类
  // 3.1 给menu下面的所有的level01div注册事件
  $('.menu .level01').on('click', function () {
    // 3.2 被单击的div要添加类acitve 其余的删除类active
    $(this).addClass('active').siblings('div').removeClass('active')
    // 3.3 当单击文章管理标签的时候，要让ul展开或合并
    if ($(this).index() == 1) {
      // 3.4 让ul有一个展开闭合的切换
      $('.menu .level02').slideToggle()
      // 3.5 让右侧的小按钮有一个旋转
      $(this).find('b').toggleClass('rotate0')
    }
  })
  // 4. 设置文章管理中的子按钮高亮显示
  // 4.1 给每一个li标签分别注册事件
  $('.menu .level02 li').on('click', function () {
    // 4.2 当前被单击的要高亮显示(添加类active)，其它的移除类
    $(this).addClass('active').siblings().removeClass('active')
  })
})