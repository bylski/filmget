
import React from 'react';


const BrandIcon:React.FC<{className: string}> = (props) => {
    return (
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 210.233 210.233"
        className={props.className}
        fill="#3a86ff"

      >
  
  
  <defs>
        <linearGradient id="Gradient1" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a86ff" />
          <stop offset="50%" stopColor="#8338ec" />
          <stop offset="100%" stopColor="#ff006e" />
        </linearGradient>
      </defs> 
  
  
        <path
        // transition={{ duration: 1.2, type: 'spring'}}
        // initial={{ rotate: '360deg'}}
        // animate={{ rotate: '0deg' }}
        fill="url(#Gradient1)" stroke="url(#Gradient1)" strokeWidth="1"  strokeLinejoin="round" strokeMiterlimit="10"
          d="M210.209,185.862c-0.239-2.175-2.176-3.761-4.38-3.504c-32.059,3.517-44.853-33.426-45.384-35.001
                  c-0.135-0.403-0.371-0.734-0.61-1.059c6.817-12.251,10.733-26.328,10.733-41.315c0-47.025-38.257-85.283-85.283-85.283
                  C38.259,19.7,0,57.959,0,104.983c0,47.024,38.257,85.283,85.283,85.283c28.642,0,53.972-14.238,69.445-35.959
                  c4.734,10.535,19.118,36.226,46.808,36.226c1.674,0,3.397-0.095,5.167-0.292C208.88,190.001,210.449,188.039,210.209,185.862z
                   M85.283,182.333c-42.65,0-77.35-34.699-77.35-77.35s34.7-77.35,77.35-77.35c42.65,0,77.35,34.699,77.35,77.35
                  S127.933,182.333,85.283,182.333z M33.736,86.705c3.297,2.671,7.267,3.969,11.214,3.969c5.206,0,10.366-2.258,13.891-6.608
                  c6.19-7.651,5.009-18.911-2.638-25.103c-3.703-3-8.336-4.379-13.101-3.881c-4.741,0.498-9.006,2.812-12.008,6.518
                  c-3.002,3.706-4.377,8.357-3.881,13.099C27.712,79.44,30.029,83.703,33.736,86.705z M37.261,66.591
                  c1.666-2.059,4.036-3.345,6.67-3.622c0.353-0.037,0.705-0.054,1.054-0.054c2.262,0,4.439,0.767,6.225,2.212
                  c4.246,3.44,4.904,9.696,1.464,13.945c-3.44,4.251-9.704,4.906-13.949,1.466c-2.057-1.668-3.347-4.036-3.622-6.67
                  C34.828,71.234,35.592,68.65,37.261,66.591z M113.468,134.565c-4.509-1.551-9.347-1.257-13.635,0.835c-4.284,2.09-7.499,5.723-9.053,10.232
                  c-1.554,4.509-1.255,9.353,0.833,13.635c2.092,4.286,5.725,7.501,10.234,9.053c1.902,0.656,3.866,0.982,5.826,0.982
                  c2.673,0,5.334-0.608,7.81-1.815c4.284-2.09,7.499-5.724,9.053-10.232s1.255-9.353-0.837-13.637
                  C121.611,139.334,117.977,136.118,113.468,134.565z M117.032,154.671c-0.86,2.506-2.646,4.524-5.028,5.685
                  c-2.382,1.161-5.063,1.33-7.577,0.463c-2.503-0.862-4.52-2.648-5.683-5.028c-1.162-2.38-1.325-5.071-0.461-7.575
                  c0.86-2.506,2.646-4.524,5.028-5.685c1.395-0.682,2.874-1.003,4.331-1.003c3.672,0,7.209,2.049,8.929,5.568
                  C117.733,149.477,117.896,152.167,117.032,154.671z M150.694,107c-2.526-4.044-6.477-6.86-11.125-7.935c-4.633-1.065-9.421-0.271-13.473,2.256
                  c-4.044,2.528-6.86,6.477-7.933,11.123c-2.212,9.589,3.789,19.192,13.38,21.408c1.344,0.31,2.688,0.459,4.013,0.459
                  c8.123,0,15.491-5.594,17.393-13.837C154.022,115.83,153.22,111.044,150.694,107z M145.217,118.691
                  c-1.228,5.324-6.551,8.652-11.892,7.432c-5.326-1.232-8.662-6.568-7.43-11.896c0.593-2.58,2.161-4.772,4.408-6.176
                  c1.596-0.998,3.397-1.511,5.233-1.511c0.748,0,1.503,0.085,2.251,0.256c2.58,0.597,4.776,2.163,6.178,4.41
                  C145.372,113.449,145.814,116.109,145.217,118.691z M52.403,112.444c-1.073-4.647-3.889-8.596-7.933-11.123c-4.044-2.527-8.832-3.33-13.473-2.255
                  c-4.649,1.073-8.6,3.889-11.125,7.933c-2.525,4.044-3.328,8.83-2.255,13.473c1.902,8.245,9.27,13.837,17.393,13.837
                  c1.325,0,2.669-0.147,4.013-0.459C48.615,131.636,54.615,122.033,52.403,112.444z M37.242,126.12
                  c-5.322,1.236-10.66-2.106-11.892-7.432c-0.597-2.58-0.155-5.239,1.251-7.484c1.402-2.247,3.599-3.814,6.178-4.408
                  c0.748-0.173,1.503-0.257,2.251-0.257c1.836,0,3.637,0.513,5.233,1.511c2.247,1.404,3.816,3.597,4.408,6.176
                  C45.903,119.554,42.568,124.891,37.242,126.12z M103.133,53.417c0-9.843-8.007-17.85-17.85-17.85s-17.85,8.007-17.85,17.85s8.007,17.85,17.85,17.85
                  S103.133,63.26,103.133,53.417z M85.283,63.333c-5.47,0-9.917-4.449-9.917-9.917c0-5.468,4.447-9.917,9.917-9.917
                  c5.47,0,9.917,4.449,9.917,9.917C95.2,58.884,90.753,63.333,85.283,63.333z M125.616,90.674c3.947,0,7.918-1.298,11.214-3.969c3.707-3.002,6.024-7.265,6.523-12.008
                  c0.496-4.741-0.879-9.394-3.881-13.099c-6.194-7.647-17.459-8.826-25.105-2.638c-7.651,6.194-8.832,17.455-2.642,25.105
                  C115.25,88.415,120.41,90.674,125.616,90.674z M119.356,65.127c4.257-3.446,10.509-2.783,13.949,1.464
                  c1.67,2.059,2.433,4.643,2.157,7.277c-0.275,2.634-1.565,5.003-3.622,6.67c-4.257,3.446-10.505,2.785-13.949-1.466
                  C114.452,74.823,115.111,68.567,119.356,65.127z M70.734,135.4c-4.288-2.092-9.127-2.388-13.635-0.835c-4.508,1.553-8.142,4.768-10.23,9.053
                  c-2.092,4.284-2.39,9.128-0.837,13.637c1.553,4.509,4.768,8.142,9.053,10.232c2.475,1.207,5.136,1.815,7.81,1.815
                  c1.956,0,3.924-0.325,5.826-0.982c4.509-1.551,8.142-4.767,10.23-9.051c2.092-4.284,2.39-9.128,0.837-13.637
                  C78.235,141.123,75.018,137.489,70.734,135.4z M71.818,155.793c-1.158,2.378-3.177,4.164-5.679,5.026
                  c-2.51,0.868-5.195,0.697-7.577-0.463c-2.382-1.16-4.168-3.178-5.028-5.685c-0.864-2.504-0.701-5.195,0.461-7.575
                  c1.72-3.519,5.257-5.568,8.929-5.568c1.457,0,2.936,0.322,4.331,1.003c2.382,1.16,4.168,3.178,5.028,5.685
                  C73.147,150.72,72.984,153.41,71.818,155.793z"
        />
      </svg>
    );
  };

  export default BrandIcon