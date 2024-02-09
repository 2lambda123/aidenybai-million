import { useEffect } from 'react';
import YouTube from 'react-youtube';
import { Container } from '../home/container';
import { useTranslations } from 'hooks/use-translations';

export function Hero() {

  const { ai } = useTranslations();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="relative">
      <Blur />
      <Container>
        <div className="relative pt-16 md:pt-28 ml-auto">
          <div className="lg:w-[70%] text-center mx-auto">
            <h1 className="text-zinc-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
            {ai.youWriteCode}
              <br />
              <span className="gradient-text inline-block">
               {ai.weMakeItFast}
              </span>
            </h1>
            <p className="mt-8 text-xl text-zinc-600 dark:text-zinc-300 leading-8">
            {ai.description.tool}{' '}
              <span className="font-semibold">– {ai.description.automaticallyBold} </span>. {ai.description.goal}.      </p>
            <div className="mt-8 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <div
                id="getWaitlistContainer"
                data-waitlist_id="11876"
                data-widget_type="WIDGET_2"
              ></div>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 text-center mx-auto flex justify-center mt-6">
          <YouTube videoId="37v2qVmcWJY" className="youtubeContainer" />
        </div>
      </Container>
      <Blur />
    </div>
  );
}

export function Blur() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-10 dark:opacity-20 pointer-events-none"
    >
      <div className="fix-safari-blur blur-[170px] opacity-20 h-100 bg-gradient-to-br from-violet-500 to-purple-400 dark:from-indigo-700"></div>
      <div className="fix-safari-blur blur-[170px] opacity-20 h-100 bg-gradient-to-r from-pink-400 to-purple-300 dark:to-indigo-600"></div>
    </div>
  );
}
