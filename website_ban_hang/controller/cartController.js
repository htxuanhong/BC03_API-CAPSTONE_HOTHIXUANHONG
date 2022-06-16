function addToCart(index) {
  const cartItemIndex = cartList.findIndex((x) => x.id === index);

  if (cartItemIndex === -1) {
    const item = productList[index];

    cartList.push({
      ...item,
      id: index,
      quantity: 1,
    });
  } else {
    cartList[cartItemIndex].quantity++;
  }

  saveLocalStorage();
  renderCart(cartList);
}

function deleteProduct(index) {
  cartList.splice(index, 1);

  saveLocalStorage();
  renderCart(cartList);
}

function numberUp(index) {
  cartList[index].quantity++;

  saveLocalStorage();
  renderCart(cartList);
}
function numberDown(index) {
  cartList[index].quantity--;

  if (cartList[index].quantity == 0) {
    deleteProduct(index);
  }

  saveLocalStorage();
  renderCart(cartList);
}

function deleteCart() {
  cartList = [];
  saveLocalStorage();

  renderCart(cartList);
}

function displayToOrder() {
  renderOrder(cartList);
}

function payment() {
  cartList = [];
  saveLocalStorage();
  renderCart(cartList);
}
