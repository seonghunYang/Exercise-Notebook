import React, { forwardRef } from "react";
import {
  PolymorphicComponentPropsWithoutRef,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "./type";

interface _TextProps {
  size?: number;
  color?: string;
}

type TextProps<T extends React.ElementType> =
  PolymorphicComponentPropsWithoutRef<T, _TextProps>;

type TextComponent = <T extends React.ElementType = "span">(
  props: TextProps<T> & {
    ref?: PolymorphicRef<T>;
  }
) => React.ReactNode;

const Text: TextComponent = forwardRef(
  <T extends React.ElementType = "span">(
    { as, size, color, ...props }: TextProps<T>,
    ref: PolymorphicRef<T>
  ) => {
    const Element = as || "span";
    return <Element ref={ref} {...props} />;
  }
);

export default Text;
