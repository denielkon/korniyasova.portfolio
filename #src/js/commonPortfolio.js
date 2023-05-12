const header = document.querySelector('.header');
const burger = document.querySelector('.header_burger');
const burgerMenu = document.querySelector('.burger_menu');

window.addEventListener("scroll", function () {
   if (window.pageYOffset < 10) {
      header.classList.remove("scrolled");
   } else {
      header.classList.add("scrolled");
   }
});
if (window.pageYOffset > 10) {
   header.classList.add("scrolled");
}

burger.addEventListener('click', function () {
   burger.classList.toggle('active')
   burgerMenu.classList.toggle('active')
   document.body.classList.toggle('lock')
})