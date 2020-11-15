import React from 'react';
import './helpscreen.css';

const Possibilities = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Possibilities
    </h3>
    <h4 className="p-mt-0 p-mb-3">
      The Textotals brain thinks of action account totals as just numbers.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      With it you can track any quantity that draws down a total by consuming
      from accounts in different categories.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Here, group is "ALICE SCHOOL", account is READING, beginning total is 24
      (hours), and the category names are book titles:
    </h4>

    <div style={{ marginTop: '-10px' }}>
      <div className="action-item-action">alice school set 24 reading</div>
      <div className="action-item-action">
        alice school spend 1.5 on 1984 from reading
      </div>
      <div className="action-item-action">
        alice school spend 3.5 on war and peace from reading
      </div>
    </div>
  </div>
);

export default Possibilities;
