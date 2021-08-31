/**
 * @jest-environment jsdom
 */

import { addColorCardImg } from '../src/js/app';
import { validateCard } from '../src/js/helpers';

it('test mir', () => {
  const input = document.createElement('input');
  input.value = '222';

  const mir = document.createElement('img');
  mir.classList.add('card-input', 'colorless');

  addColorCardImg(input, mir, 2);
  expect(mir.classList.contains('colorless')).toBe(false);
});

it('test card code', () => {
  expect(validateCard([4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toBe(
    true
  );
});
