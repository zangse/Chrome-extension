// import $ from "jquery";

const matchUrl = ["#/user/songs", "#/my/m/music/playlist", "#/playlist"];
function isActive(hash: string): boolean {
  const match = matchUrl.filter(item => hash.includes(item));
  return Boolean(match && match[0]);
}
function init() {
  const hash = window.location.hash;
  if (isActive(hash)) {
    console.log("matched===>", window.location.href);
  }
  const contentOperation = document.getElementById(
    "flag_play_addto_btn_wrapper"
  );
  const download = document.createElement("a");
  download.innerHTML = '"your code here"';
  contentOperation?.append(download);
  // const tbody = $("#song-list-pre-cache table tbody");
  // console.log("tbody", tbody);
  // const allTr = tbody.find("tr");
  // console.log("allTr", allTr);
  // if (allTr && allTr.length > 0) {
  //   allTr.each(item => {
  //     console.log(item);
  //   });
  // }
}
window.onload = function() {
  init();
};
