import React from 'react';
import './helpscreen.css';

// style={{ height: '370px', maxHeight: '370px', overflowY: 'auto' }}
const Examples = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Examples
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Here are some examples of Textotals actions.
    </h4>

    <div style={{ marginTop: '-10px' }}>
      <div className="action-item-action">set 1500</div>
      <div className="action-item-action">set 1000 savings</div>
      <div className="action-item-action">set 500 rainy day fund</div>

      <div className="action-item-action">spend 49.04 gas</div>
      <div className="action-item-action">spend 101.90 groceries</div>
      <div className="action-item-action">spend 33.90 on tv from savings</div>
      <div className="action-item-action">
        spend 289.75 on car repair from savings
      </div>
      <div className="action-item-action">add 1000</div>
      <div className="action-item-action">move 500 to savings</div>
      <div className="action-item-action">
        give 100 to homeless from rainy day fund
      </div>

      <div style={{ marginTop: '20px' }} className="action-item-action">
        credit union set 1000 vacation fund
      </div>
      <div className="action-item-action">
        credit union set 1000 new car fund
      </div>

      <div style={{ marginTop: '20px' }} className="action-item-action">
        work set 40 project a
      </div>
      <div className="action-item-action">work set 40 project b</div>
      <div className="action-item-action">
        work spend 4 on analysis from project a
      </div>
      <div className="action-item-action">
        work spend 4 on review from project a
      </div>
      <div className="action-item-action">
        work spend 8 on analysis from project b
      </div>

      <div style={{ marginTop: '20px' }} className="action-item-action">
        social work set 40 john smith
      </div>
      <div className="action-item-action">
        social work spend 4 on counseling from john smith
      </div>
      <div className="action-item-action">
        social work spend 4 on paperwork from john smith
      </div>

      <div style={{ marginTop: '20px' }} className="action-item-action">
        home school set 24 reading
      </div>
      <div className="action-item-action">
        home school spend 3.5 on war and peace from reading
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default Examples;
