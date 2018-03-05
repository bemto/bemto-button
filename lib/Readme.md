This is a foundation for all the buttons I use in my markup for more than 4 years. Now in a form of a React component, using [bemto-components](https://github.com/bemto/bemto-components) and [styled-components](https://www.styled-components.com/).

[![Build Status][build]][build-link] [![NPM package version][version]][version-link]

[build]: https://travis-ci.org/bemto/bemto-button.svg?branch=master
[build-link]: https://travis-ci.org/bemto/bemto-button
[version]: https://img.shields.io/npm/v/bemto-button.svg
[version-link]: https://www.npmjs.com/package/bemto-button

This is the base for highly functional and stylable buttons which provides basic reset & layout which you could later easily style by extending with styled-components. This component has all the powers of bemto-components beneath, so you can use modifiers, polymorphic tags and all the other stuff. See the docs of [bemto-components](http://kizu.ru/bemto-components/#elements) for more features and [this component's source code](https://github.com/bemto/bemto-button) to how easily it is done.

### Installation & Usage

Note: `bemto-button` uses [styled-components](https://www.styled-components.com/) as a peer dependency, as its bad to include more than one instance of styled-components in your app, so you need to have it installed as well.

In your console:

``` sh
npm install --save bemto-button
```

Then in `.js`-files of your components:

``` js static
import BemtoButton from 'bemto-button';
```

If you won't do anything else, you'd get just the foundation for complex buttons without any visual styles:

    // Don't use it like that though.

    <BemtoButton>Hello, world!</BemtoButton>

But that foundation can be really easily styled by [extending](https://www.styled-components.com/docs/api#extend):

    // That's now the proper usage:
    const Button = BemtoButton.extend`
      border-radius: 9em;
      background: linear-gradient(#FFF, #EEE);
      box-shadow: 0 1px 3px -3px rgba(0,0,0,0.5),
                  0 0 0 1px rgba(0,0,0,0.3);

      /* Apply layout-changing styles here */
      &__Content {
        padding: 5px 10px;
      }

      /* All the simple states */
      &:hover { box-shadow: 0 0 0 2px rgba(0,0,0,0.4); }
      &:active { background: linear-gradient(#CCC, #FFF); }
      &_disabled { opacity: 0.5; }

      /* Keyboard-only, won't show on click! */
      ${BemtoButton.focusCSS(`
        margin: -1px;
        box-shadow: 0 0 5px 5px pink;
      `)}
    `;

    <Button>Oh, shiny!</Button>

### Styling guide

When used with styled-components, you **must** extend the styles. Don't use the component without extending and don't wrap with `styled()` as this would produce unneeded classNames and would be overall worse than `.extend`.

1. Try not to use any styles that alter layout (`padding`, `border` etc.) on the top element of the button, try to use them on `&__Content` and below. That is because if you'd want to use keyboard-only focus styles, you'd need the `&__Content` to always cover all of the `&`'s area.

2. While there is a `&__Text`, try to set up the font's settings like size or line-height on the `&` or `&__Content` or duplicate the text styles from `&__Text` to `&__BLHelper`, as otherwise there could be problems with baselines.

3. Try not to change `overflow` on elements other than those inside `&__Content`, as otherwise the baseline could go wrong and it would be harder to style using shadows etc.

4. Other than those it should be very easy to style the button: you have several wrappers, each has all the pseudo-elements available, so feel free to use them.

### Inner Structure and Elements

The following Elements are available for styling and adding additional props (see the [section about Elements](http://kizu.ru/bemto-components/#elements) for everything about how to use elements):

- The top level, where the default props from your `<Button>` would go.
- `__Content` — the first wrapper inside the top level.
- `__Before` and `__After` — optional extra elements for stuff like icons, would be visible even when there is a lot of text inside button.
- `__Text` — the inner wrapper, has `overflow: hidden` and `text-overflow: ellipsis` by default.
- `__Focus` — element used for keyboard-only proper focus styles, try not to style it manually and always use the `focusCSS` helper (see later in docs on its usage).

### Polymorphic tag

By default the button would be a button with `type='button'`. You can change this by calling it with `type='submit'` for submit, by passing `href` (it would become a `<a>`) or passing `false` to `type` to make it a span.

    const Button = BemtoButton.extend`
      &__Content {
        border: 1px solid;
        padding: 5px;
      }
    `;

    <div>
      <p><Button>Default Button</Button></p>
      <p><Button href="#x">Link Button</Button></p>
      <p><Button type={false}>Span Button</Button></p>
    </div>

Note that the button would be focusable in each case: whenever it becomes something other than button it would get a `tabindex='0'`.

### Examples in different context

The button is kinda bulletproof: its text would be trimmed by ellipsis if there'd be too much content, its width can become properly `100%` of its container, you can set its width to any number without breaking it, and it would even keep the baseline in most of the cases (see [this article](http://kizu.ru/en/blog/flex-baseline/) on how this is done).

    const Button = BemtoButton.extend`
      &__Content {
        border: 1px solid;
        padding: 5px;
      }
    `;

    <div>
      <p style={{ width: '300px' }}><Button>Button that have too much content inside of it that it creates an overflow</Button></p>

      <p><Button style={{ width: '200px' }}>200px width</Button></p>

      <p><Button style={{ width: '100%' }}>100% width</Button></p>

      <p>Test of baseline: <Button>Baselined button</Button>, that's it.</p>
    </div>

### Disabled styles

This button supports `disabled` prop even when you're not using a `<button>`. But by default the only style that is applied is `pointer-events: none`, and if you'd need something else, you'd need to use `_disabled` modifier:

    const Button = BemtoButton.extend`
      &__Content {
        border: 1px solid;
        padding: 5px;
      }

      &_disabled {
        opacity: 0.5;
      }
    `;

    <div>
      <p><Button disabled>Disabled Button</Button></p>
      <p><Button disabled href="#x">Disabled Link Button</Button></p>
    </div>

Those buttons won't be clickable and won't get keyboard focus.

### Focus styles

For adding focus styles you can use a `BemtoButton.focusCSS(css)` helper, which would:

1. Remove the default focus styles.
2. Add the passed styles to the `&__Content` element only when our button would get keyboard focus (see [this article](http://kizu.ru/en/blog/keyboard-only-focus/) on how this is done).

 
    const Button = BemtoButton.extend`
      &__Content {
        border: 1px solid;
        padding: 5px;
      }

      ${BemtoButton.focusCSS(`
        box-shadow: 0 0 5px 5px pink;
      `)}
    `;

    <Button>Focus me from keyboard!</Button>

Note that you could always also add a non-keyboard specific focus styles if you'd want by styling `*:focus + &__Focus` (and those styles _won't_ be applied on keyboard focus, so you could choose more precisely how to style those different states), however that won't work on `<button>` in Firefox due to [this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1375877), as it prevents buttons to have CSS states inside of them.

    const Button = BemtoButton.extend`
      &__Content {
        border: 1px solid;
        padding: 5px;
      }

      *:focus + &__Focus {
        visibility: inherit;
        box-shadow: 0 0 0 3px pink;
      }

      ${BemtoButton.focusCSS(`
        box-shadow: 0 0 5px 5px pink;
      `)}
    `;

    <Button>Click me!</Button>

Note that if you're not using the `.focusCSS` helper, you'd need to manually display the `&__Focus` element on focus.

I've found that styling the focus this way (with an extra element) is the most convenient: you get most control over which styles you'd want to apply, so you won't have, for example, conflict between shadow on the button itself and the focus style's shadow.

### Before and After elements

Sometimes you'd need to add some HTML before or after your button's text. But you'd want to add it in a way it won't break your button's baseline and you'd want those elements to be visible when there is too many content inside the button.

For this, you can use `__Before` and `__After` elements:

    const Button = BemtoButton.extend`
      &__Content {
        border: 1px solid;
        padding: 5px;
      }

      &__Before, &__After {
        padding: 5px;
      }

      &__Before {
        margin: -5px 5px -5px -5px;
        background: pink;
      }

      &__After {
        margin: -5px -5px -5px 5px;
        background: rebeccapurple;
      }
    `;

    <div>
      <p><Button __Before='🙀' __After='🙀'>Both of them</Button></p>

      <p>Test with <Button __Before='🙀'>just a before</Button> on a baseline.</p>

      <p style={{ width: '300px' }}>
        <Button __After='🙀'>Just after, as well as too much content inside of the button that it creates an overflow</Button>
      </p>
    </div>
