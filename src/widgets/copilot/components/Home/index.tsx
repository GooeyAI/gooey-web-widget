import PaperAirplaneIcon from "src/assets/SvgIcons/PaperAirplaneIcon";
import IconButton from "src/components/shared/Buttons/IconButton";

import { addInlineStyle } from "src/addStyles";
import style from "./home.scss?inline";
addInlineStyle(style);

const Home = () => {
  return (
    <div className="gp-16 home-container overflow-scroll h-100">
      {/* Logo Top */}
      <img
        src="https://static.wixstatic.com/media/7f7b6d_22aa90a7a4f3458587043b15a0ab369a~mv2.png/v1/crop/x_0,y_1,w_1600,h_710/fill/w_124,h_55,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo%20black.png"
        style={{ width: "100px" }}
      />
      <div className="home-content-container">
        {/* Intro Text */}
        <div className="gmb-36 gpl-12">
          <p className="font_24_600"> Howdy 👋</p>
          <p className="font_24_600 text-darkGrey"> How can we help?</p>
        </div>

        {/* Send us a message box */}
        <div className="bg-white br-large gp-16 gmt-16 d-flex justify-between align-center">
          <div>
            <p className="font_16_600">Send us a message</p>
            <p className="font_12_400 gmt-8 text-darkgrey">
              We typically reply within a minute
            </p>
          </div>

          <IconButton variant="filled">
            <PaperAirplaneIcon
              style={{ width: "24px" }}
              className="hover-text-secondary"
            />
          </IconButton>
        </div>

        {/* Resources */}
        <div className="b-1 br-large gmt-36 bg-white bx-shadowB">
          <p className="font_12_600 gm-16">Helpful resources</p>

          <div>
            <div className="b-btm-1 b-top-1 gmt-6 gp-16 cr-pointer hover-bg-primary cr-pointer hover-underline">
              <a target="_ablank" href="https://gooey.ai/explore">
                <p className="font_16_400">Explore Gooey AI</p>
              </a>
            </div>
            <div className="b-btm-1 gp-16 hover-underline hover-bg-primary cr-pointer">
              <a target="_ablank" href="https://gooey.ai/docs">
                <p className="font_16_400">Documentation</p>
              </a>
            </div>
            <div className=" gp-16 hover-underline hover-bg-primary cr-pointer">
              <a target="_ablank" href="https://gooey.ai/contact">
                <p className="font_16_400">Contact Us</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
