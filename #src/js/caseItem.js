const $host = axios.create({
   baseURL: 'http://localhost:7000/api/'
})

const caseSLiderPhotosWrapper = document.querySelector('.case-item__slider');
const buttonElNext = document.querySelector('.swiper-button-next');
const buttonElPrev = document.querySelector('.swiper-button-prev');

document.addEventListener('readystatechange', (e) => {
   if (e.target.readyState === 'interactive') {
      getCase(+location.href.split('id:')[1])   
    } else if (e.target.readyState === 'complete') {
      if (window.innerWidth > 767) {
         buttonElPrev.addEventListener('click', () => {
            caseSLiderPhotosWrapper.swiper.slidePrev();
          });
          buttonElNext.addEventListener('click', () => {
            caseSLiderPhotosWrapper.swiper.slideNext();
          });
      }
      
	}
})

async function getCase(id) {
   const { data } = await $host.post('getCase', { id });
   const allCases = await $host.get('getCases');
   const caseMobilePhotosWrapper = document.querySelector('.mobile-photo__wrapper');
   const loader = document.querySelector('.portfolio__loader');
   if (data) {
      loader.remove()
      document.querySelector('.case-item').classList.remove('loading')
      const index = allCases.data.findIndex(item => item.id === id);
      const nextID = allCases.data[index + 1] ? allCases.data[index + 1].id : '';
      const previousID = allCases.data[index - 1] ? allCases.data[index - 1].id : '';
      const caseLinks = document.querySelectorAll('.cases-nav__link');
  
      caseLinks[0].innerHTML = nextID
         ? `<a href="http://localhost:3000/portfolioitem.html?id:${nextID}" >&#8249; предыдущий кейс</a>`
         : `<p class='link__inactive'>&#8249; предыдущий кейс</p>`;
      if (window.innerWidth > 767){
         caseLinks[1].innerHTML = previousID
            ? `<a href="http://localhost:3000/portfolioitem.html?id:${previousID}" class="cases-nav__link">следующий кейс &#8250;</a>`
            : `<p class='link__inactive'>следующий кейс &#8250;</p>`;
      } else {
         caseLinks[2].innerHTML = previousID
            ? `<a href="http://localhost:3000/portfolioitem.html?id:${previousID}" class="cases-nav__link">следующий кейс &#8250;</a>`
            : `<p class='link__inactive'>следующий кейс &#8250;</p>`;
      }
      if (window.innerWidth > 767) {
         if (data.photos.length > 1) {
            caseSLiderPhotosWrapper.innerHTML = data.photos.map(item =>
               `<swiper-slide>
                  <div class='case-item__slider-item'> 
                     <img src="http://localhost:7000/${item}" class="case-item__photo" alt="">
                  </div>
               </swiper-slide>`).join('');
         } else {
            caseMobilePhotosWrapper.innerHTML = `<div class='case-item__mobile-item'> 
               <img src="http://localhost:7000/${data.photos[0]}" class="case-item__photo" alt="">
            </div>`;
            caseSLiderPhotosWrapper.style.display = 'none'
            buttonElNext.style.display = 'none'
            buttonElPrev.style.display = 'none'
         }
      } else {
         caseMobilePhotosWrapper.innerHTML = data.photos.map(item =>
            `<div class='case-item__mobile-item'> 
               <img src="http://localhost:7000/${item}" class="case-item__photo" alt="">
            </div>`).join('');
      }
      document.querySelector('.case-item__operation-name').innerText = data.type;
      document.querySelector('.case-item__description').innerText = data.description;
   } else {
      loader.innerHTML = '<p class="not-found-case">Упс, такого кейса не существует</p>';
   }
}



