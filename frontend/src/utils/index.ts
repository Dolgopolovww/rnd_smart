/**
 * The function toggle overflow-hidden on html tag
 */
export const htmlOverflowHidden = (isActive: boolean) => {
  const html = document.documentElement;

  if (isActive) {
    html.classList.add('overflow-hidden');
  } else {
    html.classList.remove('overflow-hidden');
  }
};
