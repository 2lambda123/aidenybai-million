/**
 * @name partialUpdate
 * @description updating every 10th row for 1,000 rows
 */

import { createElement, patch, UPDATE } from '../../src/index';
import { Suite } from '../benchmark';
import { buildData } from '../data';

const data = buildData(1000);
const createVNode = () => (
  <table>
    {data.map(({ id, label }) => (
      <tr key={String(id)}>
        <td>{id}</td>
        <td>{label}</td>
      </tr>
    ))}
  </table>
);
const oldVNode = createVNode();
const el = () => createElement(oldVNode);
for (let i = 0; i < 1000; i += 10) {
  data[i] = buildData(1)[0];
}

const vnode = createVNode();

const suite = Suite('partial update (updating every 10th row for 1,000 rows)', {
  million: () => {
    patch(el(), vnode);
  },
  DOM: () => {
    const elClone = el();
    for (let i = 0; i < 1000; i += 10) {
      const { id, label } = data[i];
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      td1.textContent = String(id);
      td2.textContent = label;
      tr.appendChild(td1);
      tr.appendChild(td2);
      elClone.replaceWith(tr);
    }
  },
  innerHTML: () => {
    let html = '';
    data.forEach(({ id, label }) => {
      html += `<tr><td>${String(id)}</td><td>${label}</td></tr>`;
    });
    el().innerHTML = html;
  },
});

export default suite;
