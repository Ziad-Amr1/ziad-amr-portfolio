/* eslint-disable no-unused-vars */
import { forwardRef, createElement } from "react";

function createMotionComponent(tag) {
  const Component = forwardRef(({ children, ...props }, ref) => {
    const { initial, animate, exit, transition, whileHover, whileTap, variants, layoutId, onAnimationComplete, ...rest } = props;
    return createElement(tag, { ...rest, ref }, children);
  });
  Component.displayName = `motion.${tag}`;
  return Component;
}

export const motion = new Proxy({}, {
  get: (_, tag) => createMotionComponent(tag),
});

export const AnimatePresence = ({ children }) => children;
