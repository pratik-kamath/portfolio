import UseContext from '../Context'
import { useContext, useRef, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import Mail from '../assets/mail.png'
import '../css/MailFolder.css'


function MailFolder() {

  const focusName = useRef();
  const focusEmail = useRef();

  const {
    themeDragBar,
    MailExpand, setMailExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    clippyThanksYouFunction,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    iconFocusIcon,
  } = useContext(UseContext);

  // ---------------------- EMAIL JS ---------------------------------------

  // ---------------------- WEB3FORMS ---------------------------------------

  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "38d57fe2-f8c0-48d9-8a9e-7920b6b5054d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      clippyThanksYouFunction();
      alert('Thank you for your interest, will contact you back shortly!');
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  // ------------------------------------------------------------------------------

  function handleDragStop(event, data) {
    const positionX = data.x
    const positionY = data.y
    setMailExpand(prev => ({
      ...prev,
      x: positionX,
      y: positionY
    }))

  }

  function handleExpandStateToggle() {
    setMailExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setMailExpand(prevState => ({
        ...prevState,
        expand: !prevState.expand
      }));
    }
    setLastTapTime(now);
  }

  return (
    <>
      <Draggable
        axis="both"
        handle={'.folder_dragbar-mail'}
        grid={[1, 1]}
        scale={1}
        disabled={MailExpand.expand}
        bounds={{ top: 0 }}
        defaultPosition={{
          x: window.innerWidth <= 500 ? 20 : 50,
          y: window.innerWidth <= 500 ? 40 : 120,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Mail')}
      >
        <div className='folder_folder-mail'
          onClick={(e) => {
            e.stopPropagation();
            handleSetFocusItemTrue('Mail');
          }}
          style={MailExpand.expand ? inlineStyleExpand('Mail') : inlineStyle('Mail')}>
          <div className="folder_dragbar-mail"
            onDoubleClick={handleExpandStateToggle}
            onTouchStart={handleExpandStateToggleMobile}
            style={{ background: MailExpand.focusItem ? themeDragBar : '#757579' }}
          >
            <div className="folder_barname-mail">
              <img src={Mail} alt="Mail" />
              <span>Mail</span>
            </div>
            <div className="folder_barbtn-mail">
              <div onClick={!isTouchDevice ? (e) => {
                e.stopPropagation()
                setMailExpand(prev => ({ ...prev, hide: true, focusItem: false }))
                StyleHide('Mail')
              } : undefined
              }
                onTouchEnd={(e) => {
                  e.stopPropagation()
                  setMailExpand(prev => ({ ...prev, hide: true, focusItem: false }))
                  StyleHide('Mail')
                }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-mail'></p>
              </div>
              <div
                onClick={!isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-mail ${MailExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {MailExpand.expand ?
                  (
                    <div className="expand_2-mail"></div>
                  )
                  :
                  (null)}
              </div>
              <div><p className='x-mail'
                onClick={!isTouchDevice ? () => {
                  deleteTap('Mail')
                }
                  : undefined
                }
                onTouchEnd={() => deleteTap('Mail')}
              >×</p></div>
            </div>
          </div>

          <div className="file_edit_container-mail">
            <p>File<span style={{ left: '-23px' }}>_</span></p>
            <p>Edit<span style={{ left: '-24px' }}>_</span></p>
            <p>View<span style={{ left: '-32px' }}>_</span></p>
            <p>Help<span style={{ left: '-30px' }}>_</span></p>
          </div>
          <div className="folder_content-mail"
            onClick={() => iconFocusIcon('')}
            style={MailExpand.expand ?
              { height: 'calc(100svh - 100px)' }
              :
              {}
            }>

            {/* ------------------ EMAIL JS -------------------------- */}

            {/* ------------------ WEB3FORMS -------------------------- */}

            <form onSubmit={onSubmit}>

              <div className="form_container">
                <div className="to_container">
                  <div className="sendmail_icon">
                    <input className="sendmail_img_container" type="submit" value="Send"></input>
                  </div>
                  <input className="myemail_container" placeholder='pratikkamath2000@gmail.com' disabled style={{ background: '#d4d1d1' }} />
                </div>
                <div className="to_container">
                  <div className="to_icon"
                    onClick={() => focusName.current.focus()}

                  >
                    <p>Name</p>
                  </div>
                  <input className="myemail_container" type="text" name="name" required ref={focusName} style={{ background: 'white' }} />
                </div>
                <div className="to_container"
                  onClick={() => focusEmail.current.focus()}

                >
                  <div className="to_icon" >
                    <p>Email</p>
                  </div>
                  <input className="myemail_container" type="email" name="email" ref={focusEmail} style={{ background: 'white' }} />
                </div>
              </div>
              <textarea name="message" required placeholder='Enter your message here...' />
            </form>
          </div>
        </div>
      </Draggable>
    </>
  )
}

export default MailFolder