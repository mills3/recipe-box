import React from 'react';
import Button from './Button';

const AddRecipeModal = (props) => {
  const toggle = props.toggle ? 'toggle' : '';
  const highlight = props.missingInfo ? 'highlight' : '';
  return (
    <div className={`addModal ${toggle}`}>
      <p>Add A Recipe</p>
      <input className={`${highlight}`} type="text" placeholder="name..." onChange={props.getName} value={props.clearName}/>
      <textarea className={`${highlight}`} type="text" placeholder="ingredients, comma seperated..." onChange={props.getIng} value={props.clearIng}/>
      <Button className="btn" name="Cancel" handleClick={props.cancelClick}/>
      <Button className="btn" name="Confirm" handleClick={props.confirmClick}/>
    </div>
  );
}

export default AddRecipeModal;
