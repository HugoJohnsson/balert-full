import { useState, useEffect } from 'react';
import Layout from '../../components/Layout'
import Link from 'next/link';
import Navbar from '../../components/dashboard/Navbar';
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { withAuthSync, getToken, auth } from '../../utils/auth'
import { getUserId } from '../../utils/user';
import dynamic from 'next/dynamic';
import BannerLiveView from '../../components/create/BannerLiveView';

import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';

const Controlls = dynamic(import('../../components/edit/Controlls'), {
  ssr: false
})

const Edit = ({ banner }) => {
  const [name, setName] = useState(banner.name);
  const [text, setText] = useState(banner.text);
  const [colorHex, setColorHex] = useState(banner.backgroundColor);
  const [textColorHex, setTextColorHex] = useState(banner.textColor);
  const [localhost, setLocalhost] = useState(banner.localhost);
  const [isSaving, setIsSaving] = useState(false);
  const [dismissable, setDismissable] = useState(banner.dismissable);

  const [hasLink, setHasLink] = useState(banner.hasLink);
  const [linkText, setLinkText] = useState(banner.linkText);
  const [linkColor, setLinkColor] = useState(banner.linkColor);
  const [linkTo, setLinkTo] = useState(banner.linkTo);
  const [openLinkInNewWindow, setOpenLinkInNewWindow] = useState(banner.openLinkInNewWindow);

  const [selectedFont, setSelectedFont] = useState(banner.fontFamily);
  const [fontSize, setFontSize] = useState(banner.fontSize);

  const handleSave = async () => {
    setIsSaving(true);

    const token = getToken();
    let fontUrl = '';

    if (selectedFont === 'Lexend Deca') {
      fontUrl = 'https://fonts.googleapis.com/css?family=Lexend+Deca:400italic,400,300,700';
    } else {
      fontUrl = `https://fonts.googleapis.com/css?family=${selectedFont}&display=swap`;
    }

    const res = await fetch(`http://localhost:3600/banners/${banner._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: name,
        text: text,
        backgroundColor: colorHex,
        textColor: textColorHex,
        fontFamily: selectedFont,
        fontSize: fontSize,
        hasLink: hasLink,
        linkText: linkText,
        linkColor: linkColor,
        linkTo: linkTo,
        openLinkInNewWindow: openLinkInNewWindow,
        localhost: localhost,
        dismissable: dismissable,
        fontUrl: fontUrl,
      })
    });

    const data = await res.json();
    if (!data.error) {
      Router.push('/dashboard');
    } else {
      alert('Something unexpected happened')
    }
  }

  const handleDelete = async () => {
    const token = getToken();
    const res = await fetch(`http://localhost:3600/banners/${banner._id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await res.json();
    if (!data.error) {
      Router.push('/dashboard');
    } else {
      alert('Something unexpected happened')
    }
  }
  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  const [displayBackgroundColorPicker, setDisplayBackgroundColorPicker] = useState(false);
  const [displayTextColorPicker, setDisplayTextColorPicker] = useState(false);
  const [displayLinkColorPicker, setDisplayLinkColorPicker] = useState(false);

  const handleBackgroundColorChangeComplete = (e) => {
    setColorHex(e.color);
  }

  const handleTextColorChangeComplete = (e) => {
    setTextColorHex(e.color);
  }

  const handleLinkColorChangeComplete = (e) => {
    setLinkColor(e.color);
  }

  return (
    <Layout title="Edit banner">
      <Navbar/>
      <BannerLiveView
        fontFamily={selectedFont}
        fontSize={fontSize}
        text={text}
        backgroundColor={colorHex}
        textColor={textColorHex}
        hasLink={hasLink}
        linkText={linkText}
        linkColor={linkColor}
        linkTo={linkTo}
        openLinkInNewWindow={openLinkInNewWindow}
        dismissable={dismissable}
        />
      <section className="uk-section uk-section-muted create-section" style={{height:'170vh'}}>
  			<div className="uk-container">
          <Controlls banner={banner} handleSave={handleSave} handleDelete={handleDelete}/>
          <form>
            <div className="settings" style={{marginTop:'4rem'}}>
                <fieldset className="uk-fieldset">

                    <legend className="uk-legend">Settings</legend>

                    <div className="uk-margin">
                        <label className="uk-form-label">Name:</label>
                        <input value={name} onChange={e => setName(e.target.value)} className="uk-input" type="text" placeholder="Choose a name for your banner" style={{borderRadius:'0.1875rem'}}/>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label">Text:</label>
                        <input value={text} onChange={e => setText(e.target.value)} className="uk-input" type="text" placeholder='Text (for example: "Use code SUMMER20 for 20% off your order!")' style={{borderRadius:'0.1875rem'}}/>
                    </div>

                    <div className="uk-margin">
                      <div style={{display:'flex', marginLeft:'auto'}}>
                        <label className="uk-switch">
                          <input checked={dismissable} onChange={() => setDismissable(!dismissable)} type="checkbox"/>
                          <div className="uk-switch-slider"></div>
                        </label>
                        <span style={{marginLeft:'0.3rem'}}>Dismissable</span>
                      </div>
                    </div>

                    <div className="uk-margin">
                      <div style={{display:'flex', marginLeft:'auto'}}>
                        <label className="uk-switch">
                          <input checked={localhost} onChange={() => setLocalhost(!localhost)} type="checkbox"/>
                          <div className="uk-switch-slider"></div>
                        </label>
                        <span style={{marginLeft:'0.3rem'}}>Should work on localhost</span>
                      </div>
                    </div>

                </fieldset>
                <fieldset className="uk-fieldset" style={{marginTop:'3rem'}}>

                   <legend className="uk-legend">Styles</legend>

                     <div className="uk-margin">
                         <label className="uk-form-label">Background:</label>
                         <input value={colorHex} onChange={e => setColorHex(e.target.value)} onClick={() => setDisplayBackgroundColorPicker(true)} className="uk-input" type="text" placeholder="Example: #f8f8f8" style={{borderRadius:'0.1875rem'}}/>
                           { displayBackgroundColorPicker ? <div style={ popover }>
                              <div style={ cover } onClick={() => setDisplayBackgroundColorPicker(false)}/>
                              <ColorPickerPanel defaultColor={colorHex} enableAlpha={false} onChange={handleBackgroundColorChangeComplete} mode="RGB" />
                            </div> : null }
                     </div>

                     <div className="uk-margin">
                         <label className="uk-form-label">Text color:</label>
                         <input value={textColorHex} onChange={e => setTextColorHex(e.target.value)} onClick={() => setDisplayTextColorPicker(true)} className="uk-input" type="text" placeholder="Example: #f8f8f8" style={{borderRadius:'0.1875rem'}}/>
                           { displayTextColorPicker ? <div style={ popover }>
                              <div style={ cover } onClick={() => setDisplayTextColorPicker(false)}/>
                            <ColorPickerPanel defaultColor={textColorHex} enableAlpha={false} onChange={handleTextColorChangeComplete} mode="RGB" />
                            </div> : null }
                     </div>

                   <div className="uk-margin">
                       <label className="uk-form-label">Font:</label>
                         <select style={{fontFamily:selectedFont, borderRadius:'0.1875rem'}} class="uk-select" value={selectedFont} onChange={e => setSelectedFont(e.target.value)}>
                            <option value="Lexend Deca">Lexend Deca</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                            <option value="Oswald">Oswald</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Raleway">Raleway</option>
                            <option value="Lora">Lora</option>
                        </select>
                   </div>

                   <div className="uk-margin">
                       <label className="uk-form-label">Font size:</label>
                         <select style={{borderRadius:'0.1875rem'}} class="uk-select" value={fontSize} onChange={e => setFontSize(e.target.value)}>
                            <option value="12px">12px</option>
                            <option value="14px">14px</option>
                            <option value="16px">16px</option>
                            <option value="20px">20px</option>
                            <option value="24px">24px</option>
                            <option value="28px">28px</option>
                            <option value="32px">32px</option>
                            <option value="36px">36px</option>
                        </select>
                   </div>

                </fieldset>

                <fieldset className="uk-fieldset" style={{marginTop:'4rem'}}>

                    <legend className="uk-legend">Add a link</legend>

                      <div className="uk-margin">
                        <div style={{display:'flex', marginLeft:'auto'}}>
                          <label className="uk-switch">
                            <input checked={hasLink} onChange={() => setHasLink(!hasLink)} type="checkbox"/>
                            <div className="uk-switch-slider"></div>
                          </label>
                          <span style={{marginLeft:'0.3rem'}}>Enabled</span>
                        </div>
                      </div>

                      <div className="uk-margin">
                        <div style={{display:'flex', marginLeft:'auto'}}>
                          <label className="uk-switch">
                            <input disabled={!hasLink} checked={openLinkInNewWindow} onChange={() => setOpenLinkInNewWindow(!openLinkInNewWindow)} type="checkbox"/>
                            <div className="uk-switch-slider"></div>
                          </label>
                          <span style={{marginLeft:'0.3rem'}}>Open link in a new tab (if you click on the link here in development this will always be true.)</span>
                        </div>
                      </div>

                    <div className="uk-margin">
                        <label className="uk-form-label">Link text:</label>
                        <input disabled={!hasLink} value={linkText} onChange={e => setLinkText(e.target.value)} className="uk-input" type="text" placeholder='Add a text for your link' style={{borderRadius:'0.1875rem'}}/>
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label">Link goes to:</label>
                        <input disabled={!hasLink} value={linkTo} onChange={e => setLinkTo(e.target.value)} className="uk-input" type="text" placeholder='Add a link (it must be the whole link, including "http://" or "https://")' style={{borderRadius:'0.1875rem'}}/>
                        {
                          hasLink && linkTo !== ''?
                            <span className="uk-text-small">Try it: <a href={linkTo} target="_blank">{linkTo}</a> </span>
                          :
                          ''
                        }
                    </div>

                    <div className="uk-margin">
                        <label className="uk-form-label">Link color:</label>
                        <input disabled={!hasLink} value={linkColor} onChange={e => setLinkColor(e.target.value)} onClick={() => setDisplayLinkColorPicker(true)} className="uk-input" type="text" placeholder="Example: #f8f8f8" style={{borderRadius:'0.1875rem'}}/>
                          { displayLinkColorPicker ? <div style={ popover }>
                             <div style={ cover } onClick={() => setDisplayLinkColorPicker(false)}/>
                           <ColorPickerPanel defaultColor={linkColor} enableAlpha={false} onChange={handleLinkColorChangeComplete} mode="RGB" />
                           </div> : null }
                    </div>

                </fieldset>
            </div>
          </form>
  			</div>
  		</section>
    </Layout>
  )
}

Edit.getInitialProps = async (ctx) => {
  const bannerId = ctx.query.bannerId;
  const token = auth(ctx);
  const res = await fetch(`http://localhost:3600/banners/${bannerId}`, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  const banner = await res.json();
  return { banner }
}

export default withAuthSync(Edit);
