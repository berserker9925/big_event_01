$(function () {
  // 点击去注册账号，隐藏登录区域，显示注册区域
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击去登录，显示登录，隐藏注册
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 需求2：自定义layui校验规则
  let form = layui.form;
  // console.log(form);
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //value：表单的值
    repwd: function (value) {
      // console.log($(".reg-box input[name=fpassword]").val());
      if (value != $("#form_reg input[name=password]").val()) {
        return "两个密码不一致，请重新输入！";
      }
    },
  });

  // 需求3：注册功能简单实现
  $("#form_reg").on("submit", function (e) {
    // 阻止页面刷新
    e.preventDefault();
    // 发送ajax
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $("#form_reg input[name=username]").val(),
        password: $("#form_reg input[name=password]").val(),
      },
      success: (res) => {
        console.log(res);
        if (res.status != 0) {
          return layer.msg(res.message, { icon: 5 });
        }
        // alert(res.message)
        layer.msg(res.message, { icon: 6 });
        $("#link_login").click();
        $("#form_reg")[0].reset();
      },
    });
  });

  // 需求4：用户登录
  $("#form_login").on("submit", function (e) {
    // 阻止页面刷新
    e.preventDefault();
    // 发送ajax
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      // {
      // // username:$('#form_login input[name=username]').val(),
      // // password:$('#form_login input[name=password]').val()
      // }
      success: (res) => {
        // console.log(res)
        if (res.status != 0) {
          return layer.msg(res.message, { icon: 5 });
        }
        // 操作成功后，跳转到index.html页面
        location.href = "index.html";
        // 保存token到存储中
        // localStorage.setItem('toKen',res.token)
        console.log(res.token);
      },
    });
  });
});
