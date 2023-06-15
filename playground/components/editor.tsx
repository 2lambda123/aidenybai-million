import {
  type SandpackPredefinedTemplate,
  type SandpackFiles,
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackConsole,
} from '@codesandbox/sandpack-react';
import type { Frameworks } from '@/types';
import { files as reactViteFiles } from '@/configurations/react-vite';
import { files as nextjsFiles } from '@/configurations/nextjs';
import { MonacoEditor } from './monaco-editor';
import { GridResizer } from './gridResize';
import { useRef, useState } from 'react';
import { FrameworkSwitcher } from './framework-switcher';
import { useAtomValue, atom } from 'jotai';

export const frameworkAtom = atom<Frameworks>('react');

const FRAMEWORK_TEMPLATE_MAP: Record<Frameworks, SandpackPredefinedTemplate> = {
  nextjs: 'nextjs',
  react: 'vite-react',
};

const FRAMEWORK_FILES_MAP: Record<Frameworks, SandpackFiles> = {
  react: reactViteFiles,
  nextjs: nextjsFiles,
};

export const Editor: React.FC = () => {
  const framework = useAtomValue(frameworkAtom);

  const template = FRAMEWORK_TEMPLATE_MAP[framework];
  const files = FRAMEWORK_FILES_MAP[framework];
  const dependencies = {
    million: 'latest',
  };

  let resizerRef = useRef<null | HTMLDivElement>()!;
  let gridRef = useRef<null | HTMLDivElement>()!;
  const [left, setLeft] = useState(0.5);
  const [isHorizontal, setIsHorizontal] = useState(false);

  const changeLeft = (clientX: number, clientY: number) => {
    let position: number;
    let size: number;
    let grid = gridRef?.current!;
    let resizer = resizerRef?.current!;
    if (!grid || !resizer) {
      return;
    }
    const rect = grid.getBoundingClientRect();

    if (isHorizontal) {
      position = clientY - rect.top - resizer.offsetHeight / 2;
      size = grid.offsetHeight - resizer.offsetHeight;
    } else {
      position = clientX - rect.left - resizer.offsetWidth / 2;
      size = grid.offsetWidth - resizer.offsetWidth;
    }
    const percentage = position / size;
    const percentageAdjusted = Math.min(Math.max(percentage, 0.25), 0.75);

    setLeft(percentageAdjusted);
  };
  return (
    <div className="flex flex-col h-100vw">
      <header style={{ height: 50 }}>header</header>
      <SandpackProvider
        theme="dark"
        template={template}
        customSetup={{ dependencies }}
        files={files}
      >
        <FrameworkSwitcher />
        <SandpackLayout
          ref={gridRef as any}
          className="flex"
          // I want this to be dyanmic with whatever else is in the parent div but I can't figure it out
          style={{ height: 'calc(100vh - 100px)' }}
        >
          <MonacoEditor flex={left} />

          <GridResizer
            ref={resizerRef as any}
            isHorizontal={true}
            onResize={changeLeft}
          />

          <SandpackPreview
            style={{ height: '100%', flex: 1 - left }}
            showOpenInCodeSandbox={false}
          ></SandpackPreview>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};