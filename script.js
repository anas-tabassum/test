let player;
let isPlaying = false;
let duration_in_seconds = null;

function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-iframe", {
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  event.target.setVolume(100);
  duration_in_seconds = event.target.getDuration();
}

function isFullscreenSupported() {
  const element = document.createElement("div");
  return (
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled
  );
}

function toggleFullscreen() {
  if (isFullscreenSupported()) {
    const iframe = document.getElementById("youtube-iframe");
    if (iframe.fullscreenElement) {
      iframe.exitFullscreen();
    } else {
      iframe.requestFullscreen().catch((err) => {
        console.error("Error attempting to enter fullscreen mode:", err);
      });
    }
  } else {
    fitToViewPort();
  }
  // setTimeout(() => {
  //   document.exitFullscreen();
  // }, duration_in_seconds * 1000);
}

function fitToViewPort() {
  let video_container = document.getElementById("video-container");

  video_container.style.width = "100vw";
  video_container.style.height = "100vh";
}

function togglePlayPause() {
  // player.setVolume(100);
  if (isPlaying) {
    player.pauseVideo();
    document.querySelector(".play-pause-btn").textContent = "Play";
  } else {
    player.playVideo();
    document.querySelector(".play-pause-btn").textContent = "Pause";
  }
  isPlaying = !isPlaying;
}

loadYouTubeAPI();
