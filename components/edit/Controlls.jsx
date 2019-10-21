import { useState } from 'react';
import UIKit from 'uikit';

const Controlls = ({ banner, handleSave, handleDelete }) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveHandler = async () => {
    setIsSaving(true);
    handleSave();
  }

  const deleteHandler = () => {
    if (typeof window !== 'undefined') {
      UIkit.modal.confirm('Are you sure you want to delete this banner? You will not be able to get it back.').then(async () => {
        handleDelete()
      }, function () {
          console.log('Rejected.')
      });
    }
  }

  return (
    <div style={{display:'flex', justifyContent:'space-between', marginTop: '2rem'}}>
      <h2 className="uk-text-bold">{ banner.name }</h2>
        <div className="save">
          <p uk-margin="true">
            <button onClick={saveHandler} className="uk-button uk-button-primary" style={{marginRight:'0.5rem', borderRadius:'0.1875rem'}}>
              { isSaving ? 'Saving...' : 'Save' }
            </button>
            <button onClick={deleteHandler} className="uk-button uk-button-danger" style={{borderRadius:'0.1875rem'}}>Delete</button>
          </p>
        </div>
    </div>
  )
}

export default Controlls;
