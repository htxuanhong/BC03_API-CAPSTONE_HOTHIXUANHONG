const validator = {
  kiemTraRong: function (idTarget, idError, messageError) {
    let value = document.getElementById(idTarget).value.trim();
    console.log(value);

    document.getElementById(idError).innerText = "";

    if (!value) {
      document.getElementById(idError).innerText = messageError;
      return true;
    }

    return false;
  },
  kiemTraTrungTK: function (idTarget, idError, messageError) {
    document.getElementById(idError).innerText = "";

    let valueTarget = document.getElementById(idTarget).value.trim();

    const taiKhoan = danhSachTK.findIndex(
      (x) => x.taiKhoan.toLowerCase() === valueTarget.toLowerCase()
    );

    if (taiKhoan >= 0) {
      document.getElementById(idError).innerText = messageError;

      return true;
    }

    return false;
  },
  kiemTraHoTen: function (idTarget, idError, messageError) {
    let parten = /[A-Za-z]$/;

    let valueInPut = document.getElementById(idTarget).value;

    if (parten.test(valueInPut)) {
      document.getElementById(idError).innerText = "";

      return false;
    }

    document.getElementById(idError).innerText = messageError;

    return true;
  },

  kiemTraMatKhau: function (idTarget, idError, messageError) {
    let parten = /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,8}$/;

    let valueInPut = document.getElementById(idTarget).value;

    if (parten.test(valueInPut)) {
      document.getElementById(idError).innerText = "";

      return false;
    }

    document.getElementById(idError).innerText = messageError;

    return true;
  },

  kiemTraEmail: function (idTarget, idError, messageError) {
    let parten = /^[a-z0-9](.?[a-z0-9]){3,}@g(oogle)?mail.com$/;

    let valueInPut = document.getElementById(idTarget).value;

    if (parten.test(valueInPut)) {
      document.getElementById(idError).innerText = "";

      return false;
    }

    document.getElementById(idError).innerText = messageError;

    return true;
  },
};
