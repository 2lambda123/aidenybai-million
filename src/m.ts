// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = Record<string, string | Record<string, string | boolean> | Function>;
export type VNodeChildren = (VNode | string)[];

export interface VNode {
  tag: string;
  props?: Props;
  children?: VNodeChildren;
}

export const m = (tag: string, props?: Props, ...children: VNodeChildren): VNode => {
  if (props && 'style' in props) {
    props.style = Object.entries(props.style)
      .map((style) => style.join(':'))
      .join(';');
  }

  if (props && 'class' in props) {
    delete props.class;
    props.className = Object.values(props)
      .filter((classEnabled) => classEnabled)
      .join(' ');
  }

  return {
    tag,
    props,
    children,
  };
};
