const bemto = require('bemto-components');
const styled = require('styled-components').default;
const css = require('styled-components').css;
const PropTypes = require('prop-types');

const BemtoButtonOptions = {
  tag: 'span',
  props: {
    // If we don't have `href`, make it a `<button>`
    type: props => !props.href && 'button',
    // Attach `tabIndex` for anything that is not a button
    tabIndex: props => (props.disabled || props._disabled) && '-1' || (props.href || !props.type) && '0',
    // Attach `role` for anything that is not a link or a button
    role: props => !props.disabled && !props._disabled && !props.href && !props.type && 'button'
  },
  modifiers: {
    _disabled: props => !!props.disabled
  },
  content: [
    {
      elem: 'Content',
      props: {
        tabIndex: '-1'
      },
      content: [
        {
          elem: 'BLHelper',
          optional: props => !props.__Before
        },
        {
          elem: 'Before',
          optional: true
        },
        {
          elem: 'After',
          optional: true
        },
        {
          elem: 'Text',
          children: true
        }
      ]
    },
    {
      elem: 'Focus'
    }
  ]
};

const FocusCSS = function(styles) {
  return css`
    &:focus,
    &__Content:focus {
      outline: none;
    }

    *:focus > &__Focus {
      visibility: inherit;
      ${styles}
    }

    *:not(:-moz-focusring):focus > &__Focus {
      visibility: hidden;
    }
  `;
};

const BemtoButtonTag = bemto(BemtoButtonOptions);

/*
  [1] For proper fallback from flex to floats.
  [2] For old Opera.
  [3] Fixing IE shrinking bug.
  [4] Allows to set border-radius on top level.
*/
const BemtoButton = styled(BemtoButtonTag)`
  -moz-appearance: none;

  position: relative;
  z-index: 1;

  flex-shrink: 0;

  display: inline-block;
  vertical-align: baseline;

  box-sizing: border-box;
  max-width: 100%;
  padding: 0;
  border: none;
  margin: 0;

  white-space: nowrap;
  text-align: center; /* TODO: Apply only when there is a set width in style? */
  justify-content: center;

  font: inherit;
  text-decoration: none;

  color: inherit;
  background: transparent;

  cursor: pointer;
  user-select: none;

  &_disabled {
    pointer-events: none;
  }

  &::-moz-focus-inner {
    padding: 0;
    border: none;
  }

  &__Content {
    position: relative;

    display: block;
    display: inline-flex;

    box-sizing: border-box;
    width: 100%;
  }

  &__Focus {
    visibility: hidden;

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: inherit; /* [4] */
  }

  /* We need this, so extra elements would not break our baseline */
  /* TODO: insert it only when there is __Before/__After? */
  &__BLHelper {
    float: left; /* [1] */
    width: 0;
    min-width: 0; /* [2] */

    &:before {
      content: "\\a0"; /* nbsp */
    }
  }

  &__Text {
    display: block;

    flex-shrink: 1;
    flex-basis: 100%; /* Not width, as [1] */

    overflow: hidden;
    text-overflow: ellipsis;

    min-width: 0; /* [2] */

    /* [3] */
    *:root &,
    &:-ms-input-placeholder {
      flex-basis: auto;
      width: 100%;
    }
  }

  &__Before {
    align-self: center;
    flex-shrink: 0;
    float: left;
  }

  &__After {
    order: 1;
    align-self: center;
    flex-shrink: 0;
    float: right;
  }
`;

// It gets most of the propTypes from the bemto(),
// but we need to ensure some stuff there anyway.
BemtoButton.propTypes = {
  /** Pass this if you'd want for button to become a link. */
  href: PropTypes.string,

  /** Type for the `<button>` (won't be used if `href` given), could be removed by passing `false` or `null`. */
  type: PropTypes.oneOf(['button', 'submit', 'reset', false, null]),

  /** Disables the button by ading `_disabled` modifier, works even for `<a>` and `<span>`. */
  disabled: PropTypes.bool,

  /** Slot for the `&__Before` element, look at [Element section](#elements) to see how to use it. */
  __Before: bemto.DefaultPropTypes.elem,

  /** Slot for the `&__After` element, look at [Element section](#elements) to see how to use it. */
  __After: bemto.DefaultPropTypes.elem,

  /** This element is used for ensuring the proper baseline alignment, you can remove it not needed by passing `false` there. */
  __BLHelper: PropTypes.bool
};

// TODO: Use it only when bemto-components would remove unneeded `type` for links.
// BemtoButton.defaultProps = {
//   type: 'button'
// };

BemtoButton.focusCSS = FocusCSS;

/** @component */
export default BemtoButton;
