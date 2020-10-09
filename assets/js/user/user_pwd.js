$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一致!';
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=rePwd]').val()) {
                return '两次输入的密码不一致,请重新输入!'
            }
        }
    });

    // 发起请求 实现重置密码的功能
    $('#layui-form').on('submit', function () {
        $.$.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('重置失败!');
                layer.msg('重置密码成功!');
                $('.layui-form')[0].reset();
            }

        });
    })
})