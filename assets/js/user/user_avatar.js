$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 给上传按钮绑定点击事件,当点击上传按钮的时候,打开input框上传图片
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });

    // 为文件选择框绑定改变事件
    $('#file').on('change', function (e) {
        var filelist = e.target.files;
        if (filelist.length === 0) {
            // 如果为0 说明用户没有上传图片
            return layer.msg('请上传图片!');
        }
        // 不为0 说明用户上传了文件
        // 拿到用户选择的文件图片
        var file = e.target.files[0];
        // 根据选择的文件,创建一个对应的URL地址
        var newImgURL = URL.createObjectURL(file);
        // 先销毁旧的裁剪区域,再重新设置图片路径,之后再创建新的裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });

    // 获取裁剪后的文件上传到服务器
    $('#btnUpload').on('click', function () {
        //  获取裁剪后的文件
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 把获取到的文件上传到服务器
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg('头像更换失败!');
                layer.msg('更换头像成功!');
                window.parent.getUserMessage();
            }
        });
    })
})