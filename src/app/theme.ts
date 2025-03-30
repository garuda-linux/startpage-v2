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
  semantic: {
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
  vo1ded: {
    light: '#dfdafa #aa96ef',
    dark: '#8c6ce6 #4b2989',
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
  vo1ded: {
    light: '#fbfafe',
    dark: '#291d44',
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
