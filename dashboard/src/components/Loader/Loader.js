import React from "react";
import "./Loader.css";
import videost from "./start.mp4"

const Loader = () => {
  return (

        <div className="loader">
                <video src={videost} autoPlay loop muted></video>
                </div>

        /*
    <div className="loader">
      <div className="svg-wrapper">
        <svg height="600" viewBox="0 0 1960 1000">
        <defs>
            <linearGradient id="ttb" x1="0" >
              <stop offset="100%" stopOpacity="2" stopColor="#333">
                <animate
                  attributeName="offset"
                  values="0;1;1;0"
                  repeatCount="indefinite"
                  repeatDur="05:00"
                  dur="4s"
                  begin="0s"
               
                />
              </stop>
              <stop offset="100%" stopOpacity="1" stopColor="#E0E0E0">
                <animate
                  attributeName="offset"
                  values="0;1;1;0"
                  repeatCount="indefinite"
                  repeatDur="05:00"
                  dur="4s"
                  begin="0s"
                   
                />
              </stop>
            </linearGradient>
          </defs>
                <path fill="url(#ttb)" transform="translate(810,510)" d="m0 0h280l4 2v6l-3 2h-6v179l-3 3h-33l-3-4v-178h-19v132l-2 2h-34l-2-2v-132h-20v224l-4 2h-30l-4-3v-223h-19v275l-2 3h-35l-2-4v-274h-19v84l-2 2h-34l-2-2v-84h-6l-4-3 1-5z"  />
                <path transform="translate(1045,288)" d="m0 0h14l19 3 12 4 16 8 10 7 10 9 9 10 7 11 6 12 5 15 2 12v24l-3 15-5 14h-189l-5-12-3-14-1-11v-10l3-19 5-15 7-14 9-12 8-9 14-11 19-10 17-5z" fill="#fff"/>
                <path transform="translate(1045,288)" d="m0 0h14l19 3 12 4 16 8 10 7 10 9 9 10 7 11 6 12 5 15 2 12v24l-3 15-5 14h-189l-5-12-3-14-1-11v-10l3-19 5-15 7-14 9-12 8-9 14-11 19-10 17-5zm-1 11-17 3-13 5-13 7-10 8-7 6-10 13-8 16-5 16-1 6v25l4 17 1 1h62l5-10 5-5 8-4 9-1 9 1 8-9 11-14 13-16v-2l6-1 3 2-1 6-14 17-11 14-7 9 7 13h62l4-14 1-8v-18l-3-15-5-14-8-14-8-10-9-9-15-10-16-7-12-3-7-1z" fill="#000002"/>
                <path transform="translate(1043,309)" d="m0 0h17l16 3 15 6 12 8 12 11 9 13 6 13 4 15 1 14-3 4h-5l-3-4-2-17-5-15-9-14-11-11-13-8-10-4-8-2-9-1h-11l-15 3-12 5-10 6-11 10-9 14-5 11-3 16-1 9-2 2-7-1-1-2v-12l4-17 8-16 7-10 11-11 14-9 14-6z" fill="#010103"/>
                <path transform="translate(716,380)" d="m0 0h15l9 25 3 7 11-32h15l1 4 3 41v6h-15l-1-23-8 24-13-1-4-10-4-13-1 23-14 1-1-3 3-43z" fill="#262262"/>
                <path transform="translate(800,379)" d="m0 0h12l8 3 5 4 4 6 2 7v14l-4 9-4 5-7 4-4 1h-13l-9-4-7-8-2-5-1-13 2-9 6-8 5-4z" fill="#262262"/>
                <path transform="translate(984,445)" d="m0 0h12l8 3 6 5 4 7 1 4v16l-5 10-6 5-7 3h-14l-9-4-7-8-2-6v-17l5-10 6-5z" fill="#262262"/>
                <path transform="translate(713,446)" d="m0 0h26l10 4 6 7 3 10v9l-3 10-6 7-9 4-8 1h-18l-1-1z" fill="#262262"/>
                <path transform="translate(1126,446)" d="m0 0h26l8 3 5 4 5 10 1 5v7l-3 10-5 7-10 5-8 1h-18l-1-1z" fill="#262262"/>
                <path transform="translate(918,446)" d="m0 0h29l6 4 3 4v10l-5 7 6 5 1 2v10l-6 7-5 2-8 1h-20l-1-1z" fill="#262262"/>
                <path transform="translate(839,380)" d="m0 0h14l7 10 9 16 1-26h14v51l-2 1-12-1-7-10-9-16-1 26-13 1-1-1z" fill="#262262"/>
                <path transform="translate(1076,446)" d="m0 0h27l8 4 4 5 1 3v9l-3 6-3 3 2 6 7 14v2h-16l-4-8-4-9-4-1v17l-1 1h-13l-1-1z" fill="#262262"/>
                <path transform="translate(863,446)" d="m0 0h15v19h14v-19h15v52h-14l-1-1v-20h-14v20l-1 1h-14z" fill="#262262"/>
                <path transform="translate(779,446)" d="m0 0h16l14 41 3 10-1 1h-14l-3-8v-2h-14l-2 9-1 1h-14l-1-2 12-36z" fill="#262262"/>
                <path transform="translate(1037,446)" d="m0 0h16l14 43 2 5v4h-14l-4-9h-13l-4 9h-14l2-9 14-42z" fill="#262262"/>
                <path transform="translate(907,380)" d="m0 0h16l4 10 13 39-1 3-14-1-3-8h-13l-3 8-15 1 2-9z" fill="#262262"/>
                <path transform="translate(831,445)" d="m0 0h12l9 3v12l-5-1-7-2h-8l1 5 15 8 5 6 1 9-4 8-4 3-6 2h-16l-7-2v-13l9 3h10l2-1v-5l-6-2-11-6-4-7v-9l3-5 5-4z" fill="#262262"/>
                <path transform="translate(986,457)" d="m0 0h8l5 5 2 7-1 10-3 5-3 2h-9l-5-6-1-5v-7l3-8z" fill="#fff"/>
                <path transform="translate(802,391)" d="m0 0h8l5 5 1 3v14l-4 6-2 1h-9l-5-6-1-3v-11l3-6z" fill="#fff"/>
                <path transform="translate(729,457)" d="m0 0 7 1 6 5 1 3v11l-4 7-5 2h-6v-28z" fill="#fff"/>
                <path transform="translate(1141,457)" d="m0 0 8 1 5 4 2 5v9l-3 6-3 3-9 1z" fill="#fff"/>
                <path transform="translate(1047,412)" d="m0 0h10l7 4 2 3v3h-28l2-5 5-4z" fill="#fff"/>
                <path transform="translate(1091,457)" d="m0 0h6l4 3v6l-4 3h-6z" fill="#fff"/>
                <path transform="translate(933,477)" d="m0 0h8l3 3-1 5-2 1h-8z" fill="#fff"/>
                <path transform="translate(1044,460)" d="m0 0 2 3 3 14h-9z" fill="#fff"/>
                <path transform="translate(787,460)" d="m0 0h1l3 13v4h-8l2-10z" fill="#fff"/>
                <path transform="translate(915,394)" d="m0 0 2 4 3 13h-9z" fill="#fff"/>
                <path transform="translate(933,457)" d="m0 0h7l2 3-1 4-3 2h-5z" fill="#fff"/>

                        
          
        </svg>
      </div>
    </div>
    */
  );
};

export default Loader;
