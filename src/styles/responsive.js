const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  mobile: '520px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

export const BREAKPOINTS = {
  MOBILE_S: `@media (max-width: ${size.mobileS})`,
  MOBILE_M: `@media (max-width: ${size.mobileM})`,
  MOBILE_L: `@media (max-width: ${size.mobileL})`,
  MOBILE: `@media (max-width: ${size.mobile})`,
  TABLET: `@media (max-width: ${size.tablet})`,
  LAPTOP: `@media (max-width: ${size.laptop})`,
  LAPTOP_L: `@media (max-width: ${size.laptopL})`,
  DESKTOP: `@media (max-width: ${size.desktop})`,
  DESKTOP_L: `@media (max-width: ${size.desktop})`
};
