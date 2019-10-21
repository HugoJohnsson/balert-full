

const BannerLiveView = ({ fontFamily, fontSize, text, backgroundColor, textColor, hasLink, linkText, linkColor, linkTo, openLinkInNewWindow, dismissable }) => (
  <div style={{
      position:'fixed',
      fontFamily:fontFamily,
      width: '100%',
      padding:'10px 40px 10px 10px',
      color:textColor,
      textAlign:'center',
      backgroundColor:backgroundColor,
      zIndex: '9999',
      fontSize:fontSize
    }}>
    {
      text
    }
    {
      hasLink && linkText !== '' ?
        text !== '' ?
          <a href={linkTo} target="_blank" style={{marginLeft: '10px', color: linkColor}}>{linkText}</a>
        :
          <a href={linkTo} target="_blank" style={{marginLeft: '0', color: linkColor}}>{linkText}</a>
      :
        ''
    }
    {
      dismissable ?
        <span style={{cursor:'pointer',position:'absolute',color:'#fff',right:'70px',padding:'10px 0px', top: '0px'}}>x</span>
      :
        ''
    }
  </div>
)

export default BannerLiveView;
