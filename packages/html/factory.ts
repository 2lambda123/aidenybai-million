import { h, JSXVNode } from '../../packages/jsx-runtime';
import { VNode, VProps } from '../../packages/million/types';

export const factory = (tagName: string) => {
  function vnode(props: VProps): VNode;
  function vnode(children: JSXVNode[]): VNode;
  function vnode(props: VProps, children: JSXVNode[]): VNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function vnode(param1?: any, param2?: any): VNode {
    if (Array.isArray(param1)) {
      return h(tagName, param2, ...param1);
    } else {
      return h(tagName, param1, ...(param2 ?? []));
    }
  }
  return vnode;
};

export const input = factory('input');
export const textarea = factory('textarea');
export const checkbox = factory('input');
export const address = factory('address');
export const article = factory('article');
export const aside = factory('aside');
export const footer = factory('footer');
export const header = factory('header');
export const h1 = factory('h1');
export const h2 = factory('h2');
export const h3 = factory('h3');
export const h4 = factory('h4');
export const h5 = factory('h5');
export const h6 = factory('h6');
export const hgroup = factory('hgroup');
export const nav = factory('nav');
export const section = factory('section');
export const blockquote = factory('blockquote');
export const dd = factory('dd');
export const div = factory('div');
export const dl = factory('dl');
export const dt = factory('dt');
export const figcaption = factory('figcaption');
export const figure = factory('figure');
export const hr = factory('hr');
export const li = factory('li');
export const main = factory('main');
export const ol = factory('ol');
export const p = factory('p');
export const pre = factory('pre');
export const ul = factory('ul');
export const a = factory('a');
export const abbr = factory('abbr');
export const b = factory('b');
export const bdi = factory('bdi');
export const bdo = factory('bdo');
export const br = factory('br');
export const cite = factory('cite');
export const code = factory('code');
export const data = factory('data');
export const dfn = factory('dfn');
export const em = factory('em');
export const i = factory('i');
export const kbd = factory('kbd');
export const mark = factory('mark');
export const q = factory('q');
export const rp = factory('rp');
export const rt = factory('rt');
export const rtc = factory('rtc');
export const ruby = factory('ruby');
export const s = factory('s');
export const samp = factory('samp');
export const small = factory('small');
export const span = factory('span');
export const strong = factory('strong');
export const sub = factory('sub');
export const sup = factory('sup');
export const time = factory('time');
export const u = factory('u');
export const varElement = factory('var');
export const wbr = factory('wbr');
export const area = factory('area');
export const audio = factory('audio');
export const img = factory('img');
export const map = factory('map');
export const track = factory('track');
export const video = factory('video');
export const embed = factory('embed');
export const object = factory('object');
export const param = factory('param');
export const picture = factory('picture');
export const source = factory('source');
export const canvas = factory('canvas');
export const script = factory('script');
export const del = factory('del');
export const ins = factory('ins');
export const caption = factory('caption');
export const col = factory('col');
export const colgroup = factory('colgroup');
export const table = factory('table');
export const tbody = factory('tbody');
export const td = factory('td');
export const tfoot = factory('tfoot');
export const th = factory('th');
export const thead = factory('thead');
export const tr = factory('tr');
export const button = factory('button');
export const datalist = factory('datalist');
export const fieldset = factory('fieldset');
export const form = factory('form');
export const label = factory('label');
export const legend = factory('legend');
export const meter = factory('meter');
export const optgroup = factory('optgroup');
export const option = factory('option');
export const output = factory('output');
export const progress = factory('progress');
export const select = factory('select');
export const details = factory('details');
export const menuitem = factory('menuitem');
export const summary = factory('summary');
export const slot = factory('slot');
export const template = factory('template');
export const circle = factory('circle');
export const rect = factory('rect');
export const ellipse = factory('ellipse');
export const g = factory('g');
export const image = factory('image');
export const line = factory('line');
export const mask = factory('mask');
export const path = factory('path');
export const polygon = factory('polygon');
export const polyline = factory('polyline');
export const svg = factory('svg');
export const svgText = factory('text');
export const marker = factory('marker');
export const linearGradient = factory('linearGradient');
export const foreignObject = factory('foreignObject');
