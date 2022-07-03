import '../styles/main.css'

const SocialMedia = ({link, name}) => {
    
    return (
      <div className='block-social-media'>
        <div className='circle'></div>
        <a className="social-media" href={link} title={name}>
          {name}
        </a>
      </div>
    );
}

export default SocialMedia