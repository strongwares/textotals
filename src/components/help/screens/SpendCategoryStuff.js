import React from 'react';
import './helpscreen.css';

const SpendCategoryStuff = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'Spend Category STUFF'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Textotals puts the amount in every "spend" action into a category.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      If your spend action does not include a category, then Textotals will
      automatically put the spend amount into a "STUFF" category.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      The automatic category (when your action doesn't include a category) is
      named "STUFF".
    </h4>

    <h4 className="p-mt-0 p-mb-3">For example, these actions:</h4>

    <div style={{ marginTop: '-15px', marginBottom: '10px' }}>
      <div className="action-item-action">spend 50.99</div>
      <div className="action-item-action">
        contract x spend 190.04 from account a
      </div>
    </div>

    <h4 style={{ marginBottom: '-10px' }} className="p-mt-0">
      will put the spend amounts into a category named "STUFF".
    </h4>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default SpendCategoryStuff;
