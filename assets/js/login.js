$(function () {
    // 点击"去注册账号"的链接
    $("#link-reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 自定义一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是用户再次确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后再进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })


    //监听注册表单的提交事件 
    var data = {
        username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
    };
    $('#form_reg').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault();
        // 发起post请求
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功,请登录!');
            // 模拟人的点击行为
            $('#link-login').click();
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/api/login",
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登陆失败!');
                layer.msg('登录成功!');
                // 将登陆成功得到的 token 字符串,保存到localStorage中
                localStorage.setItem('token', res.token);
                // console.log(res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        });
    })
})