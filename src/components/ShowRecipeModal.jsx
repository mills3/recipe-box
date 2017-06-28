import React from 'react';
import Button from './Button';

const ShowModal = (props) => {
  const toggle = props.toggle ? 'toggle' : '';

  let listItems = '';
  if(props.currentIng && props.toggle) {
    listItems = props.currentIng.map((item, ind) => <li key={ind}>{item}</li>);
  }

  return (
    <div className={`showModal ${toggle}`}>
      <p>{props.currentName}</p>
      <ul>{listItems}</ul>
      <Button className="btn" name="Edit" handleClick={props.editClick} />
      <Button className="btn" name="Close" handleClick={props.closeClick} />
      <Button className="btn" name="Delete" handleClick={props.deleteClick} />
    </div>
  );
}

export default ShowModal;
