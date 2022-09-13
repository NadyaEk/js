'use strict';

  const cartBlock = document.querySelector('.cart__block');
  document.querySelector('.header__link_cart')
  .addEventListener('click', () => {cartBlock.classList.toggle("hidden");});

  const cartCounter = document.querySelector(".cart__counter");
  const cartTotalPrice = document.querySelector(".cart__block_price");
  const cartBlockTotal = document.querySelector(".cart__block_total");

  let cart = {};
  document.querySelector('.product').addEventListener('click', event => {
    if (!event.target.offsetParent.classList.contains("product__button")) {
    return;
  }
    const productItem = event.target.closest('.product__item');
    const id = +productItem.dataset.id;
    const name = productItem.dataset.name;
    const price = +productItem.dataset.price;
    addToCart(id, name, price);
  })

  function addToCart(id, name, price) {
    if (!(id in cart)) {
      cart[id] = {id,name,price,count: 0}
    }
    cart[id].count++;
    cartCounter.innerText = getTotalCount().toString();
    cartTotalPrice.innerText = getTotalPrice().toFixed(2);
    renderProductInCart(id);
  };

  function getTotalCount() {
    return Object.values(cart).reduce((sum, product) => sum + product.count, 0)
  };

  function getTotalPrice() {
    return Object.values(cart).reduce((price, product) =>
                price + (product.price * product.count), 0)
  };

  function renderProductInCart(id) {
    const cartRowEl = cartBlock
    .querySelector(`.cartRow[data-productId = "${id}"]`);
    if (!cartRowEl) {
      renderNewProductInCart(id);
      return;
    }
    cartRowEl.querySelector('.cartCount').textContent = cart[id].count;
    cartRowEl.querySelector('.cartTotalPrice')
    .textContent = (cart[id].count * cart[id].price).toFixed(2);
  };

  function renderNewProductInCart(productId) {
    const productRow = `
      <div class="cartRow" data-productId="${productId}">
      <div class="cart__block_info">${cart[productId].name}</div>
      <div class="cart__block_info cartCount">${cart[productId].count}</div>
      <div class="cart__block_info">${cart[productId].price}</div>
      <div class="cart__block_info cartTotalPrice">${(cart[productId]
        .count*cart[productId].price).toFixed(2)}</div>
      </div>
      `
    cartBlockTotal.insertAdjacentHTML("beforebegin", productRow);
  };