import React from 'react';
import Button from './Button';

const EditRecipeModal = (props) => {
  const toggle = props.toggle ? 'toggle' : '';
  const {currentIng, currentName} = props;

  return (
    <div className={`editModal ${toggle}`}>
      <p>Edit This Recipe</p>
      <input type="text" value={currentName} onChange={props.getUpdatedName}/>
      <textarea value={currentIng} onChange={props.getUpdatedIng}/>
      <Button name="Cancel" handleClick={props.cancelClick} />
      <Button name="Confirm" handleClick={props.confirmEdit} />
    </div>
  );

}

export default EditRecipeModal;
