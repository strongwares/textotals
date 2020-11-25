import React from 'react';
import './helpscreen.css';

const UppercaseLetters = (
  <div className="helpscreen-item">
    <h2 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Uppercase Letters
    </h2>

    <h4 className="p-mt-0 p-mb-3">
      Textotals likes to keep track of your group, account, and spend category
      names using
    </h4>

    <h4 style={{ marginLeft: '40px' }} className="p-mt-0 p-mb-3">
      ALL UPPERCASE LETTERS.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      That just makes it easier for its little brain to remember things.
    </h4>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default UppercaseLetters;
