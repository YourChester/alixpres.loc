window.addEventListener('DOMContentLoaded', () => {
  const cartWrapper = document.querySelector('.cart__wrapper'),
    cart = document.querySelector('.cart'),
    close = document.querySelector('.cart__close'),
    open = document.querySelector('#cart'),
    goodsBtn = document.querySelectorAll('.goods__btn'),
    confirm = document.querySelector('.confirm'),
    products = document.querySelectorAll('.goods__item'),
    badge = document.querySelector('.nav__badge'),
    totalCost = document.querySelector('.cart__total > span'),
    titles = document.querySelectorAll('.goods__title');

  function openCart() {
    cart.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }

  function closeCart() {
    cart.style.display = 'none'
    document.body.style.overflow = ''
  }

  function sliceText() {
    titles.forEach((item) => {
      if(item.textContent.length < 70) {
        return
      }
      else {
        const str = `${item.textContent.slice(0, 71)}...`
        item.textContent = str
      }
    })
  }

  function calcGoods(i) {
    const items = cartWrapper.querySelectorAll('.goods__item')
    badge.textContent = i + items.length
  }

  function showConfirm() {
    confirm.style.display = 'block'
    let counter = 100
    const id = setInterval(frame, 10)
    function frame() {
      if(counter == 10) {
        clearInterval(id)
        confirm.style.display = 'none'
      }
      else {
        counter--
        confirm.style.opacity = '.' + counter
        confirm.style.transform = `translateY(-${counter}px)`
      } 
    }
  }

  function calcTotal() {
    const prises = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span')
    let total = 0
    prises.forEach((item) => {
      total += +item.textContent
    })
    totalCost.textContent = total
  }

  function removeFromCart() {
    const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove'),
      empty = cartWrapper.querySelector('.empty');
    removeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove()
        calcGoods(0)
        calcTotal()
        if(+badge.textContent == 0){
          empty.style.display = 'block'
        }
      })
    })
  }

  sliceText();
  open.addEventListener('click', openCart)
  close.addEventListener('click', closeCart)
  goodsBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      let item = products[i].cloneNode(true),
        trigger = item.querySelector('button'),
        removeBtn = document.createElement('div'),
        empty = cartWrapper.querySelector('.empty');
      trigger.remove()
      showConfirm()
      calcGoods(1)
      removeBtn.classList.add('goods__item-remove')
      removeBtn.innerHTML = '&times'
      item.appendChild(removeBtn)
      cartWrapper.appendChild(item)
      if(empty) {
        empty.style.display = 'none'
      }
      calcTotal()
      removeFromCart()
    })
  })
})

//JS-PF
