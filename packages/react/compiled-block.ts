
// The following code are for the compield `block` components
import type { ComponentType, JSX, ReactPortal } from 'react';
import { Fragment, createElement, useState } from 'react';
import type { MillionPortal, MillionProps, Options } from '../types';
import { block } from "./block";
import { renderReactScope } from './utils';

function isEqual(a: unknown, b: unknown): boolean {
  // Faster than Object.is
  // eslint-disable-next-line no-self-compare
  return a === b || (a !== a && b !== b);
}

function shouldCompiledBlockUpdate(prev: MillionProps, next: MillionProps): boolean {
  for (const key in prev) {
    if (!isEqual(prev[key], next[key])) {
      return true;
    }
  }
  return false;
}

interface CompiledBlockOptions extends Omit<Options<MillionProps>, 'shouldUpdate'> {
  portals?: string[];
}

export function compiledBlock(
  render: (props: MillionProps) => JSX.Element,
  { portals, ...options }: CompiledBlockOptions,
): ComponentType<MillionProps> {
  const RenderBlock = block<MillionProps>((props) => render(props), {
    ...options,
    name: `CompiledBlock(Inner(${options.name}))`,
    shouldUpdate: shouldCompiledBlockUpdate,
  });

  const portalCount = portals?.length || 0;

  const Component: ComponentType<MillionProps> = portals && portalCount > 0 ? (props: MillionProps) => {
    const [current] = useState<MillionPortal[]>(() => []);

    const derived = {...props};

    for (let i = 0; i < portalCount; i++) {
      const index = portals[i]!;
      derived[index] = renderReactScope(
        derived[index] as JSX.Element,
        false,
        current,
        i,
      );
    }

    const targets: ReactPortal[] = [];

    for (let i = 0, len = current.length; i < len; i++) {
      targets[i] = current[i]!.portal;
    }

    return createElement(Fragment, {},
      createElement(RenderBlock, derived),
      targets,
    );
  } : (props: MillionProps) => createElement(RenderBlock, props);

  // TODO dev mode
  if (options.name) {
    Component.displayName = `Million(CompiledBlock(Outer(${options.name})))`;
  }

  return Component;
}
