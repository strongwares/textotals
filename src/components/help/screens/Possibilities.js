import React from 'react';
import './helpscreen.css';

// style={{ height: '370px', maxHeight: '370px', overflowY: 'auto' }}

const Possibilities = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Possibilities
    </h3>
    <h4 className="p-mt-0 p-mb-3">Textotals just tracks numbers.</h4>

    <h4 className="p-mt-0 p-mb-3">You can track almost anything, like time or eating.</h4>

    <h4 style={{ marginBottom: '0px' }} className="p-mt-0">
      For example, these actions track time spent reading:
    </h4>

    <div style={{ marginTop: '5px' }}>
      <div className="action-item-action">school set 24 reading</div>
      <div className="action-item-action">
        school spend 1.5 on 1984 from reading
      </div>
      <div className="action-item-action">
        school spend 3.5 on war and peace from reading
      </div>
    </div>
    <ul>
      <li>the account name is "READING"</li>
      <li>the account belongs to a group named "SCHOOL"</li>
      <li>the numbers are hours</li>
      <li>the "READING" account in the "SCHOOL" group starting total is 24 hours</li>
      <li>the category names "1984" and "war and peace" are book titles</li>
      <li>the Textotals Totals tab will show you spent 1.5 hours on "1984" and 3.5 hours on "war and peace"</li>
      <li>you can use the "school clear" action at any time to start over</li>
    </ul>

    <h4 style={{ marginBottom: '0px' }} className="p-mt-0">
      And these actions track weight watching point totals:
    </h4>

    <div style={{ marginTop: '5px' }}>
      <div className="action-item-action">points set 24</div>
      <div className="action-item-action">
        points spend 5 on breakfast
      </div>
      <div className="action-item-action">
        points spend 3 on mid day snack
      </div>
    </div>
    <ul>
      <li>the group name is "POINTS</li>
      <li>the account name will be "MAIN"</li>
      <li>the numbers are food point values</li>
      <li>the "MAIN" account in the "POINTS" group starting total is 24 points</li>
      <li>the category name "breakfast" is the breakfast you ate worth 5 points</li>
      <li>the category name "mid day snack" is something you ate worth 3 points</li>
      <li>the Textotals Accounts tab will show you have 16 left on the "POINTS" group "MAIN" account</li>
      <li>the Textotals Totals tab will show you spent 5 on "breakfast" and 3 on "mid day snack"</li>
      <li>you can use the "points clear" action at any time to start over</li>
    </ul>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default Possibilities;
