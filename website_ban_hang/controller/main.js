const BASE_URL = "https://6271e18525fed8fcb5ec0d1c.mockapi.io";

const CARTLIST_LOCALSTOAGE = "CARTLIST_LOCALSTOAGE";
var productList = [];
var cartList = [];

const saveLocalStorage = () => {
  let cartJson = JSON.stringify(cartList);
  localStorage.setItem("CARTLIST_LOCALSTOAGE", cartJson);
};
let cartJson = localStorage.getItem("CARTLIST_LOCALSTOAGE");

if (cartJson) {
  cartList = JSON.parse(cartJson);
  renderCart(cartList);
}
const renderProductList = () => {
  axios({
    url: `${BASE_URL}/Products`,
    method: "GET",
  })
    .then((res) => {
      productList = res.data;
      exportList(res.data);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

renderProductList();

const exportList = (dssp) => {
  let contentHTML = "";
  dssp.forEach((item, index) => {
    let content = `
    <div class=" col-3" >
     <div class="card rounded-rad">
     <div class="img-phone">
     <img src="${item.img}" class="card-img-top   h-75 rounded-rad w-img " alt="">
     </div>
      <div class="card-body h-25 text-left ">
          <h5 class="card-title">${item.name}</h5>
          <p class="price text-danger">${item.price}</p>

         <div class="button-click  "
         >
         <button
         onclick="detail(${index})"
         class="btn btn-warning mr-2 btn-click "
       >
         Xem chi tiết
       </button>
       <button
       onclick="addToCart(${index})"
         class="btn btn-danger btn-click "
       >
         Thêm vào giỏ hàng
       </button>
         </div>
        </div>
      </div>
    </div>
   
        
        `;
    contentHTML += content;
  });
  document.getElementById("card-item").innerHTML = contentHTML;
};

function exportProductSelected(item) {
  let content = `     
      <div class="row">
   
            <div class="col-sm-4 ">
              <h4 class="card-title">${item.name}</h4>
             <div class="detail-img">
             <img src="${item.img}" alt="" class="card-img-top" />
             </div>
            </div>
            <div class="col-sm-8 table text-left ">
              <table>
                <thead>
                  <tr>
                    <th>Thông số kỹ thuật</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Màn hình</td>
                    <td>${item.screen}</td>
                  </tr>
                 
                  <tr>
                    <td>Camera trước</td>
                    <td>${item.frontCamera}</td>
                  </tr>
                  <tr>
                    <td>Camera sau</td>
                    <td>${item.backCamera}</td>
                  </tr>
                  <tr>
                    <td>Loại</td>
                    <td>${item.type}</td>
                  </tr>
                  <tr>
                    <td>Mô tả</td>
                    <td>${item.desc}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    `;

  document.getElementById("detail-product").innerHTML = content;
}

function renderCart(dssp) {
  let content = "";
  let sum = 0;

  dssp.forEach((x, index) => {
    sum += x.price * x.quantity;

    content += `<tr>
    <td >
    <img src="${x.img} " class="w-75 h75"/></td>
    <td>${x.name}</td>
    <td>
    <button class="btn btn-outline-danger" onclick="numberDown(${index})">-</button>
    ${x.quantity}
    <button class="btn btn-outline-danger" onclick="numberUp(${index})">+</button>
    
    </td>
    <td>${x.price}</td>
    <td>${x.price * x.quantity}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteProduct(${index})">Xóa</button>
    </td>
  </tr>
  `;
  });

  const tableElement =
    `<table class="table">
  <thead>
    <tr>
      <th scope="col">Hình ảnh</th>
      <th scope="col">Tên sản phẩm</th>
      <th scope="col">Số lượng</th>
      <th scope="col">Đơn giá</th>
      <th scope="col">Thành tiền</th>
    </tr>
  </thead>
  <tbody>` +
    content +
    `</tbody>
  </table>
  <div class="sumMoney">Tổng thanh toán: <span class="text-danger money"> ${sum}</span></div>
    `;

  document.getElementById("body-modal").innerHTML = content
    ? tableElement
    : "<p class='cartNull'>Hổng có gì trong giỏ hàng hết trơn</p>";
  document.getElementById("group-action-cart").style.display = dssp.length
    ? "flex"
    : "none";
  document.getElementById("number-change").innerText = dssp.length;
}

function renderOrder(dssp) {
  let content = "";
  let sum = 0;
  dssp.forEach((x) => {
    sum += x.price * x.quantity;
    content += `
  <div class="row justify-content-between">
  <div class="col-4">
   ${x.quantity} x ${x.name}
  </div>
  <div class="col-4">
  ${x.price}
  
  
  </div>
</div>



  `;
  });

  content += `
  <hr />
  <div class="row justify-content-between">

<div class="col-4 sumPayment">
   Tổng thanh toán
  </div>
  <div class="col-4 sumNumber">
  ${sum}
 
  </div>
</div>
  `;
  document.getElementById("ProductPayment").innerHTML = content;
}

function search() {
  let value = document.getElementById("txt-select").value;
  let result = productList.filter((x) => x.type == value);

  if (!value) {
    result = productList;
  }

  exportList(result);
}
