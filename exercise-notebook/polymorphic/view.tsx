import React, { forwardRef } from "react";
import {
  PolymorphicComponentPropsWithoutRef,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "./type";

type ViewComponent = <C extends React.ElementType = "div">(
  props: PolymorphicComponentPropsWithRef<C>
) => React.ReactNode;

const View: ViewComponent = forwardRef(
  <T extends React.ElementType = "div">(
    { as, ...props }: PolymorphicComponentPropsWithoutRef<T>,
    ref: PolymorphicRef<T>
  ) => {
    const Element = as || "div";

    return <Element ref={ref} {...props} />;
  }
);

export default View;
