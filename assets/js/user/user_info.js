$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 校验表单数据
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return '昵称长度必须在1~6个字符之间';
        }
    });
    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取信息失败!');
                // 
                // 
                // 重点快速为表单赋值
                // 为表单快速赋值 调用form.val()方法为表单赋值
                form.val('formUserInfo', res.data);
            }
        });
    };

    // 设置表单的重置功能
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    });

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败!');
                layer.msg('更新用户信息成功');
                // 调用父页面中的方法,重新渲染用户的头像和用户的信息
                window.parent.getUserMessage();
                // console.log(window);
            }
        })
    })
})