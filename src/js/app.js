/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
import { validateCard } from './helpers';

export const addColorCardImg = (input, card, num) => {
  if (input.value[0] === `${num}`) {
    card.classList.remove('colorless');
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const creditCardsContainer = document.querySelector('.credit-cards');
  const form = document.querySelector('.credit-cards__form');
  const input = document.querySelector('.card-input');
  const btn = document.querySelector('.btn');
  const cardsRow = document.querySelector('.credit-cards__img-row');
  const visa = document.querySelector('.visa');
  const masterCard = document.querySelector('.master-card');
  const mir = document.querySelector('.mir');
  const dinersClub = document.querySelector('.diners-club');
  const jcb = document.querySelector('.jcb-international');
  const americanExpress = document.querySelector('.american-express');

  function validate() {
    const cardCode = this.value.replace(/[^\d]/g, '');
    this.value = cardCode !== '' ? cardCode.match(/.{1,4}/g).join(' ') : '';

    const isValidCard = validateCard(
      this.value
        .split('')
        .filter((el) => el !== ' ')
        .map((el) => +el)
    );

    if (isValidCard || this.value.length < 21) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', '');
    }

    [...cardsRow.children].forEach((card) => card.classList.add('colorless'));

    const cardsArray = [visa, masterCard, mir];
    const cardCodeFirstNums = [4, 5, 2];
    for (
      let k = 0, v = 0;
      k < cardsArray.length || v < cardCodeFirstNums.length;
      k++, v++
    ) {
      addColorCardImg(input, cardsArray[k], cardCodeFirstNums[v]);
    }

    const inputValueSlices = this.value.slice(0, 2);

    if (
      inputValueSlices === '30' ||
      inputValueSlices === '36' ||
      inputValueSlices === '38'
    ) {
      dinersClub.classList.remove('colorless');
    }

    if (inputValueSlices === '31' || inputValueSlices === '35') {
      jcb.classList.remove('colorless');
    }

    if (inputValueSlices === '34' || inputValueSlices === '37') {
      americanExpress.classList.remove('colorless');
    }
  }

  const checkValidCardCode = (e) => {
    e.preventDefault();
    if (creditCardsContainer.children.length > 1) {
      creditCardsContainer.lastElementChild.remove();
    }

    const isValidCardCode = [...cardsRow.children].some(
      (card) => !card.classList.contains('colorless')
    );

    const successMsg = document.createElement('div');
    successMsg.className = 'msg';

    if (isValidCardCode && input.value.length > 15) {
      successMsg.style.backgroundColor = 'teal';
      successMsg.innerText = '??????????????! ???????????? ?????????????? ??????????';
      input.classList.toggle('valid');
    } else {
      successMsg.style.backgroundColor = 'crimson';
      successMsg.innerText = '????????????, ?????????????????? ?????????????????? ????????????';
      input.classList.toggle('invalid');
    }

    input.value = '';
    creditCardsContainer.appendChild(successMsg);
    btn.setAttribute('disabled', '');
  };

  input.addEventListener('input', validate);
  form.addEventListener('submit', checkValidCardCode);
});
