import Component from '@ember/component';

export default Component.extend({
    didInsertElement(){
        const stars = document.querySelectorAll('.fa-star');
const ratingValue = document.querySelector('#rating-value');

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    resetStars();
    highlightStars(star.getAttribute('data-rating'));
  });
  
  star.addEventListener('click', () => {
    ratingValue.value = star.getAttribute('data-rating');
  });
  
  star.addEventListener('mouseout', () => {
    resetStars();
    if (ratingValue.value) {
      highlightStars(ratingValue.value);
    }
  });
});

function highlightStars(rating) {
  stars.forEach(star => {
    if (star.getAttribute('data-rating') <= rating) {
      star.classList.add('text-warning');
    }
  });
}

function resetStars() {
  stars.forEach(star => {
    star.classList.remove('text-warning');
  });
}

    }
});
