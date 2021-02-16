const video = document.getElementById('video__viewer');
if (video) video.preload = "auto";
var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
const sVideo = document.querySelector('.video');
let header__nav;
if (document.querySelector('.header__nav')) {
    header__nav = document.querySelector('.header__nav').getBoundingClientRect().height;
}
const videoPlayerLandSC = document.querySelector('.video__player-landSC');
const videoResolutionI = document.querySelector('.video__resolutionI');
let i = localStorage.getItem('ms2afunny');
const v = document.getElementById('video');
const playIcon = document.querySelector('.video__playSVG');
const vCT = document.querySelector('.video__length-current');
const vLength = document.querySelector('.video__length-length');
const volumeSlider = document.querySelector('.video__volume--slider');
const volumeProgress = document.querySelector('.video__volume--progress');
const volumeIcon = document.querySelector('.video__volume--icon');
const videoContols = document.querySelector('.video__contols');
const videoPlayC = document.querySelector('.video__playC');
const skipR = document.querySelector('.video__skipping-right');
const skipL = document.querySelector('.video__skipping-left');
const fI = document.querySelector('.video__fullS');
const vReso = document.querySelector('.video__resolution');
const videoSeking = document.querySelector('.video__seking');
const showComments = document.querySelector('.video__comments-show');
let volumeTrue = false;
let blury = true;
let x = false;

//ms2a player
(() => {
    try {
        if (!v) return;
        videoResolutionI.addEventListener('click', (e) => {
            e.preventDefault();
            vReso.classList.toggle('active');
        });
        [...document.querySelectorAll('input')].forEach(input => {
            input.addEventListener('focus', () => {
                blury = false;
            });
            input.addEventListener('blur', () => {
                blury = true;
            });
        });
        function handleVolume(e) {
            if (volumeSlider.offsetWidth <= e.offsetX) return;
            if (e.pageX - volumeSlider.getBoundingClientRect().left <= 0) {
                volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"></path></svg>'
                volumeProgress.style.width = '0%';
                return;
            }
            else {
                volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><defs><clipPath><path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path><path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path><path d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path></clipPath><clipPath ><path d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path></clipPath></defs><path  d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff" ></path><path d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z" fill="#fff" style="display: none;"></path></svg>'
                volumeProgress.style.width = e.offsetX + 'px';
                let value = e.offsetX / 100;
                if (value >= 1) {
                    value = 1;
                    video['volume'] = value;
                } else {
                    video['volume'] = e.offsetX / 100;
                }
            }
        }
        //handleProgress
        function videoRealTime() {
            const percent = (video.currentTime / video.duration) * 100;
            document.querySelector('.video__progress--filled').style.width = percent + '%';
            videoTimer();
        }
        function videoProgress() {
            let playaa = true;
            if (video.paused) {
                playaa = false;
            }
            if (video.seeking) {
                videoSeking.style.display = 'block';
            } else {
                videoSeking.style.display = 'none';
                if (playaa) video.play();
            }
            if (video.readyState === 4) {
                var loadedPercentage = (this.buffered.end(0) / this.duration) * 100;
                document.querySelector('.video__progress--p').style.width = loadedPercentage + '%';
            }
        }
        function videoTimer() {
            var ds = parseInt(video.duration % 60);
            var dm = parseInt((video.duration / 60) % 60);
            var s = parseInt(video.currentTime % 60);
            var m = parseInt((video.currentTime / 60) % 60);
            if (String(s).length == 1) s = `0${s}`;
            if (String(ds).length == 1) ds = `0${ds}`;
            if (isNaN(ds) || isNaN(dm)) {
                vLength.textContent = `0:00`;
                vCT.textContent = `0:00`;
            } else {
                vLength.textContent = `${dm}:${ds}`;
            }
            vCT.textContent = `${m}:${s}`;
        }
        videoTimer();
        function togglePlayButton() {
            const icon = this.paused
                ? '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" ></path></svg>'
                : '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" ></path></svg>';
            playIcon.innerHTML = icon;
        }
        function ms2aPlayer(e) {
            if (window.screen.width <= 767) {
                if (e.target.classList.contains('video__play')) {
                    e.preventDefault();
                    const method = video.paused ? 'play' : 'pause';
                    video[method]();
                }
                return;
            }
            if (e.target.classList.contains('video__play') ||
                e.target.classList.contains('video__player') ||
                e.target.classList.contains('video__viewer') ||
                e.keyCode === 32 && blury) {
                e.preventDefault();
                const method = video.paused ? 'play' : 'pause';
                video[method]();
                return;
            }
            if (e.keyCode === 39) {
                skipR.click();
                return;
            } else if (e.keyCode === 37) {
                skipL.click();
                return;
            }
        }
        function skip() {
            video.currentTime += parseFloat(this.dataset.skip);
        }
        function videoResolution(e) {
            if (!e.target.classList.contains('active')) {
                document.querySelector('.video__resolution__r.active').classList.remove('active');
                e.target.classList.add('active');
                const resolution = e.target.dataset.r;
                let v = window.location.pathname.split('/');
                v = v[v.length - 1];
                video.pause();
                setTimeout(() => {
                    document.getElementById('video__viewer').src = `/api/v1/videos/video/${v}${resolution}`;
                }, 0);
            }
            return;
        }
        function fullScreen(e) {
            if (fI.classList.contains('fullS')) {
                fI.classList.toggle('fullS');
                fI.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><g><path  d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" ></path></g><g><path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" ></path></g><g><path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" ></path></g><g ><path  d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" ></path></g></svg>'
                const cancellFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
                if (window.screen.width <= 767 && screen.orientation) {
                    videoPlayerLandSC.classList.add('stickyV');
                    videoPlayerLandSC.style.top = `${header__nav}px`;
                    videoPlayerLandSC.style.height = 'inherit';
                    videoPlayerLandSC.style.position = 'fixed';
                    screen.orientation.lock("portrait-primary");
                }
                cancellFullScreen.call(document);
            } else {
                fI.classList.toggle('fullS');
                fI.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><g><path  d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"></path></g><g ><path d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"></path></g><g ><path d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z" ></path></g><g>></use><path d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"></path></g></svg>'
                const requestFullScreen = v.requestFullscreen || v.webkitRequestFullScreen || v.mozRequestFullScreen || v.msRequestFullScreen;
                requestFullScreen.call(v);
                if (window.screen.width <= 767) {
                    videoPlayerLandSC.classList.remove('stickyV');
                    videoPlayerLandSC.style.top = `0`;
                    videoPlayerLandSC.style.height = '100%';
                    videoPlayerLandSC.style.position = 'initial';
                    if (orientation === "landscape-primary") {
                        return;
                    } else {
                        screen.orientation.lock("landscape-primary");
                    }
                }

            }
        }
        function toggleVolume() {
            playIcon.classList.toggle('mute');
            if (playIcon.classList.contains('mute')) {
                video.volume = 0;
                volumeProgress.style.width = '0%';
                volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"></path></svg>'
            } else {
                volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><defs><clipPath><path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path><path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path><path d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path></clipPath><clipPath ><path d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path></clipPath></defs><path  d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff" ></path><path d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z" fill="#fff" style="display: none;"></path></svg>'
                video.volume = 0.5;
                volumeProgress.style.width = '50%';
            }
        }
        function scrub(e) {
            e.preventDefault();
            if (e.touches) {
                let touchE = e.touches[0];
                let scrubTime = (touchE.clientX / document.querySelector('.video__progress').offsetWidth) * video.duration;
                video.currentTime = scrubTime;
                document.querySelector('.video__progress--filled').style.width = touchE.clientX + 'px';
                return;
            }
            let scrubTime = (e.offsetX / document.querySelector('.video__progress').offsetWidth) * video.duration;
            video.currentTime = scrubTime;
            document.querySelector('.video__progress--filled').style.width = e.offsetX + 'px';
            return;
        }
        async function postComment() {
            const commentsContainer = document.querySelector('.video__comments-container');
            const dAlert = document.querySelector('.alertEr');
            const comment = String(document.querySelector('.video__comments-input input').value);
            if (!commentsContainer || !dAlert) return;
            try {
                if (comment.length < 2) {
                    dAlert.innerHTML = 'أكتب تعليق...';
                    dAlert.classList.add('active');
                    return;
                }
                if (!i) {
                    window.open("/ms2a", '_self');
                }
                dAlert.classList.remove('active');
                const res = await axios({
                    method: "POST",
                    url: '/api/v1/videos/video/comment',
                    data: { comment },
                    withCredentials: true
                });
                if (res.data.status == 'success') {
                    const comment = document.createElement('div');
                    comment.classList.add('video__comment-placeHolder');
                    comment.innerHTML = `
                    <div class="video__comment-flexy"><div class="video__user-image video__user"><img class="video__user-image" src='/api/v1/videos/image/${res.data.user.photo}'>
                    </div><div class="video__user-info"><h4 class="video__user-name"> ${res.data.user.name} <span class="video__user-published-time">${new Date(res.data.comment.dateOfCreation).toLocaleDateString()}</span>
                    </h4><p class="video__user-comment">${res.data.comment.comment}</p></div></div><div class="video__user-statis"><div class="video__block">
                    <div class="video__info"><div class="video__info-hor video__like-dislike"><div class="video__container">
                    <button class="video__button video__like" data-comment='${res.data.comment.id}'><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></svg></button>
                    <span class="video__span video__likes"></span></div><div class="video__container">
                    <button class="video__button video__dislike" data-comment='${res.data.comment.id}'>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></svg></button>
                    <span class="video__span video__dislikes"></span></div></div></div></div></div>`;
                    commentsContainer.insertAdjacentElement('afterbegin', comment);
                    let nbrOfC = +document.querySelector('.video__comments-info--inc').textContent + 1;
                    document.querySelector('.video__comments-info--inc').textContent = nbrOfC;
                    document.querySelector('.video__comments-input input').value = '';
                    return;
                } else {
                    dAlert.innerHTML = 'المرجو تسجيل الدخول';
                    dAlert.classList.add('active');
                }
            } catch (er) {
                dAlert.innerHTML = 'المرجو تسجيل الدخول';
                dAlert.classList.add('active');
                return;
            }
        }
        async function updateComment(e) {
            try {
                e.preventDefault();
                let href = window.location.href;
                sessionStorage.setItem('content', href);
                const commentId = e.target.dataset.comment;
                let data = {};
                if (e.target.classList.contains('video__like')) {
                    if (!i) return window.open("/ms2a?new=true", "_self");
                    if (e.target.classList.contains('active')) {
                        data = Object.assign({ commentId }, { type: 'like' }, { c: 'deleteLike' });
                        e.target.classList.remove('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/comment',
                            data,
                            withCredentials: true
                        });
                        return;
                    } else {
                        let Btn = document.querySelector(`[data-comment="${commentId}"].video__dislike`);
                        data = Object.assign({ commentId }, { type: 'like' }, { c: 'addLike' });
                        e.target.classList.add('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                        if (Btn.classList.contains('active')) {
                            Btn.classList.remove('active');
                            Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                            data = Object.assign({ commentId }, { type: 'like' }, { c: 'addLike' }, { i: 'deleteDislike' });
                        }
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/comment',
                            data,
                            withCredentials: true
                        });
                        return;
                    }
                }
                if (e.target.classList.contains('video__dislike')) {
                    if (!i) return window.open("/ms2a?new=true", "_self");
                    if (e.target.classList.contains('active')) {
                        data = Object.assign({ commentId }, { type: 'dislike' }, { c: 'deleteDislike' });
                        e.target.classList.remove('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/comment',
                            data,
                            withCredentials: true
                        });
                        return;
                    } else {
                        let Btn = document.querySelector(`[data-comment="${commentId}"].video__like`);
                        data = Object.assign({ commentId }, { type: 'dislike' }, { c: 'addDislike' });
                        e.target.classList.add('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                        if (Btn.classList.contains('active')) {
                            Btn.classList.remove('active');
                            Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                            data = Object.assign({ commentId }, { type: 'dislike' }, { c: 'addDislike' }, { i: 'deleteLike' });
                        }
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/comment',
                            data,
                            withCredentials: true
                        });
                        return;
                    }
                }
            } catch (er) {
                return;
            }
        }
        async function updateV(e) {
            try {
                e.preventDefault();
                let href = window.location.href;
                sessionStorage.setItem('content', href);
                let data = {};
                if (e.target.classList.contains('video__like')) {
                    if (!i) return window.open("/ms2a?new=true", "_self");
                    if (e.target.classList.contains('active')) {
                        data = Object.assign({ type: 'like' }, { c: 'deleteLike' });
                        e.target.classList.remove('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/updatems2a',
                            data,
                            withCredentials: true
                        });
                        return;
                    } else {
                        let Btn = document.querySelector(`.video__info .video__dislike`);
                        data = Object.assign({ type: 'like' }, { c: 'addLike' });
                        e.target.classList.add('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                        if (Btn.classList.contains('active')) {
                            Btn.classList.remove('active');
                            Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                            data = Object.assign({ type: 'like' }, { c: 'addLike' }, { i: 'deleteDislike' });
                        }
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/updatems2a',
                            data,
                            withCredentials: true
                        });
                        return;
                    }
                }
                if (e.target.classList.contains('video__dislike')) {
                    if (!i) return window.open("/ms2a?new=true", "_self");
                    if (e.target.classList.contains('active')) {
                        data = Object.assign({ type: 'dislike' }, { c: 'deleteDislike' });
                        e.target.classList.remove('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/updatems2a',
                            data,
                            withCredentials: true
                        });
                        return;
                    } else {
                        let Btn = document.querySelector(`.video__info .video__like`);
                        data = Object.assign({ type: 'dislike' }, { c: 'addDislike' });
                        e.target.classList.add('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                        if (Btn.classList.contains('active')) {
                            Btn.classList.remove('active');
                            Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                            data = Object.assign({ type: 'dislike' }, { c: 'addDislike' }, { i: 'deleteLike' });
                        }
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/updatems2a',
                            data,
                            withCredentials: true
                        });
                        return;
                    }
                }
            } catch (er) {
                return;
            }
        }
        function showCommentsP() {
            document.querySelector('.video__comments').classList.add('active');
            document.querySelector('.ms2aFooter').style.display = 'none';
            document.querySelector('.video__left').style.display = 'none';
        }
        function hidCommentsP() {
            document.querySelector('.video__comments').classList.remove('active');
            document.querySelector('.ms2aFooter').style.display = 'block';
            document.querySelector('.video__left').style.display = 'block';
        }
        function shareV(e) {
            if (e.target.classList.contains('s')) {
                document.querySelector('.video__share-placeholder').style.display = 'none';
                return;
            }
            if (e.target.classList.contains('video__share-placeholder')) {
                e.target.style.display = 'none';
            }
            let href = window.location.href;
            let image = `https://${window.location.host}/api/v1/videos/image/${window.location.pathname.split('/')[2]}`;
            let fLink = `https://www.facebook.com/sharer/sharer.php?u=${href}&picture=${image}`;
            let tLink = `http://twitter.com/intent/tweet?url=${href}`;
            if (e.target.classList.contains('video__share__f')) {
                window.open(fLink);
                return;
            }
            if (e.target.classList.contains('video__share__t')) {
                window.open(tLink);
                return;
            }
            if (e.target.nodeName == "INPUT") {
                var copyText = document.getElementById("shareLink");
                copyText.select();
                copyText.setSelectionRange(0, 99999)
                document.execCommand("copy");
                document.querySelector('.video__share__lP').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('.video__share__lP').style.display = 'none';
                }, 1500);
                return;
            }

        }
        document.querySelector('.video__progress').addEventListener('click', scrub);
        document.querySelector('.video__progress').addEventListener('mousemove', (e) => x && scrub(e));
        document.querySelector('.video__progress').addEventListener('mousedown', () => x = true);
        window.addEventListener('mouseup', () => x = false);
        document.querySelector('.video__progress').addEventListener('touchstart', scrub);
        document.querySelector('.video__progress').addEventListener('touchstart', () => x = true);
        document.querySelector('.video__progress').addEventListener('touchmove', (e) => x && scrub(e));
        window.addEventListener('touchend', () => x = false);
        video.addEventListener('timeupdate', videoRealTime);
        video.addEventListener('progress', videoProgress);
        video.addEventListener('play', togglePlayButton);
        video.addEventListener('pause', togglePlayButton);
        video.addEventListener('ended', () => {
            if (nextVtoggle) {
                document.querySelector('#nextVideoC a').click();
            }
        });
        window.addEventListener('keydown', ms2aPlayer);
        v.querySelectorAll('[data-skip]').forEach(btn => {
            btn.addEventListener('click', skip);
        });
        document.querySelector('.video__volume--slider').addEventListener('click', handleVolume);
        volumeIcon.addEventListener('click', toggleVolume);
        v.addEventListener('click', ms2aPlayer);
        function doThis() {
            videoContols.style.transform = 'scaleY(1)';
            videoPlayC.style.transform = 'translate(-50%,-50%) scale(2)';
        }
        v.addEventListener('mousemove', doThis);
        v.addEventListener('dblclick', fullScreen);
        volumeSlider.addEventListener('mousedown', () => volumeTrue = true);
        volumeSlider.addEventListener('mousemove', (e) => volumeTrue && handleVolume(e));
        window.addEventListener('mouseup', () => volumeTrue = false);
        document.querySelector('.video__fullS').addEventListener('click', fullScreen);
        document.querySelectorAll('.video__resolution__r').forEach(r => r.addEventListener('click', videoResolution));
        setInterval(() => {
            if (!video.paused) {
                videoContols.style.transform = 'scaleY(0)';
                videoPlayC.style.transform = 'scaleY(0)';
            } else {
                videoContols.style.transform = 'scaleY(1)';
                videoPlayC.style.transform = 'translate(-50%,-50%) scale(2)';
            }
        }, 4000);
    } catch (er) {
        console.log(er);
        return;
    }
})();