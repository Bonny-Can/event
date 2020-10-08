$(function () {
    // 调用用户信息的函数
    getUserMessage()

    // 用户点击退出 询问是否确定退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清除本地储存的token
            localStorage.removeItem('token');
            // 退出登录后跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

// 封装一个函数 获取用户信息
function getUserMessage() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },  统一写入到baseAPIjs当中
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败!');
            // 调用渲染用户信息的函数
            renderAvatar(res.data);
        }
        // 不论成功还是失败,最终都会调用complete回调函数
        // complete: function (res) {
        //     // 在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON, status === 1 && res.responseJSON.message === '身份认证失败!') {
        //         // 强制清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登录页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}

// 渲染用户信息
function renderAvatar(user) {
    // 获取用户的昵称
    var name = user.nickname || user.username;
    // 渲染用户昵称  设置用户昵称文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染用户头像
    if (user.user_pic !== null) {
        //渲染用户的照片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 为空就渲染用户的文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}