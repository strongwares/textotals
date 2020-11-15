import React from 'react';
import './helpscreen.css';

const SpendCategoryStuff = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'Spend Category STUFF'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Textotals automatically puts every spending action into a category.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      The automatic category that Textotals uses is named "STUFF".
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      It will use the STUFF category when you don't include a category with a
      spend action.
    </h4>

    <h4 className="p-mt-0 p-mb-3">For example, these actions:</h4>

    <div style={{ marginTop: '-15px', marginBottom: '10px' }}>
      <div className="action-item-action">spend 50.99</div>
      <div className="action-item-action">
        contract x spend 190.04 from account a
      </div>
    </div>

    <h4 style={{ marginBottom: '-10px' }} className="p-mt-0">
      Will put the spent amounts into the STUFF category of each account.
    </h4>
  </div>
);

export default SpendCategoryStuff;
