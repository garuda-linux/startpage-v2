import * as flavors from '@catppuccin/palette';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Nora from '@primeng/themes/nora';
import Material from '@primeng/themes/material';
import Lara from '@primeng/themes/lara';

const { latte, mocha, frappe, macchiato } = flavors.flavors;

const tokens = {
  semantic: {
    focusRing: {
      color: '{primary.color}',
    },
    primary: {
      50: '#fcfbff',
      100: '#f3eafd',
      200: '#e9d9fc',
      300: '#dfc8fa',
      400: '#d5b7f9',
      500: '#cba6f7',
      600: '#ad8dd2',
      700: '#8e74ad',
      800: '#705b88',
      900: '#514263',
      950: '#332a3e',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f4f4f5',
          100: '#c9c9cd',
          200: '#9e9ea5',
          300: '#74747d',
          400: '#494956',
          500: '#1e1e2e',
          600: '#1a1a27',
          700: '#151520',
          800: '#111119',
          900: '#0c0c12',
          950: '#08080c',
        },
        primary: {
          color: latte.colors.mauve.hex,
          contrastColor: latte.colors.surface0.hex,
          hoverColor: latte.colors.maroon.hex,
          activeColor: latte.colors.flamingo.hex,
        },
        highlight: {
          background: '{content.background}',
          focusBackground: '{content.background}',
          color: latte.colors.red.hex + '88',
          focusColor: latte.colors.maroon.hex,
        },
        mask: {
          background: latte.colors.surface0.hex + '99',
          color: '{surface.200}',
        },
        formField: {
          background: latte.colors.crust.hex + '88',
          disabledBackground: '{surface.700}',
          filledBackground: '{surface.800}',
          filledHoverBackground: '{surface.800}',
          filledFocusBackground: '{surface.800}',
          borderColor: '{surface.600}',
          hoverBorderColor: '{surface.500}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: latte.colors.peach.hex,
          color: latte.colors.text.hex,
          disabledColor: '{surface.400}',
          placeholderColor: '{surface.400}',
          invalidPlaceholderColor: latte.colors.maroon.hex,
          floatLabelColor: '{surface.400}',
          floatLabelFocusColor: '{primary.color}',
          floatLabelActiveColor: '{surface.400}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.400}',
        },
        text: {
          color: latte.colors.text.hex,
          hoverColor: latte.colors.maroon.hex,
          mutedColor: latte.colors.surface1.hex,
          hoverMutedColor: latte.colors.surface0.hex,
        },
        content: {
          background: latte.colors.mantle.hex + '88',
          hoverBackground: '{surface.800}',
          borderColor: '{surface.700}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.800}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
            },
          },
          optionGroup: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.800}',
            activeBackground: '{surface.800}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
              activeColor: '{surface.400}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
          submenuIcon: {
            color: '{surface.500}',
            focusColor: '{surface.400}',
            activeColor: '{surface.400}',
          },
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f4f4f5',
          100: '#c9c9cd',
          200: '#9e9ea5',
          300: '#74747d',
          400: '#494956',
          500: '#1e1e2e',
          600: '#1a1a27',
          700: '#151520',
          800: '#111119',
          900: '#0c0c12',
          950: '#08080c',
        },
        primary: {
          color: mocha.colors.mauve.hex,
          contrastColor: mocha.colors.surface0.hex,
          hoverColor: mocha.colors.maroon.hex,
          activeColor: mocha.colors.flamingo.hex,
        },
        highlight: {
          background: '{content.background}',
          focusBackground: '{content.background}',
          color: mocha.colors.red.hex + '88',
          focusColor: mocha.colors.maroon.hex,
        },
        mask: {
          background: mocha.colors.surface0.hex + '99',
          color: '{surface.200}',
        },
        formField: {
          background: mocha.colors.crust.hex + '88',
          disabledBackground: '{surface.700}',
          filledBackground: '{surface.800}',
          filledHoverBackground: '{surface.800}',
          filledFocusBackground: '{surface.800}',
          borderColor: '{surface.600}',
          hoverBorderColor: '{surface.500}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: mocha.colors.peach.hex,
          color: mocha.colors.text.hex,
          disabledColor: '{surface.400}',
          placeholderColor: '{surface.400}',
          invalidPlaceholderColor: mocha.colors.maroon.hex,
          floatLabelColor: '{surface.400}',
          floatLabelFocusColor: '{primary.color}',
          floatLabelActiveColor: '{surface.400}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.400}',
        },
        text: {
          color: mocha.colors.text.hex,
          hoverColor: mocha.colors.maroon.hex,
          mutedColor: mocha.colors.surface1.hex,
          hoverMutedColor: mocha.colors.surface0.hex,
        },
        content: {
          background: mocha.colors.mantle.hex + '99',
          hoverBackground: '{surface.800}',
          borderColor: '{surface.700}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.800}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
            },
          },
          optionGroup: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.800}',
            activeBackground: '{surface.800}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
              activeColor: '{surface.400}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
          submenuIcon: {
            color: '{surface.500}',
            focusColor: '{surface.400}',
            activeColor: '{surface.400}',
          },
        },
      },
    },
  },
  components: {
    card: {
      colorScheme: {
        light: {
          background: latte.colors.mantle.hex + '88',
        },
        dark: {
          background: mocha.colors.mantle.hex + '88',
        },
      },
    },
    checkbox: {
      colorScheme: {
        light: {
          background: latte.colors.crust.hex,
          disabled: {
            background: latte.colors.mantle.hex,
          },
        },
        dark: {
          background: mocha.colors.crust.hex,
          disabled: {
            background: mocha.colors.mantle.hex,
          },
        },
      },
    },
    drawer: {
      colorScheme: {
        light: {
          background: latte.colors.mantle.hex,
        },
        dark: {
          background: mocha.colors.mantle.hex,
        },
      },
    },
    inputtext: {
      colorScheme: {
        light: {
          color: latte.colors.text.hex,
          background: latte.colors.crust.hex + '88',
          border: {
            color: latte.colors.surface0.hex,
          },
        },
        dark: {
          color: mocha.colors.text.hex,
          background: mocha.colors.crust.hex + '88',
          border: {
            color: mocha.colors.surface0.hex,
          },
        },
      },
    },
    button: {
      colorScheme: {
        light: {
          secondary: {
            background: latte.colors.crust.hex + '88',
            border: {
              color: latte.colors.surface0.hex,
            },
            hover: {
              color: latte.colors.mauve.hex,
              border: {
                color: latte.colors.crust.hex,
              },
            },
          },
        },
        dark: {
          secondary: {
            background: mocha.colors.crust.hex + '88',
            border: {
              color: mocha.colors.surface0.hex,
            },
            color: mocha.colors.text.hex,
            hover: {
              color: mocha.colors.mauve.hex,
              border: {
                color: mocha.colors.crust.hex,
              },
            },
          },
        },
      },
    },
    panel: {
      colorScheme: {
        light: {
          background: latte.colors.base.hex + '99',
          border: {
            color: latte.colors.crust.hex,
            radius: '0.7rem',
          },
        },
        dark: {
          background: mocha.colors.base.hex + '99',
          border: {
            color: mocha.colors.crust.hex,
            radius: '0.7rem',
          },
        },
      },
    },
    dialog: {
      colorScheme: {
        light: {
          background: latte.colors.base.hex,
          border: {
            color: latte.colors.crust.hex,
          },
        },
        dark: {
          background: mocha.colors.base.hex,
          border: {
            color: mocha.colors.crust.hex,
          },
        },
      },
    },
    divider: {
      colorScheme: {
        light: {
          border: {
            color: latte.colors.surface0.hex,
          },
        },
        dark: {
          border: {
            color: mocha.colors.surface0.hex,
          },
        },
      },
    },
    menubar: {
      colorScheme: {
        light: {
          item: {
            color: latte.colors.mauve.hex,
            active: {
              color: latte.colors.maroon.hex,
            },
            focus: {
              color: latte.colors.maroon.hex,
              background: latte.colors.crust.hex,
            },
            icon: {
              color: latte.colors.maroon.hex,
              focus: {
                color: latte.colors.mauve.hex,
              },
            },
            submenu: {
              icon: {
                color: latte.colors.text.hex,
              },
            },
          },
        },
        dark: {
          item: {
            color: mocha.colors.mauve.hex,
            active: {
              color: mocha.colors.maroon.hex,
            },
            focus: {
              color: mocha.colors.maroon.hex,
              background: mocha.colors.crust.hex,
            },
            icon: {
              color: mocha.colors.maroon.hex,
              focus: {
                color: mocha.colors.mauve.hex,
              },
            },
            submenu: {
              icon: {
                color: mocha.colors.text.hex,
                active: {
                  color: mocha.colors.maroon.hex,
                },
              },
            },
          },
        },
      },
    },
    popover: {
      colorscheme: {
        light: {
          background: latte.colors.crust.hex,
          arrow: {
            offset: '9.8rem',
          },
        },
        dark: {
          background: mocha.colors.crust.hex,
          arrow: {
            offset: '9.8rem',
          },
        },
      },
    },
    progressspinner: {
      colorScheme: {
        light: {
          color: {
            1: latte.colors.maroon.hex,
            2: latte.colors.flamingo.hex,
            3: latte.colors.green.hex,
            4: latte.colors.yellow.hex,
          },
        },
        dark: {
          color: {
            1: mocha.colors.maroon.hex,
            2: mocha.colors.flamingo.hex,
            3: mocha.colors.green.hex,
            4: mocha.colors.yellow.hex,
          },
        },
      },
    },
    select: {
      colorScheme: {
        light: {
          color: latte.colors.text.hex,
          disabled: {
            background: latte.colors.surface0.hex,
          },
          overlay: {
            background: latte.colors.crust.hex,
          },
          option: {
            focus: {
              background: latte.colors.base.hex,
            },
            selected: {
              background: latte.colors.surface0.hex,
            },
          },
        },
        dark: {
          color: mocha.colors.text.hex,
          disabled: {
            background: mocha.colors.surface0.hex,
          },
          overlay: {
            background: mocha.colors.crust.hex,
          },
          option: {
            focus: {
              background: mocha.colors.base.hex,
            },
            selected: {
              background: mocha.colors.surface0.hex,
            },
          },
        },
      },
    },
    datatable: {
      colorScheme: {
        light: {
          header: {
            cell: {
              hover: {
                background: latte.colors.surface0.hex,
              },
            },
          },
          row: {
            hover: {
              background: latte.colors.surface0.hex,
            },
          },
        },
        dark: {
          header: {
            cell: {
              hover: {
                background: mocha.colors.surface0.hex,
              },
            },
          },
          row: {
            hover: {
              background: mocha.colors.surface0.hex,
            },
          },
        },
      },
    },
    tooltip: {
      colorScheme: {
        light: {
          background: latte.colors.crust.hex,
        },
        dark: {
          background: mocha.colors.crust.hex,
        },
      },
    },
  },
};

const tokensAlt = {
  semantic: {
    focusRing: {
      color: '{primary.color}',
    },
    primary: {
      50: '#fcfbff',
      100: '#f3eafd',
      200: '#e9d9fc',
      300: '#dfc8fa',
      400: '#d5b7f9',
      500: '#cba6f7',
      600: '#ad8dd2',
      700: '#8e74ad',
      800: '#705b88',
      900: '#514263',
      950: '#332a3e',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f5f5f6',
          100: '#d0ced3',
          200: '#aaa8af',
          300: '#85818c',
          400: '#5f5b69',
          500: '#3a3446',
          600: '#312c3c',
          700: '#292431',
          800: '#201d27',
          900: '#17151c',
          950: '#0f0d12',
        },
        primary: {
          color: frappe.colors.mauve.hex,
          contrastColor: frappe.colors.surface0.hex,
          hoverColor: frappe.colors.maroon.hex,
          activeColor: frappe.colors.flamingo.hex,
        },
        highlight: {
          background: '{content.background}',
          focusBackground: '{content.background}',
          color: frappe.colors.red.hex + '87',
          focusColor: frappe.colors.maroon.hex,
        },
        mask: {
          background: frappe.colors.surface0.hex + '99',
          color: '{surface.200}',
        },
        formField: {
          background: frappe.colors.crust.hex + '88',
          disabledBackground: '{surface.700}',
          filledBackground: '{surface.800}',
          filledHoverBackground: '{surface.800}',
          filledFocusBackground: '{surface.800}',
          borderColor: '{surface.600}',
          hoverBorderColor: '{surface.500}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: frappe.colors.peach.hex,
          color: frappe.colors.text.hex,
          disabledColor: '{surface.400}',
          placeholderColor: '{surface.400}',
          invalidPlaceholderColor: frappe.colors.maroon.hex,
          floatLabelColor: '{surface.400}',
          floatLabelFocusColor: '{primary.color}',
          floatLabelActiveColor: '{surface.400}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.400}',
        },
        text: {
          color: frappe.colors.text.hex,
          hoverColor: frappe.colors.maroon.hex,
          mutedColor: frappe.colors.surface1.hex,
          hoverMutedColor: frappe.colors.surface0.hex,
        },
        content: {
          background: frappe.colors.surface0.hex + '99',
          hoverBackground: '{surface.800}',
          borderColor: '{surface.700}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.800}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
            },
          },
          optionGroup: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.800}',
            activeBackground: '{surface.800}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
              activeColor: '{surface.400}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
          submenuIcon: {
            color: '{surface.500}',
            focusColor: '{surface.400}',
            activeColor: '{surface.400}',
          },
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f4f4f5',
          100: '#cacbcd',
          200: '#a1a2a6',
          300: '#77797f',
          400: '#4e5057',
          500: '#242730',
          600: '#1f2129',
          700: '#191b22',
          800: '#14151a',
          900: '#0e1013',
          950: '#090a0c',
        },
        primary: {
          color: macchiato.colors.mauve.hex,
          contrastColor: macchiato.colors.surface0.hex,
          hoverColor: macchiato.colors.maroon.hex,
          activeColor: macchiato.colors.flamingo.hex,
        },
        highlight: {
          background: '{content.background}',
          focusBackground: '{content.background}',
          color: macchiato.colors.red.hex + '87',
          focusColor: macchiato.colors.maroon.hex,
        },
        mask: {
          background: macchiato.colors.surface0.hex + '99',
          color: '{surface.200}',
        },
        formField: {
          background: macchiato.colors.crust.hex + '88',
          disabledBackground: '{surface.700}',
          filledBackground: '{surface.800}',
          filledHoverBackground: '{surface.800}',
          filledFocusBackground: '{surface.800}',
          borderColor: '{surface.600}',
          hoverBorderColor: '{surface.500}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: macchiato.colors.peach.hex,
          color: macchiato.colors.text.hex,
          disabledColor: '{surface.400}',
          placeholderColor: '{surface.400}',
          invalidPlaceholderColor: macchiato.colors.maroon.hex,
          floatLabelColor: '{surface.400}',
          floatLabelFocusColor: '{primary.color}',
          floatLabelActiveColor: '{surface.400}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.400}',
        },
        text: {
          color: macchiato.colors.text.hex,
          hoverColor: macchiato.colors.maroon.hex,
          mutedColor: macchiato.colors.surface1.hex,
          hoverMutedColor: macchiato.colors.surface0.hex,
        },
        content: {
          background: macchiato.colors.surface0.hex + '99',
          hoverBackground: '{surface.800}',
          borderColor: '{surface.700}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.800}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
            },
          },
          optionGroup: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.800}',
            activeBackground: '{surface.800}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
              activeColor: '{surface.400}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
          submenuIcon: {
            color: '{surface.500}',
            focusColor: '{surface.400}',
            activeColor: '{surface.400}',
          },
        },
      },
    },
  },
  components: {
    card: {
      colorScheme: {
        light: {
          background: frappe.colors.mantle.hex + '88',
        },
        dark: {
          background: macchiato.colors.mantle.hex + '88',
        },
      },
    },
    checkbox: {
      colorScheme: {
        light: {
          background: frappe.colors.crust.hex,
          disabled: {
            background: frappe.colors.mantle.hex,
          },
        },
        dark: {
          background: macchiato.colors.crust.hex,
          disabled: {
            background: macchiato.colors.mantle.hex,
          },
        },
      },
    },
    drawer: {
      colorScheme: {
        light: {
          background: frappe.colors.mantle.hex,
        },
        dark: {
          background: macchiato.colors.mantle.hex,
        },
      },
    },
    inputtext: {
      colorScheme: {
        light: {
          color: frappe.colors.text.hex,
          background: frappe.colors.crust.hex + '88',
          border: {
            color: frappe.colors.surface0.hex,
          },
        },
        dark: {
          color: macchiato.colors.text.hex,
          background: macchiato.colors.crust.hex + '88',
          border: {
            color: macchiato.colors.surface0.hex,
          },
        },
      },
    },
    button: {
      colorScheme: {
        light: {
          secondary: {
            background: frappe.colors.crust.hex + '88',
            border: {
              color: frappe.colors.surface0.hex,
            },
            hover: {
              color: frappe.colors.mauve.hex,
              border: {
                color: frappe.colors.crust.hex,
              },
            },
          },
        },
        dark: {
          secondary: {
            background: macchiato.colors.crust.hex + '88',
            border: {
              color: macchiato.colors.surface0.hex,
            },
            color: macchiato.colors.text.hex,
            hover: {
              color: macchiato.colors.mauve.hex,
              border: {
                color: macchiato.colors.crust.hex,
              },
            },
          },
        },
      },
    },
    panel: {
      colorScheme: {
        light: {
          background: frappe.colors.base.hex + '99',
          border: {
            color: frappe.colors.crust.hex,
            radius: '0.7rem',
          },
        },
        dark: {
          background: macchiato.colors.base.hex + '99',
          border: {
            color: macchiato.colors.crust.hex,
            radius: '0.7rem',
          },
        },
      },
    },
    dialog: {
      colorScheme: {
        light: {
          background: frappe.colors.base.hex,
          border: {
            color: frappe.colors.crust.hex,
          },
        },
        dark: {
          background: macchiato.colors.base.hex,
          border: {
            color: macchiato.colors.crust.hex,
          },
        },
      },
    },
    divider: {
      colorScheme: {
        light: {
          border: {
            color: frappe.colors.surface0.hex,
          },
        },
        dark: {
          border: {
            color: macchiato.colors.surface0.hex,
          },
        },
      },
    },
    menubar: {
      colorScheme: {
        light: {
          background: frappe.colors.crust.hex,
          color: frappe.colors.mauve.hex,
          item: {
            color: frappe.colors.mauve.hex,
            active: {
              color: frappe.colors.maroon.hex,
            },
            focus: {
              color: frappe.colors.maroon.hex,
              background: frappe.colors.crust.hex,
            },
            icon: {
              color: frappe.colors.maroon.hex,
              focus: {
                color: frappe.colors.mauve.hex,
              },
            },
            submenu: {
              icon: {
                color: frappe.colors.text.hex,
              },
            },
          },
        },
        dark: {
          item: {
            color: macchiato.colors.mauve.hex,
            active: {
              color: macchiato.colors.maroon.hex,
            },
            focus: {
              color: macchiato.colors.maroon.hex,
              background: macchiato.colors.crust.hex,
            },
            icon: {
              color: macchiato.colors.maroon.hex,
              focus: {
                color: macchiato.colors.mauve.hex,
              },
            },
            submenu: {
              icon: {
                color: macchiato.colors.text.hex,
                active: {
                  color: macchiato.colors.maroon.hex,
                },
              },
            },
          },
        },
      },
    },
    popover: {
      colorscheme: {
        light: {
          background: frappe.colors.crust.hex,
          arrow: {
            offset: '9.8rem',
          },
        },
        dark: {
          background: macchiato.colors.crust.hex,
          arrow: {
            offset: '9.8rem',
          },
        },
      },
    },
    progressspinner: {
      colorScheme: {
        light: {
          color: {
            1: frappe.colors.maroon.hex,
            2: frappe.colors.flamingo.hex,
            3: frappe.colors.green.hex,
            4: frappe.colors.yellow.hex,
          },
        },
        dark: {
          color: {
            1: macchiato.colors.maroon.hex,
            2: macchiato.colors.flamingo.hex,
            3: macchiato.colors.green.hex,
            4: macchiato.colors.yellow.hex,
          },
        },
      },
    },
    select: {
      colorScheme: {
        light: {
          color: frappe.colors.text.hex,
          disabled: {
            background: frappe.colors.surface0.hex,
          },
          overlay: {
            background: frappe.colors.crust.hex,
          },
          option: {
            focus: {
              background: frappe.colors.base.hex,
            },
            selected: {
              background: frappe.colors.surface0.hex,
            },
          },
        },
        dark: {
          color: macchiato.colors.text.hex,
          disabled: {
            background: macchiato.colors.surface0.hex,
          },
          overlay: {
            background: macchiato.colors.crust.hex,
          },
          option: {
            focus: {
              background: macchiato.colors.base.hex,
            },
            selected: {
              background: macchiato.colors.surface0.hex,
            },
          },
        },
      },
    },
    datatable: {
      colorScheme: {
        light: {
          header: {
            cell: {
              hover: {
                background: frappe.colors.surface0.hex,
              },
            },
          },
          row: {
            hover: {
              background: frappe.colors.surface0.hex,
            },
          },
        },
        dark: {
          header: {
            cell: {
              hover: {
                background: macchiato.colors.surface0.hex,
              },
            },
          },
          row: {
            hover: {
              background: macchiato.colors.surface0.hex,
            },
          },
        },
      },
    },
    tooltip: {
      colorScheme: {
        light: {
          background: frappe.colors.crust.hex,
        },
        dark: {
          background: macchiato.colors.crust.hex,
        },
      },
    },
  },
};

const vo1dedTokens = {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
    },
    emerald: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22',
    },
    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    lime: {
      50: '#f7fee7',
      100: '#ecfccb',
      200: '#d9f99d',
      300: '#bef264',
      400: '#a3e635',
      500: '#84cc16',
      600: '#65a30d',
      700: '#4d7c0f',
      800: '#3f6212',
      900: '#365314',
      950: '#1a2e05',
    },
    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    orange: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },
    amber: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    yellow: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006',
    },
    teal: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e',
    },
    cyan: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
      950: '#083344',
    },
    sky: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    },
    violet: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    fuchsia: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    },
    pink: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    rose: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
      950: '#4c0519',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    zinc: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    stone: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09',
    },
  },
  semantic: {
    transitionDuration: '0.2s',
    focusRing: {
      width: '1px',
      style: 'solid',
      color: '{primary.color}',
      offset: '2px',
      shadow: 'none',
    },
    disabledOpacity: '0.6',
    iconSize: '1rem',
    anchorGutter: '2px',
    primary: {
      50: '#f8f6fd',
      100: '#ded2f6',
      200: '#c4afef',
      300: '#aa8ce7',
      400: '#9068e0',
      500: '#7645d9',
      600: '#643bb8',
      700: '#533098',
      800: '#412677',
      900: '#2f1c57',
      950: '#1e1136',
    },
    formField: {
      paddingX: '0.75rem',
      paddingY: '0.5rem',
      sm: {
        fontSize: '0.875rem',
        paddingX: '0.625rem',
        paddingY: '0.375rem',
      },
      lg: {
        fontSize: '1.125rem',
        paddingX: '0.875rem',
        paddingY: '0.625rem',
      },
      borderRadius: '{border.radius.md}',
      focusRing: {
        width: '0',
        style: 'none',
        color: 'transparent',
        offset: '0',
        shadow: 'none',
      },
      transitionDuration: '{transition.duration}',
    },
    list: {
      padding: '0.25rem 0.25rem',
      gap: '2px',
      header: {
        padding: '0.5rem 1rem 0.25rem 1rem',
      },
      option: {
        padding: '0.5rem 0.75rem',
        borderRadius: '{border.radius.sm}',
      },
      optionGroup: {
        padding: '0.5rem 0.75rem',
        fontWeight: '600',
      },
    },
    content: {
      borderRadius: '{border.radius.md}',
    },
    mask: {
      transitionDuration: '0.15s',
    },
    navigation: {
      list: {
        padding: '0.25rem 0.25rem',
        gap: '2px',
      },
      item: {
        padding: '0.5rem 0.75rem',
        borderRadius: '{border.radius.sm}',
        gap: '0.5rem',
      },
      submenuLabel: {
        padding: '0.5rem 0.75rem',
        fontWeight: '600',
      },
      submenuIcon: {
        size: '0.875rem',
      },
    },
    overlay: {
      select: {
        borderRadius: '{border.radius.md}',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
      popover: {
        borderRadius: '{border.radius.md}',
        padding: '0.75rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
      modal: {
        borderRadius: '{border.radius.xl}',
        padding: '1.25rem',
        shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      navigation: {
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#fbfafe',
          100: '#ebe6fb',
          200: '#dad2f8',
          300: '#cabef5',
          400: '#baaaf2',
          500: '#aa96ef',
          600: '#9180cb',
          700: '#7769a7',
          800: '#5e5383',
          900: '#443c60',
          950: '#2b263c',
        },
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}',
        },
        mask: {
          background: 'rgba(0,0,0,0.4)',
          color: '{surface.200}',
        },
        formField: {
          background: '{surface.0}',
          disabledBackground: '{surface.200}',
          filledBackground: '{surface.50}',
          filledHoverBackground: '{surface.50}',
          filledFocusBackground: '{surface.50}',
          borderColor: '{surface.300}',
          hoverBorderColor: '{surface.400}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: '{red.400}',
          color: '{surface.700}',
          disabledColor: '{surface.500}',
          placeholderColor: '{surface.500}',
          invalidPlaceholderColor: '{red.600}',
          floatLabelColor: '{surface.500}',
          floatLabelFocusColor: '{primary.600}',
          floatLabelActiveColor: '{surface.500}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.400}',
          shadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)',
        },
        text: {
          color: '{surface.700}',
          hoverColor: '{surface.800}',
          mutedColor: '{surface.500}',
          hoverMutedColor: '{surface.600}',
        },
        content: {
          background: '{surface.0}',
          hoverBackground: '{surface.100}',
          borderColor: '{surface.200}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.0}',
            borderColor: '{surface.200}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.100}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.400}',
              focusColor: '{surface.500}',
            },
          },
          optionGroup: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.100}',
            activeBackground: '{surface.100}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.400}',
              focusColor: '{surface.500}',
              activeColor: '{surface.500}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
          submenuIcon: {
            color: '{surface.400}',
            focusColor: '{surface.500}',
            activeColor: '{surface.500}',
          },
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f8f6fd',
          100: '#ded2f6',
          200: '#c4afef',
          300: '#aa8ce7',
          400: '#9068e0',
          500: '#7645d9',
          600: '#643bb8',
          700: '#533098',
          800: '#412677',
          900: '#2f1c57',
          950: '#1e1136',
        },
        primary: {
          color: '{primary.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{primary.300}',
          activeColor: '{primary.200}',
        },
        highlight: {
          background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
          focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        mask: {
          background: 'rgba(0,0,0,0.6)',
          color: '{surface.200}',
        },
        formField: {
          background: '{surface.950}',
          disabledBackground: '{surface.700}',
          filledBackground: '{surface.800}',
          filledHoverBackground: '{surface.800}',
          filledFocusBackground: '{surface.800}',
          borderColor: '{surface.600}',
          hoverBorderColor: '{surface.500}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: '{red.300}',
          color: '{surface.0}',
          disabledColor: '{surface.400}',
          placeholderColor: '{surface.400}',
          invalidPlaceholderColor: '{red.400}',
          floatLabelColor: '{surface.400}',
          floatLabelFocusColor: '{primary.color}',
          floatLabelActiveColor: '{surface.400}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.400}',
          shadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)',
        },
        text: {
          color: '{surface.0}',
          hoverColor: '{surface.0}',
          mutedColor: '{surface.400}',
          hoverMutedColor: '{surface.300}',
        },
        content: {
          background: '{surface.900}',
          hoverBackground: '{surface.800}',
          borderColor: '{surface.700}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.800}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
            },
          },
          optionGroup: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.800}',
            activeBackground: '{surface.800}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.500}',
              focusColor: '{surface.400}',
              activeColor: '{surface.400}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
          submenuIcon: {
            color: '{surface.500}',
            focusColor: '{surface.400}',
            activeColor: '{surface.400}',
          },
        },
      },
    },
  },
};

export const scrollbarColors = {
  primary: {
    light: `${latte.colors.surface0.hex} rgba(230, 233, 239, 0.5)`,
    dark: `${mocha.colors.surface0.hex} rgba(24, 24, 37, 0.5)`,
  },
  alt: {
    light: `${frappe.colors.surface0.hex} rgba(48, 52, 70, 0.5)`,
    dark: `${macchiato.colors.surface0.hex} rgba(36, 39, 58, 0.5)`,
  },
};
export const backgroundColors = {
  primary: {
    light: latte.colors.base.hex,
    dark: mocha.colors.base.hex,
  },
  alt: {
    light: frappe.colors.base.hex,
    dark: macchiato.colors.base.hex,
  },
};

export const CatppuccinAura = definePreset(Aura, tokens);
export const CatppuccinNora = definePreset(Nora, tokens);
export const CatppuccinMaterial = definePreset(Material, tokens);
export const CatppuccinLara = definePreset(Lara, tokens);

export const CatppuccinAuraAlt = definePreset(Aura, tokensAlt);
export const CatppuccinNoraAlt = definePreset(Nora, tokensAlt);
export const CatppuccinMaterialAlt = definePreset(Material, tokensAlt);
export const CatppuccinLaraAlt = definePreset(Lara, tokensAlt);

export const Vo1dedAura = definePreset(Aura, vo1dedTokens);
export const Vo1dedNora = definePreset(Nora, vo1dedTokens);
export const Vo1dedMaterial = definePreset(Material, vo1dedTokens);
export const Vo1dedLara = definePreset(Lara, vo1dedTokens);

export const themes: AppThemes = {
  'Catppuccin Mocha/Latte Aura': CatppuccinAura,
  'Catppuccin Mocha/Latte Nora': CatppuccinNora,
  'Catppuccin Mocha/Latte Material': CatppuccinMaterial,
  'Catppuccin Mocha/Latte Lara': CatppuccinLara,
  'Catppuccin Macchiato/Frappe Aura': CatppuccinAuraAlt,
  'Catppuccin Macchiato/Frappe Nora': CatppuccinNoraAlt,
  'Catppuccin Macchiato/Frappe Material': CatppuccinMaterialAlt,
  'Catppuccin Macchiato/Frappe Lara': CatppuccinLaraAlt,
  'Vo1ded Aura': Vo1dedAura,
  'Vo1ded Nora': Vo1dedNora,
  'Vo1ded Material': Vo1dedMaterial,
  'Vo1ded Lara': Vo1dedLara,
};

export type AppTheme =
  | 'Catppuccin Mocha/Latte Aura'
  | 'Catppuccin Mocha/Latte Nora'
  | 'Catppuccin Mocha/Latte Material'
  | 'Catppuccin Mocha/Latte Lara'
  | 'Catppuccin Macchiato/Frappe Aura'
  | 'Catppuccin Macchiato/Frappe Nora'
  | 'Catppuccin Macchiato/Frappe Material'
  | 'Catppuccin Macchiato/Frappe Lara'
  | 'Vo1ded Aura'
  | 'Vo1ded Nora'
  | 'Vo1ded Material'
  | 'Vo1ded Lara';

export interface AppThemes {
  [key: string]: any;
}
