import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

import { scrollIntoView } from '../../util/dom';
import { detectScrollbarWidth } from '../../util/helpers';

const ScrollbarContainer = styled.div`${({ isScrollEnabled, scrollbarWidth, theme: {bp, dp, ...theme}, ...props }) => css`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: ${dp(0)} -${scrollbarWidth || 0}px ${dp(0)} ${dp(0)};
  -webkit-overflow-scrolling: touch;
`}`;

ScrollbarContainer.propTypes = {
  // Calculated scrollbar width
  scrollbarWidth: PropTypes.number.isRequired,

  // Is scrolling enabled
  isScrollEnabled: PropTypes.bool.isRequired,
};

const Scrollbar = (
{
  scrollbarRef,
  className,
  isScrollEnabled,
  onScroll,
  children,
  ...props
}) => {
  const scrollBar = useRef();
  const [scrollbarWidth, setScrollbarWidth] = useState(detectScrollbarWidth());

  useEffect(() => {
    scrollbarRef.current = {
      element: scrollBar.current,

      scrollToBottom: () => scrollIntoView(scrollBar.current, scrollBar.current.lastElementChild, {align: `bottom`}),
    };
  });

  return (
    <ScrollbarContainer
      ref={scrollBar}
      onScroll={onScroll}
      className={className}
      isScrollEnabled={isScrollEnabled}
      scrollbarWidth={scrollbarWidth}
      {...props}
      >
      {children}
    </ScrollbarContainer>
  );
}

Scrollbar.propTypes = {
  // Passes classes onto component. Allows for styled(<Component>)
  className: PropTypes.string,

  // Action to perform on scrolling update
  onScroll: PropTypes.func,

  // Is scrolling enabled
  isScrollEnabled: PropTypes.bool,

  // Reference to scrollBar
  //  - exposes current.scrollToBottom()
  scrollbarRef: PropTypes.object,

  // Content to display in the scrollable area of the <SessionsCard />. Usually a <StepList />
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])), PropTypes.object, PropTypes.bool]),
};

Scrollbar.defaultProps = {
  className: null,
  onScroll: null,
  scrollbarRef: {},
  isScrollEnabled: true,
  children: null,
};

export default Scrollbar;
