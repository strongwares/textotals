import React from 'react';
import './helpscreen.css';

const SpendingCategories = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'Spending Categories'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      You can tell Textotals exactly what category you are spending on.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Here are examples of spend actions with categories:
    </h4>

    <div>
      <div className="action-item-action">spend 50.99 on gas</div>
      <div className="action-item-action">spend 100 on books from savings</div>
      <div className="action-item-action">
        spend 400.99 on travel from rainy day fund
      </div>
      <div className="action-item-action">
        contract x spend 485.01 on software from account a
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default SpendingCategories;
