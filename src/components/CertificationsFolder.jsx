import UseContext from '../Context';
import { Fragment, useContext, useRef } from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import folderIcon from '../assets/folder.png';
import '../css/CertificationsFolder.css';

function CertificationsFolder() {

  const iconRefs = useRef([]);

  const {
    setCurrentRightClickFolder,
    refBeingClicked,
    handleMobileLongPress,
    setRightClickIcon,
    setIconBeingRightClicked,
    timerRef,
    iconContainerSize, iconImgSize, iconTextSize,
    iconScreenSize,
    key,
    dragging,
    handleOnDrag,
    handleDrop,
    CertificationsFolderRef,
    dropTargetFolder, setDropTargetFolder,
    imageMapping,
    desktopIcon,
    themeDragBar,
    CertificationsExpand, setCertificationsExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleShowMobile,
    handleShow,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,
  } = useContext(UseContext);

  function handleDragStop(event, data) {
    setCertificationsExpand(prev => ({
      ...prev,
      x: data.x,
      y: data.y,
    }));
  }

  function handleExpandStateToggle() {
    setCertificationsExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand,
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setCertificationsExpand(prevState => ({
        ...prevState,
        expand: !prevState.expand,
      }));
    }
    setLastTapTime(now);
  }

  return (
    <Draggable
      axis="both"
      handle={'.folder_dragbar'}
      grid={[1, 1]}
      scale={1}
      disabled={CertificationsExpand.expand}
      bounds={{ top: 0 }}
      defaultPosition={{
        x: window.innerWidth <= 500 ? 50 : 100,
        y: window.innerWidth <= 500 ? 50 : 120,
      }}
      onStop={(event, data) => { handleDragStop(event, data) }}
      onStart={() => { handleSetFocusItemTrue('Certifications') }}
    >
      <motion.div
        onContextMenu={() => setCurrentRightClickFolder('Certifications')}
        onTouchStart={() => setCurrentRightClickFolder('Certifications')}
        ref={CertificationsFolderRef}
        className='folder_folder'
        onClick={(e) => {
          e.stopPropagation();
          handleSetFocusItemTrue('Certifications');
        }}
        style={{
          ...(
            CertificationsExpand.expand
              ? inlineStyleExpand('Certifications')
              : inlineStyle('Certifications')
          ),
          overflow: dragging ? '' : 'hidden'
        }}
      >
        <div className="folder_dragbar"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: CertificationsExpand.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname">
            <img src={folderIcon} alt="Certifications" />
            <span>Certifications</span>
          </div>
          <div className="folder_barbtn">
            <div onClick={!isTouchDevice ? (e) => {
              e.stopPropagation();
              setCertificationsExpand(prev => ({ ...prev, hide: true, focusItem: false }));
              StyleHide('Certifications');
            } : undefined}
              onTouchEnd={(e) => {
                e.stopPropagation()
                setCertificationsExpand(prev => ({ ...prev, hide: true, focusItem: false }))
                StyleHide('Certifications')
              }}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <p className='dash'></p>
            </div>
            <div
              onClick={!isTouchDevice ? handleExpandStateToggle : undefined}
              onTouchEnd={handleExpandStateToggleMobile}
            >
              <motion.div className={`expand ${CertificationsExpand.expand ? 'full' : ''}`} />
              {CertificationsExpand.expand ? <div className="expand_2"></div> : null}
            </div>
            <div>
              <p className='x'
                onClick={!isTouchDevice ? () => deleteTap('Certifications') : undefined}
                onTouchEnd={() => deleteTap('Certifications')}
              >×</p>
            </div>
          </div>
        </div>

        <div className="file_edit_container">
          <p>File<span style={{ left: '-23px' }}>_</span></p>
          <p>Edit<span style={{ left: '-24px' }}>_</span></p>
          <p>View<span style={{ left: '-32px' }}>_</span></p>
          <p>Help<span style={{ left: '-30px' }}>_</span></p>
        </div>
        <div className="folder_content"
          onClick={() => iconFocusIcon('')}
          style={{
            height: CertificationsExpand.expand ? 'calc(100svh - 122px)' : '',
            overflow: dragging ? '' : 'hidden'
          }}
        >
          <div className='parent_item_container' key={key}>
            <div className="item_container"
              style={{
                position: dragging ? 'absolute' : '',
              }}
              onClick={(e) => {
                e.stopPropagation()
                iconFocusIcon('');
                handleSetFocusItemTrue('Certifications');
              }}
            >
              {desktopIcon.filter(icon => icon.folderId === 'Certifications').map(icon => (
                <Fragment key={icon.name}>
                  <Draggable
                    axis="both"
                    handle={'.icon'}
                    grid={[10, 10]}
                    scale={1}
                    bounds={false}
                    onStart={() => {
                      setDropTargetFolder('')
                      handleSetFocusItemTrue('Certifications')
                    }}
                    onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
                    onStop={(e) => {
                      handleDrop(e, icon.name, dropTargetFolder, icon.folderId);
                      clearTimeout(timerRef.current)
                    }}
                    key={key}
                  >
                    <div className='icon' key={icon.name}
                      style={iconContainerSize(iconScreenSize)}
                      ref={(el) => iconRefs.current[icon.name] = el}
                      onContextMenu={() => {
                        setRightClickIcon(true);
                        iconFocusIcon(icon.name);
                        setIconBeingRightClicked(icon);
                        refBeingClicked.current = iconRefs.current[icon.name]
                      }}
                      onDoubleClick={() => handleShow(icon.name)}
                      onClick={!isTouchDevice ? (e) => {
                        iconFocusIcon(icon.name);
                        e.stopPropagation();
                      } : undefined}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        handleShowMobile(icon.name);
                        iconFocusIcon(icon.name);
                        handleMobileLongPress(e, icon, 'Certifications');
                        refBeingClicked.current = iconRefs.current[icon.name]
                      }}
                    >
                      <img src={imageMapping(icon.pic)} alt='#' className={icon.focus ? 'img_focus' : ''}
                        style={iconImgSize(iconScreenSize)}
                      />
                      <p className={icon.focus ? 'p_focus' : 'p_normal'}
                        style={iconTextSize(iconScreenSize)}
                      >
                        {icon.name}
                      </p>
                    </div>
                  </Draggable>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="btm_bar_container">
          <div className="object_bar">
            <p>
              {desktopIcon.filter(icon => icon.folderId === 'Certifications').some(icon => icon.focus) ?
                '1 object(s) selected'
                :
                desktopIcon.filter(icon => icon.folderId === 'Certifications').length + ' ' + 'object(s)'
              }
            </p>
          </div>
          <div className="size_bar">
            <p>
              {(() => {
                const filteredIcons = desktopIcon.filter(icon => icon.folderId === 'Certifications');
                const totalSize = filteredIcons.reduce((total, icon) => total + icon.size, 0);
                const allNotFocused = filteredIcons.every(icon => !icon.focus);

                if (allNotFocused) {
                  return totalSize;
                } else {
                  return filteredIcons
                    .filter(icon => icon.focus)
                    .map(icon => icon.size)
                    .reduce((sum, size) => sum + size, 0);
                }
              })()} KB
            </p>
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
}

export default CertificationsFolder;
