import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import BemtoButton from '..';

const ExtendedButton = BemtoButton.extend`
  background: lime;

  ${BemtoButton.focusCSS(`
    box-shadow: 0 0 5px 5px pink;
  `)}
`;

const testSnapshot = function(tag, props, children) {
  const tree = renderer.create(
    React.createElement(
      tag,
      props,
      children
    )
  ).toJSON();

  expect(tree).toMatchSnapshot();
}

test('Just a button', () => {
  testSnapshot(
    BemtoButton,
    {},
    'Some text'
  );
});

test('Disabled button', () => {
  testSnapshot(
    BemtoButton,
    { disabled: true },
    'Some text'
  );
});

test('Disabled link', () => {
  testSnapshot(
    BemtoButton,
    { disabled: true, href: '#x' },
    'Some text'
  );
});

test('A button with modifier and both elements', () => {
  testSnapshot(
    BemtoButton,
    {
      href: '#x',
      _mod: true,
      __Before: '←',
      __After: '→',
    },
    'Some text'
  );
});

test('An extended button', () => {
  testSnapshot(
    ExtendedButton,
    {
      type: null
    },
    'Some text'
  );
});
