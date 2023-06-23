import { createElement, Fragment, useCallback, useMemo, useRef } from 'react';
import {
  block as createBlock,
  mount$,
  patch as patchBlock,
} from '../million/block';
import { MapSet$, MapHas$, MapGet$ } from '../million/constants';
import { queueMicrotask$ } from '../million/dom';
import { processProps, unwrap } from './utils';
import { Effect, RENDER_SCOPE, REGISTRY } from './constants';
import type { ComponentType } from 'react';
import type { Options, MillionProps } from '../types';

export const block = <P extends MillionProps>(
  fn: ComponentType<P> | null,
  options: Options = {},
) => {
  const block = MapHas$.call(REGISTRY, fn)
    ? MapGet$.call(REGISTRY, fn)
    : fn
    ? createBlock(fn as any, unwrap)
    : options.block;

  const MillionBlock = <P extends MillionProps>(props: P) => {
    const ref = useRef<HTMLElement>(null);
    const patch = useRef<((props: P) => void) | null>(null);

    props = processProps(props);
    patch.current?.(props);

    const effect = useCallback(() => {
      const currentBlock = block(props, props.key, options.shouldUpdate);
      if (ref.current && patch.current === null) {
        queueMicrotask$(() => {
          mount$.call(currentBlock, ref.current!, null);
        });
        patch.current = (props: P) => {
          queueMicrotask$(() => {
            patchBlock(
              currentBlock,
              block(props, props.key, options.shouldUpdate),
            );
          });
        };
      }
    }, []);

    const marker = useMemo(() => {
      return createElement(RENDER_SCOPE, {
        ref,
        suppressHydrationWarning: true,
      });
    }, []);

    const vnode = createElement(
      Fragment,
      null,
      marker,
      createElement(Effect, { effect }),
    );

    return vnode;
  };

  if (!MapHas$.call(REGISTRY, fn)) {
    MapSet$.call(REGISTRY, fn, block);
  }

  return MillionBlock<P>;
};
