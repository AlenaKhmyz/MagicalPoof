import React from "react";
import "./styles/main.css";
import magicalpoof from "./image/logo.png";
import { useExplosion } from "./components/hooks";
import SocialMedia from "./components/SocialMedia";

const Main = () => {
  useExplosion();
  const name = ''
  const link = ''

  return (
    <div className="main">
      {/* <div id="canvas" className="magical"></div> */}
      <img src={magicalpoof} className="logo" />
      <iframe
        className='player'
        src="https://player.twitch.tv/?channel=smarty_69&parent=www.example.com"
        autoplay="true"
        frameborder="0"
        allowfullscreen="true"
        scrolling="yes"
        height="240"
        width="620"
      ></iframe>
      <hr className="line"></hr>
      <h3 className="title">My contact</h3>
      <div className="list-social-media">
        <SocialMedia link="https://t.me/magicalpoof" name="Telegram" />
        <SocialMedia link="https://vk.com/yenneferonelove" name="Vkontakte" />
        <SocialMedia link="https://www.twitch.tv/magical_poof" name="Twitch" />
        <SocialMedia
          link="https://instagram.com/magical_poof?igshid=YmMyMTA2M2Y="
          name="Instagram"
        />
      </div>
      <hr className="line"></hr>
    </div>
  );
};

export default Main;
