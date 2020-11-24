import React from 'react';
import './helpscreen.css';

// style={{ height: '370px', maxHeight: '370px', overflowY: 'auto' }}

const Possibilities = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Possibilities
    </h3>
    <h4 className="p-mt-0 p-mb-3">Textotals just tracks numbers.</h4>

    <h4 className="p-mt-0 p-mb-3">
      You can track almost anything, like time or money.
    </h4>

    <h4 style={{ marginBottom: '0px' }} className="p-mt-0">
      For example, these actions below track time spent reading.
    </h4>

    <ul>
      <li>the account belongs to a group named "SCHOOL"</li>
      <li>the account name is "READING"</li>
      <li>the numbers are hours</li>
      <li>the category names ("1984" and "war and peace") are book titles</li>
    </ul>

    <div style={{ marginTop: '-10px' }}>
      <div className="action-item-action">school set 24 reading</div>
      <div className="action-item-action">
        school spend 1.5 on 1984 from reading
      </div>
      <div className="action-item-action">
        school spend 3.5 on war and peace from reading
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default Possibilities;
