import * as flavors from '@catppuccin/palette';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Nora from '@primeng/themes/nora';
import Material from '@primeng/themes/material';
import Lara from '@primeng/themes/lara';

const { latte, mocha } = flavors.flavors;

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
          color: 'rgba(230, 69, 83, .87)',
          focusColor: latte.colors.maroon.hex,
        },
        mask: {
          background: 'rgba(220, 224, 232, .6)',
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
          background: 'rgba(230, 233, 239, 0.8)',
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
          color: 'rgba(235, 160, 172, .87)',
          focusColor: mocha.colors.maroon.hex,
        },
        mask: {
          background: 'rgba(17, 17, 27, 0.6)',
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
          background: 'rgba(24, 24, 37, 0.8)',
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
    table: {
      colorScheme: {
        light: {
          header: {
            cell: {
              hover: {
                background: latte.colors.surface0.hex,
              },
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

export const CatppuccinAura = definePreset(Aura, tokens);
export const CatppuccinNora = definePreset(Nora, tokens);
export const CatppuccinMaterial = definePreset(Material, tokens);
export const CatppuccinLara = definePreset(Lara, tokens);

export const themes = {
  CatppuccinAura: CatppuccinAura,
  CatppuccinLara: CatppuccinLara,
  CatppuccinMaterial: CatppuccinMaterial,
  CatppuccinNora: CatppuccinNora,
};

export const availableThemes: string[] = ['CatppuccinAura', 'CatppuccinNora', 'CatppuccinMaterial', 'CatppuccinLara'];
export type AppTheme = (typeof availableThemes)[number];
