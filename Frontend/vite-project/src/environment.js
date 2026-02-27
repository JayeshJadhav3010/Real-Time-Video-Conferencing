let IS_PROD=true;

const server= IS_PROD ? "https://real-time-video-conferencing-fd6k.onrender.com" :
    "http://localhost:8000";

export default server;