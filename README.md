# bemto-button [![Build Status][build]][build-link] [![NPM package version][version]][version-link] [![Docs are interactive][docs-shield]][docs-link]

[build]: https://travis-ci.org/bemto/bemto-button.svg?branch=master
[build-link]: https://travis-ci.org/bemto/bemto-button
[version]: https://img.shields.io/npm/v/bemto-button.svg
[version-link]: https://www.npmjs.com/package/bemto-button
[docs-shield]: https://img.shields.io/badge/docs_are-interactive-66C764.svg
[docs-link]: http://kizu.ru/bemto-components/#bemtobutton

This is a foundation for all the buttons I use in my markup for more than 4 years. Now in a form of a React component, using [bemto-components](https://github.com/bemto/bemto-components) and [styled-components](https://www.styled-components.com/).

You can use it as a base for highly functional and stylable buttons which provides basic reset & layout which you could later easily style by extending with styled-components (or use your external styles). This component has all the powers of bemto-components beneath, so you can use modifiers, polymorphic tags and all the other stuff. See the docs of [bemto-components](http://kizu.ru/bemto-components/#elements) for more features and [this component's source code](https://github.com/bemto/bemto-button) to how easily it is done.

[Each example at **documentation** is an interactive playground like this one ↓](http://kizu.ru/bemto-components/#bemtobutton)

[<img align='right' src='https://user-images.githubusercontent.com/177485/33218860-7d677632-d13f-11e7-81ff-457ab2d21837.gif' alt='Demo gif of the button' title='Demo gif of the button' />](http://kizu.ru/bemto-components/#bemtobutton)

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

## License

Licensed under the MIT License, Copyright © 2017 Roman Komarov.

See [LICENSE](./) for more information.
