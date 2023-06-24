import tinycolor2 from 'tinycolor2';

const lighten = (colour: string, amount: number) => `#${tinycolor2(colour).lighten(amount).toHex()}`;
const darken = (colour: string, amount: number) => `#${tinycolor2(colour).darken(amount).toHex()}`;

const lightThemeAmount = 10;
const darkThemeAmount = 10;

const colours = <{[key: string]: string}>{
  primary: '#b37c37',
  secondary: '#2a363b',
  background: '#fff',
  border: '#d9d9d9',
};

type ColourTheme = {
  [key: string]: {
    DEFAULT: string,
    light: string,
    dark: string,
  },
};

const theme: ColourTheme = Object.keys(colours).reduce((theme, colourName) => (<ColourTheme>{
  ...theme,
  [colourName]: {
    DEFAULT: colours[colourName],
    light: lighten(colours[colourName], lightThemeAmount),
    dark: darken(colours[colourName], darkThemeAmount),
  }
}), { });

export const useColour = () => ({
  lighten,
  darken,
  theme,
});