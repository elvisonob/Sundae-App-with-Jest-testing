import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);

  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display images for each toppings option from server', async () => {
  //RCSE
  render(<Options optionType="toppings" />);

  const toppingImage = await screen.findAllByRole('img', {
    name: /topping$/i,
  });

  expect(toppingImage).toHaveLength(3);

  const imagesTitles = toppingImage.map((img) => img.alt);

  expect(imagesTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
