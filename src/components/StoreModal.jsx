import React, { useState, useRef, useCallback } from 'react';
import '../css/StoreScreen.css';
import '../css/StoreModal.css';

function StoreModal(props) {
  console.info('storemodal props', props);
  const slotRef = useRef();
  const [slotSelected, setSlotSelected] = useState(props.itemSlots.indexOf(props.itemSlots.filter(slot => !slot.item)[0]));
  let agreeLabel = 'BUY';
  let cancelLabel = 'NEVER MIND';
  let cost = props.selectedItem ? props.selectedItem.cost : undefined;

  const flashSlotSelect = useCallback(() => {
    console.log(slotRef)
    slotRef.current.style.transform = 'scale(1.05)';
    setTimeout(() => {
      slotRef.current.style.transform = 'scale(1)';
    }, 200);
    setTimeout(() => {
      slotRef.current.style.transform = 'scale(1.05)';
    }, 400);
    setTimeout(() => {
      slotRef.current.style.transform = 'scale(1)';
    }, 600);
  }, [slotRef, slotSelected])
  const selectSlot = (newSlot) => {
    setSlotSelected(newSlot);
    props.onSelectSlot(newSlot);
  }
  console.info('storemodal slotSelected', slotSelected)
  return (
    <div id='store-modal' className={props.selectedItem && 'showing'}>
      {props.selectedItem &&
        <>
          <div id='store-modal-message'>
            <div>Buy</div>
            <div style={{ color: 'yellow' }}>{props.selectedItem.displayName}</div>
            <div>for ${cost}?</div>
          </div>
          {props.selectedItem.consumable &&
            <div ref={slotRef} id='slot-select'>
              Choose slot:
              <div>
              {props.itemSlots.map((slot, i) => {
                console.info(slot, i, 'slot');
                if (slot.item) {
                  return (
                    <div key={slot.item.description} id={`item-slot-${i + 1}`} onPointerDown={() => selectSlot(i)} className={i !== slotSelected ? 'item-slot' : 'item-slot selected'}>
                      <img src={slot.item.imgSrc} />
                      <div className='quantity-label'>{slot.item.uses}</div>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} id={`empty-slot-${i + 1}`} onPointerDown={() => selectSlot(i)} className={i !== slotSelected ?  'item-slot empty' : 'item-slot empty  selected'}>
                      <div className="label">EMPTY</div>
                    </div>
                  );
                }
              })}
            </div>
            </div>
          }
        {props.selectedItem.consumable ?
          <div className='button-area'>
            <button id='agree-button' onPointerDown={slotSelected > -1 ? props.onClickBuyButton : flashSlotSelect} className={`modal-button${slotSelected > -1 ? '' : ' unavailable'}`}>{agreeLabel}</button>
            <button id='cancel-button' onPointerDown={props.onClickCancelButton} className='modal-button'>{cancelLabel}</button>
          </div>
          :
          <div className='button-area'>
            <button id='agree-button' onPointerDown={props.onClickBuyButton} className={`modal-button`}>{agreeLabel}</button>
            <button id='cancel-button' onPointerDown={props.onClickCancelButton} className='modal-button'>{cancelLabel}</button>
          </div>
        }
        </>
      }
    </div>
  );
}
function areEqual(prevProps, nextProps) {
  // return prevProps.selectedItem === nextProps.selectedItem && prevProps.showing === nextProps.showing && prevProps.itemSlots === nextProps.itemSlots;
}

// export default React.memo(StoreModal, areEqual);
export default StoreModal;
