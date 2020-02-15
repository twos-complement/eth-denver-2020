export const scrollIntoView = function scrollIntoView(scrollBar, element, options = {align: `center`}) {
  try {
    if (!scrollBar || !element)
      return;

    const bounds = element.getBoundingClientRect();
    const scrollBounds = scrollBar.getBoundingClientRect();
    let top = scrollBar.scrollTop;

    if (options.align === `bottom`) {
      const scrollBottom = scrollBar.scrollTop + scrollBounds.bottom;

      if (bounds.bottom > scrollBounds.bottom) {
        top += bounds.bottom - scrollBounds.bottom;
      }
    }
    else if (options.align === `center`) {
      top += bounds.top + (bounds.height - scrollBounds.height)/2;
    }
    else { // top 
      top += bounds.top;
    }

    if (scrollBar.scrollTo) {
      scrollBar.scrollTo({ top: top, behavior: `smooth` });
    } else {
      // Safari:
      scrollBar.scrollTop = scrollBar.scrollHeight;
    }
  } catch (e) {}
};

export const scrollTo = function scrollTo(scrollBar, options = {align: `center`, top: 0}) {
  try {
    if (!scrollBar)
      return;

    if (scrollBar.scrollTo) {
      scrollBar.scrollTo({ ...options, behavior: `smooth` });
    } else {
      // Safari:
      scrollBar.scrollTop = options.top;
    }
  } catch (e) {}
};