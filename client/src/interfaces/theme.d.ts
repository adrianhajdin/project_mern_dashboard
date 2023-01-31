import '@pankod/refine-mui';

export interface CustomTheme {
  // Add custom variables here like below:
  // status: {
  //   danger: string;
  // };
}

declare module '@pankod/refine-mui' {
  interface Theme extends import('@pankod/refine-mui').Theme, CustomTheme {}
  interface ThemeOptions
    extends import('@pankod/refine-mui').ThemeOptions,
      CustomTheme {}
}
