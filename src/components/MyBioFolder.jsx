import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import About from '../assets/ipng.png'
import pratikPhoto from '../assets/pratik.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [aboutTap, setAboutTap] = useState(true)
  const [siteTap, setSiteTap] = useState(false)
  const [experienceTap, setExperienceTap] = useState(false)

  const {
    themeDragBar,
    MybioExpand, setMybioExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
  } = useContext(UseContext);

  const siteStack = [
    { label: 'Frontend', chips: ['React 18', 'Vite 5', 'JavaScript'] },
    { label: 'UI / UX', chips: ['framer-motion', 'react-draggable', 'react-icons', 'CSS'] },
    { label: 'Embedded Apps', chips: ['Webamp (Winamp)', 'recharts', 'react-calendar', 'react-color'] },
    { label: 'Deploy', chips: ['GitHub Pages', 'GitHub Actions CI'] },
  ]

  const experienceRoles = [
    {
      company: 'Multifactor AI Inc',
      title: 'AI Engineer',
      dates: 'Feb 2026 – Present',
      bullet: 'Built production multi-agent code review system + tool-using GenAI agent on FastAPI / LangGraph / pgvector.',
    },
    {
      company: 'Mark Computers',
      title: 'SWE Intern',
      dates: 'Oct – Dec 2025',
      bullet: 'Engineered Fuel Retail Management System on AWS (EC2, RDS); cut manual logging errors 93%.',
    },
    {
      company: 'L&T Realty',
      title: 'SWE Intern',
      dates: 'May – Jul 2021',
      bullet: 'Trained Random Forest / GBM real estate price models from 74% → 92%; deployed full-stack on FastAPI + React.',
    },
  ]

  function handleDragStop(event, data) {
    setMybioExpand(prev => ({
      ...prev,
      x: data.x,
      y: data.y,
    }))
  }


  function handleBiotap(name) {
    setAboutTap(name === 'about');
    setSiteTap(name === 'site');
    setExperienceTap(name === 'experience');
  }

  const activeBtnStyle = {
    bottom: '2px',
    outline: '1px dotted black',
    outlineOffset: '-5px',
    borderBottomColor: '#c5c4c4',
    zIndex: '3'
  };


  return (
    <>
      <Draggable
        axis="both"
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{ top: 0 }}
        defaultPosition={{
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('About')}
      >
        <motion.div className='bio_folder'
          onClick={(e) => {
            e.stopPropagation();
            handleSetFocusItemTrue('About');
          }}
          style={MybioExpand.expand ? inlineStyleExpand('About') : inlineStyle('About')}>
          <div className="folder_dragbar"
            style={{ background: MybioExpand.focusItem ? themeDragBar : '#757579' }}
          >
            <div className="bio_barname">
              <img src={About} alt="About" />
              <span>About</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={!isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({ ...prev, hide: true, focusItem: false }))
                StyleHide('About')
              } : undefined
              }
                onTouchEnd={(e) => {
                  e.stopPropagation()
                  setMybioExpand(prev => ({ ...prev, hide: true, focusItem: false }))
                  StyleHide('About')
                }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>

              <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('About')
                    handleBiotap('about')
                  } : undefined}
                  onTouchEnd={() => {
                    deleteTap('About')
                    handleBiotap('about')
                  }}
                >×
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
            <p onClick={() => handleBiotap('about')}
              style={aboutTap ? activeBtnStyle : {}}
            >About
            </p>
            <p onClick={() => handleBiotap('site')}
              style={siteTap ? activeBtnStyle : {}}
            >This Site
            </p>
            <p onClick={() => handleBiotap('experience')}
              style={experienceTap ? activeBtnStyle : {}}
            >Experience
            </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio">
              {aboutTap && (
                <div className="bio_about_panel">
                  <div className="bio_about_card">
                    <img src={pratikPhoto} alt="Pratik Kamath" className="bio_avatar" />
                    <div className="bio_about_text">
                      <h2>Pratik Kamath</h2>
                      <p className="bio_role">AI Engineer @ Multifactor AI Inc</p>
                      <p className="bio_tagline">
                        Shipping full-stack apps and agentic systems.
                      </p>
                    </div>
                  </div>
                  <fieldset className="bio_properties_group">
                    <legend>Properties</legend>
                    <div className="bio_property_row">
                      <span className="bio_property_label">Location</span>
                      <span className="bio_property_value">Sydney, NSW</span>
                    </div>
                    <div className="bio_property_row">
                      <span className="bio_property_label">Email</span>
                      <a
                        className="bio_property_value bio_link"
                        href="mailto:pratikkamath2000@gmail.com"
                        onClick={(e) => e.stopPropagation()}
                      >pratikkamath2000@gmail.com</a>
                    </div>
                    <div className="bio_property_row">
                      <span className="bio_property_label">LinkedIn</span>
                      <a
                        className="bio_property_value bio_link"
                        href="https://www.linkedin.com/in/pratik-kamath/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >linkedin.com/in/pratik-kamath</a>
                    </div>
                    <div className="bio_property_row">
                      <span className="bio_property_label">GitHub</span>
                      <a
                        className="bio_property_value bio_link"
                        href="https://github.com/pratik-kamath"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >github.com/pratik-kamath</a>
                    </div>
                  </fieldset>
                </div>
              )}

              {siteTap && (
                <div className="bio_site_panel">
                  <p className="bio_site_intro">
                    A Windows&nbsp;95&ndash;themed interactive portfolio. Drag windows around the
                    desktop, browse projects in folders, and play with embedded retro apps like
                    Winamp and Minesweeper. Built as a creative way to showcase my work in a
                    nostalgic UI rather than a static page.
                  </p>
                  <div className="bio_skills_panel">
                    {siteStack.map(cat => (
                      <div key={cat.label} className="bio_skill_row">
                        <p className="bio_skill_label">{cat.label}</p>
                        <div className="bio_skill_chips">
                          {cat.chips.map(chip => (
                            <span key={chip} className="bio_skill_chip">{chip}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="bio_site_source">
                    Source:{' '}
                    <a
                      className="bio_link"
                      href="https://github.com/pratik-kamath/portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      github.com/pratik-kamath/portfolio
                    </a>
                  </p>
                </div>
              )}

              {experienceTap && (
                <div className="bio_experience_panel">
                  {experienceRoles.map(role => (
                    <div key={role.company} className="bio_role_card">
                      <div className="bio_role_header">
                        <span className="bio_role_company">{role.company}</span>
                        <span className="bio_role_dates">{role.dates}</span>
                      </div>
                      <p className="bio_role_title">{role.title}</p>
                      <p className="bio_role_bullet">{role.bullet}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}

export default MyBioFolder
