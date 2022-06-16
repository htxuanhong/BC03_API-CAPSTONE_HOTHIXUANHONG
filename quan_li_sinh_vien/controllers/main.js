const BASE_URL = "https://6271e18525fed8fcb5ec0d1c.mockapi.io";
var danhSachTK = [];

function themMoiButton(hien) {
  document.getElementById("btn-add").style.display = hien ? "block" : "none";
}

function capNhatButton(hien) {
  document.getElementById("btn-capnhat").style.display = hien
    ? "block"
    : "none";
}

const turnOnLoading = () => {
  document.getElementById("loading").style.display = "flex";
};
const turnOffLoading = () => {
  document.getElementById("loading").style.display = "none";
};

const renderDanhSachTaiKhoanServ = function () {
  turnOnLoading();
  axios({
    url: `${BASE_URL}/tai-khoan`,
    method: "GET",
  })
    .then((res) => {
      turnOffLoading();

      danhSachTK = res.data;

      xuatDanhSach(res.data);
      console.log("res", res.data);
    })
    .catch((err) => {
      console.log("err", err);
      turnOffLoading();
    });
};

renderDanhSachTaiKhoanServ();

const xoaTaiKhoanServ = (id) => {
  turnOnLoading();
  axios({
    url: `${BASE_URL}/tai-khoan/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      renderDanhSachTaiKhoanServ();
    })
    .catch((err) => {
      turnOffLoading();
      console.log(err);
    });
};
const xuatDanhSach = (dstk) => {
  let contentHTML = "";

  dstk.forEach(function (item) {
    var contentTr = `
        <tr>
        <td>${item.id}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
      
       
        <td>
        <button 
        class="btn btn-primary"
        onclick="moChinhSuaForm(${item.id})" 
        data-toggle="modal"
        data-target="#myModal">Sửa</button>
        <button class="btn btn-danger" onclick="xoaTaiKhoanServ(${item.id})">Xóa</button>
        </td>
        </tr>`;

    contentHTML += contentTr;
  });

  document.getElementById("tblDanhSachSinhVien").innerHTML = contentHTML;
};

function moThemMoiForm() {
  capNhatButton(false);
  themMoiButton(true);

  resetError();

  document.getElementById("tai-khoan-form").reset();
}

function moChinhSuaForm(id) {
  capNhatButton(true);
  themMoiButton(false);

  resetError();

  layThongtinTaiKhoan(id);
}

resetError = function () {
  document.getElementById("error-TaiKhoan").innerText = "";
  document.getElementById("error-hoTen").innerText = "";
  document.getElementById("error-matKhau").innerText = "";
  document.getElementById("error-email").innerText = "";
  document.getElementById("error-hinhAnh").innerText = "";

  document.getElementById("error-moTa").innerText = "";
};

const layThongTinTuForm = () => {
  let tenTK = document.getElementById("TaiKhoan").value;
  let tenNguoiDung = document.getElementById("HoTen").value;
  let matKhautk = document.getElementById("MatKhau").value;
  let emailtk = document.getElementById("Email").value;
  let hinhAnhNd = document.getElementById("HinhAnh").value;

  let moTaNd = document.getElementById("MoTa").value;

  console.log("cap-nhat", {
    tenTK,
    tenNguoiDung,
    matKhautk,
    emailtk,
    hinhAnhNd,

    moTaNd,
  });

  return new taiKhoanND(
    tenTK,
    tenNguoiDung,
    matKhautk,
    emailtk,

    hinhAnhNd,
    moTaNd
  );
};

const themMoiTK = () => {
  let newTk = layThongTinTuForm();

  const isValidTk = validator.kiemTraRong(
    "TaiKhoan",
    "error-TaiKhoan",
    "Tài khoản không được để trống"
  );

  const isTrungTen =
    !isValidTk &&
    validator.kiemTraTrungTK(
      "TaiKhoan",
      "error-TaiKhoan",
      "Trùng tên, vui lòng nhập tên khác."
    );

  const isValidHoTen = validator.kiemTraRong(
    "HoTen",
    "error-hoTen",
    "Họ Tên không được để trống"
  );

  const isKiTuHoTen =
    !isValidHoTen &&
    validator.kiemTraHoTen(
      "HoTen",
      "error-hoTen",
      "Họ tên không chứa số và các kí tự đặc biệt"
    );

  const isValidMatKhau = validator.kiemTraRong(
    "MatKhau",
    "error-matKhau",
    "Mật khẩu không được để trống"
  );

  const isKiTuMatKhau =
    !isValidMatKhau &&
    validator.kiemTraMatKhau(
      "MatKhau",
      "error-matKhau",
      "Có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, dài 6-8 ký tự"
    );

  const isValidEmail = validator.kiemTraRong(
    "Email",
    "error-email",
    "Email không được để trống"
  );

  const isNotEmail =
    !isValidEmail &&
    validator.kiemTraEmail("Email", "error-email", "Email không hợp lệ");

  const isValidHinhAnh = validator.kiemTraRong(
    "HinhAnh",
    "error-hinhAnh",
    "Hình ảnh không được để trống"
  );

  const isValidMoTa = validator.kiemTraRong(
    "MoTa",
    "error-moTa",
    "Mô tả không được để trống"
  );

  if (
    isValidTk ||
    isTrungTen ||
    isValidHoTen ||
    isKiTuHoTen ||
    isValidMatKhau ||
    isKiTuMatKhau ||
    isValidEmail ||
    isNotEmail ||
    isValidHinhAnh ||
    isValidMoTa
  ) {
    return;
  }

  turnOnLoading();
  axios({
    url: `${BASE_URL}/tai-khoan`,
    method: "POST",

    data: newTk,
  })
    .then((res) => {
      turnOffLoading();
      $("#myModal").modal("hide");
      renderDanhSachTaiKhoanServ();
    })
    .catch((err) => {
      turnOffLoading();
    });
};

// show dữ liệu lên form

const renderThongTinLenForm = function (data) {
  document.getElementById("TaiKhoan").value = data.taiKhoan;
  document.getElementById("HoTen").value = data.hoTen;
  document.getElementById("MatKhau").value = data.matKhau;
  document.getElementById("HinhAnh").value = data.hinhAnh;
  document.getElementById("MoTa").value = data.moTa;

  document.getElementById("Email").value = data.email;
};

const layThongtinTaiKhoan = (id) => {
  axios({
    url: `${BASE_URL}/tai-khoan/${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log("get-item", res.data);
      renderThongTinLenForm(res.data);

      document.getElementById("id-tk").value = res.data.id;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("id", id);
};

const capNhatTk = () => {
  // console.log("yesss");
  let updatedSanPham = layThongTinTuForm();

  let idTk = document.getElementById("id-tk").value * 1;

  axios({
    url: `${BASE_URL}/tai-khoan/${idTk}`,
    method: "PUT",
    data: updatedSanPham,
  })
    .then((res) => {
      $("#myModal").modal("hide");

      renderDanhSachTaiKhoanServ();
    })
    .catch((err) => {
      console.log(err);
    });

  //
};

function search() {
  let valueName = document.getElementById("txt_search").value;

  const ketQuaSearch = danhSachTK.filter(
    (x) => x.taiKhoan.includes(valueName) || x.hoTen.includes(valueName)
  );

  xuatDanhSach(ketQuaSearch);
}
