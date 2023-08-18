import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal

  // I update the scoops to 2
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');

  // Here i check the subtotal
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // make sure total starts out at $0.00
  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    //RCSE
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:\$/ });
    expect(grandTotal).toHaveTextContent('0.00');
  });
  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:\$/ });

    // update vanilla scoops to 2 and check grand total
  });
  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    const toppingsAdded = await screen.findByRole('toppings');
    await user.click(toppingsAdded);
    expect(grandTotal).toHaveTextContent('3.50');
  });
  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    // select an item
    const items = screen.getByText('scoppings and toppings');

    //remove an item and update grand total
    await user.click(items);

    expect(grandTotal).not.toHaveTextContent(items);
  });
});
