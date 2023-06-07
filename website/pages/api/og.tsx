// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

// eslint-disable-next-line import/no-default-export
export default async function handler(request: NextRequest) {
  try {
    const SpaceGrotesk = await fetch(
      String(
        new URL(
          '../../public/SpaceGrotesk-VariableFont_wght.ttf',
          import.meta.url,
        ),
      ),
    ).then((res) => res.arrayBuffer());

    const { searchParams } = new URL(request.url);

    const title = searchParams.has('title')
      ? searchParams.get('title')!.slice(0, 100)
      : '';
    const description = searchParams.has('description')
      ? searchParams.get('description')!.slice(0, 200)
      : '';
    const note = searchParams.has('date')
      ? searchParams.get('date')!.slice(0, 100)
      : '';

    return new ImageResponse(
      <OgImage title={title} description={description} note={note} />,
      {
        width: 800,
        height: 400,
        fonts: [
          {
            name: 'Space Grotesk',
            data: SpaceGrotesk,
            weight: 500 as const,
            style: 'normal' as const,
          },
          {
            name: 'Space Grotesk',
            data: SpaceGrotesk,
            weight: 700 as const,
            style: 'normal' as const,
          },
        ],
      },
    );
  } catch (err: unknown) {
    return new Response(undefined, {
      status: 302,
      headers: {
        Location: 'https://million.dev/banner.png',
      },
    });
  }
}

export function OgImage({
  title,
  description,
  note,
}: {
  title: string;
  description: string;
  note: string;
}) {
  return (
    <div
      tw="h-full w-full flex flex-col bg-[#111] p-10 pb-5"
      style={{ fontFamily: 'Space Grotesk' }}
    >
      <div tw="flex flex-col">
        <span tw="text-white text-6xl font-bold pb-5">{title}</span>
        <span tw="text-[#b9bdc4] text-3xl flex">{description}</span>
      </div>
      <div tw="mt-auto flex-col flex">
        <hr tw="bg-[#2a2c35] w-full" />
        <div tw="flex mt-4">
          <span tw="text-[#838793] text-3xl flex mr-auto">{note}</span>
          <img
            tw="h-10"
            src="data:image/svg+xml,%3Csvg width='566' height='119' view-box='0 0 566 119' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M43.2861 100.407C50.9973 89.3692 66.6897 81.813 84.794 81.813C102.898 81.813 118.591 89.3692 126.302 100.407C118.591 111.444 102.898 119 84.794 119C66.6897 119 50.9973 111.444 43.2861 100.407Z' fill='url(%23paint0_radial_1449_2)' /%3E%3Cpath d='M43.006 18.3961C50.7123 7.47595 66.3946 0 84.4874 0C102.58 0 118.263 7.47595 125.969 18.3961C118.263 29.3163 102.58 36.7922 84.4874 36.7922C66.3946 36.7922 50.7123 29.3163 43.006 18.3961Z' fill='url(%23paint1_radial_1449_2)' /%3E%3Cpath d='M85.2801 59.7175C74.0684 70.5465 58.8619 76.6302 43.006 76.6302C27.1502 76.6302 11.9437 70.5465 0.731934 59.7175L43.006 18.3961L85.2801 59.7175Z' fill='url(%23paint2_radial_1449_2)' /%3E%3Cpath d='M168.344 59.7378C157.132 70.5668 141.925 76.6505 126.07 76.6505C110.214 76.6505 95.0073 70.5668 83.7955 59.7378L126.07 18.3961L168.344 59.7378Z' fill='url(%23paint3_radial_1449_2)' /%3E%3Cpath d='M189.3 92V37.6H210.4L211.4 45.6H212.4C214.133 42.6667 216.533 40.4333 219.6 38.9C222.733 37.3667 226.367 36.6 230.5 36.6C234.9 36.6 238.733 37.5 242 39.3C245.267 41.0333 247.733 43.7667 249.4 47.5H250.4C252.6 43.5 255.433 40.7 258.9 39.1C262.367 37.4333 266.333 36.6 270.8 36.6C275.467 36.6 279.467 37.5333 282.8 39.4C286.2 41.2 288.8 44 290.6 47.8C292.4 51.5333 293.3 56.3667 293.3 62.3V92H271.2V65.1C271.2 62.7667 270.967 60.7 270.5 58.9C270.033 57.1 269.167 55.7 267.9 54.7C266.7 53.6333 264.933 53.1 262.6 53.1C260.4 53.1 258.533 53.5667 257 54.5C255.467 55.4333 254.3 56.7333 253.5 58.4C252.7 60 252.3 61.8667 252.3 64V92H230.3V64.9C230.3 62.6333 230.067 60.6333 229.6 58.9C229.2 57.1 228.367 55.7 227.1 54.7C225.833 53.6333 224 53.1 221.6 53.1C219.4 53.1 217.533 53.6 216 54.6C214.533 55.5333 213.4 56.8333 212.6 58.5C211.8 60.1 211.4 61.9333 211.4 64V92H189.3ZM301.898 92V37.6H323.998V92H301.898ZM301.898 32V19.1H323.998V32H301.898ZM332.659 92V19.1H354.759V92H332.659ZM363.421 92V19.1H385.521V92H363.421ZM394.183 92V37.6H416.283V92H394.183ZM394.183 32V19.1H416.283V32H394.183ZM456.545 93C451.478 93 446.878 92.4 442.745 91.2C438.611 89.9333 435.045 88.1 432.045 85.7C429.111 83.3 426.845 80.3667 425.245 76.9C423.645 73.3667 422.845 69.3333 422.845 64.8C422.845 58.8 424.245 53.7 427.045 49.5C429.845 45.3 433.745 42.1 438.745 39.9C443.811 37.7 449.745 36.6 456.545 36.6C461.611 36.6 466.211 37.2333 470.345 38.5C474.478 39.7 478.011 41.5 480.945 43.9C483.945 46.3 486.245 49.2667 487.845 52.8C489.445 56.2667 490.245 60.2667 490.245 64.8C490.245 70.7333 488.845 75.8333 486.045 80.1C483.311 84.3 479.411 87.5 474.345 89.7C469.345 91.9 463.411 93 456.545 93ZM456.545 76.3C459.145 76.3 461.311 75.8333 463.045 74.9C464.778 73.9667 466.078 72.6333 466.945 70.9C467.811 69.1667 468.245 67.1333 468.245 64.8C468.245 63 467.978 61.4 467.445 60C466.978 58.5333 466.245 57.3 465.245 56.3C464.311 55.3 463.111 54.5333 461.645 54C460.178 53.4667 458.478 53.2 456.545 53.2C454.011 53.2 451.878 53.6667 450.145 54.6C448.411 55.5333 447.111 56.8667 446.245 58.6C445.378 60.3333 444.945 62.4 444.945 64.8C444.945 66.6 445.178 68.2 445.645 69.6C446.178 71 446.911 72.2 447.845 73.2C448.845 74.2 450.045 74.9667 451.445 75.5C452.911 76.0333 454.611 76.3 456.545 76.3ZM496.722 92V37.6H518.022L518.822 45.5H519.822C521.422 42.7 523.922 40.5333 527.322 39C530.789 37.4 534.355 36.6 538.022 36.6C541.555 36.6 544.755 37.0333 547.622 37.9C550.489 38.7667 552.955 40.2 555.022 42.2C557.089 44.1333 558.689 46.7333 559.822 50C560.955 53.2667 561.522 57.3 561.522 62.1V92H539.422V66C539.422 63.4667 539.155 61.2333 538.622 59.3C538.155 57.3667 537.222 55.8667 535.822 54.8C534.489 53.6667 532.555 53.1 530.022 53.1C527.689 53.1 525.689 53.6333 524.022 54.7C522.355 55.7 521.055 57.1 520.122 58.9C519.255 60.6333 518.822 62.6333 518.822 64.9V92H496.722Z' fill='white' /%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_1449_2' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(84.794 100.406) rotate(92.849) scale(12.0136 26.7792)'%3E%3Cstop stop-color='%23845CE7' /%3E%3Cstop offset='1' stop-color='%23AF73D8' /%3E%3C/radialGradient%3E%3CradialGradient id='paint1_radial_1449_2' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(84.5378 38.3252) rotate(92.7908) scale(24.7615 54.0709)'%3E%3Cstop stop-color='%23845CE7' /%3E%3Cstop offset='1' stop-color='%23AF73D8' /%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_1449_2' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(84.5378 38.3252) rotate(92.7908) scale(24.7615 54.0709)'%3E%3Cstop stop-color='%23845CE7' /%3E%3Cstop offset='1' stop-color='%23AF73D8' /%3E%3C/radialGradient%3E%3CradialGradient id='paint3_radial_1449_2' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(84.5378 38.3252) rotate(92.7908) scale(24.7615 54.0709)'%3E%3Cstop stop-color='%23845CE7' /%3E%3Cstop offset='1' stop-color='%23AF73D8' /%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E"
          />
        </div>
      </div>
    </div>
  );
}
