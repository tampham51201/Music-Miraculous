$(document).ready(() => {
  const PLAYER_STORAGE_KEY = "TAMA-Music";

  const audio = $("#myAudio");
  const app = {
    songs: [
      {
        name: "độ tộc 2",
        singer: "độ mixi",
        path: "./resources/music/dotoc2.mp3",
        img: "./resources/img/dotoc2.jpg",
      },
      {
        name: "bạc phận",
        singer: "jack,K-ICM",
        path: "./resources/music/bacphan.mp3",
        img: "./resources/img/imgbacphan.jpg",
      },
      {
        name: "đi về nha",
        singer: "Đen vâu",
        path: "./resources/music/mp3divenha.mp3",
        img: "./resources/img/imgdivenha.jpg",
      },
      {
        name: "hào bước theo đời",
        singer: "hồ quang hiếu",
        path: "./resources/music/haobuoctheodoi.mp3",
        img: "./resources/img/imghaobuoctheodoi.jpg",
      },
      {
        name: "stream đến bao giờ",
        singer: "độ mixi",
        path: "./resources/music/streamdenbaogio.mp3",
        img: "./resources/img/imgstreamdenbaogio.jpg",
      },
      {
        name: "lối nhỏ",
        singer: "Đen vâu",
        path: "./resources/music/loinho.mp3",
        img: "./resources/img/loinho.jpg",
      },
      {
        name: "sóng gió",
        singer: "Jack,K-ICM",
        path: "./resources/music/songgio.mp3",
        img: "./resources/img/imgsonggio.jpg",
      },
      {
        name: "chúng ta là anh em",
        singer: "hồ quang hiếu",
        path: "./resources/music/chungtalaanhem.mp3",
        img: "./resources/img/imgchungtalaanhem.jpg",
      },
    ],
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
      this.config[key] = value;
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(app.config));
    },
    render: function () {
      const htmls = this.songs.map((song, index) => {
        return `
                  <li class="content__songslist-iner">
                        <i class="fas fa-play content__songslist-play"></i>
                        <h4 class="content__songslist-sn">${index + 1}</h4>
                        <div class="content__songslist-thumneil">
                            <img src="${
                              song.img
                            }" class="content__songslist-img" />
                        </div>
                        <h4 class="content__songslist-title">
                            ${song.name}
                        </h4>
                        <i class="far fa-heart content__songslist-favour"></i>
                        <div class="content__songslist-more">
                            <i class="fas fa-ellipsis-v content__songslist-more-icon"></i>
                            <ul class="content__songslist-more__list">
                                <li class="content__songslist-more__item">
                                    <i class="fas fa-heart"></i> Favourites
                                </li>
                                <li class="content__songslist-more__item">
                                    <i class="fas fa-download"></i> download now
                                </li>
                                <li class="content__songslist-more__item">
                                    <i class="fas fa-list-alt"></i> add to playlist
                                </li>
                                <li class="content__songslist-more__item">
                                    <i class="fas fa-share"></i> share
                                </li>
                            </ul>
                         </div>

            </li>`;
      });

      $(".content__songslist-box").html(htmls);
    },
    handleEvent: function () {
      const listMore = $(".content__songslist-more__list");
      const iconListMore = $(".content__songslist-more-icon");
      const btnplayBoxs = $(".content__songslist-play");
      // xử lý sự kiện click hiện thị lớn nhở sidebar(pc)
      $(".sideBar__close").click(() => {
        $(".sideBar").toggleClass("active");
        $(".header").toggleClass("toggle");
        $(".content").toggleClass("toggle");
      });
      // xử lý sự kiện click ẩn hiện sidebar(mobile-tablet)
      $(".sideBar-icon").click(function () {
        $(".sideBar").toggleClass("active");
        $(this).toggleClass("fa-times");
      });
      // xử lý sự kiện hover icon slidebar hiển thị tên
      $(".sideBar-nav__item-icon").hover((e) => {
        let x = e.clientX;
        let y = e.clientY;
        $(".sideBar-nav__item-link").css({
          top: y + 8,
          left: x + 8,
        });
      });

      // xử lý sự kiện click nút more box bài hát
      //hiển thị
      $.each(iconListMore, function (index, iconMore) {
        $(iconMore).click(() => {
          listMore.hide();
          $(listMore[index]).show();
        });
      });
      //click để ẩn
      $(document).click((e) => {
        if (
          !iconListMore.is(e.target) &&
          iconListMore.has(e.target).length === 0
        ) {
          listMore.hide();
        }
      });

      $(".control-play__song-icon").click(() => {
        $(".control-play__song").toggleClass("active");
      });
      // phong to thu nhỏ control play
      $(".control-play__close").click(() => {
        $(".control-play").toggleClass("active-control");
      });

      // xử lý sự kiện khi scroll trang cho header
      $(document).scroll(() => {
        const scrollTop = $(window).scrollTop() || $(document).scrollTop();
        if (scrollTop > 10) {
          $(".header").css("background-color", "#0e1d30");
        } else {
          $(".header").css("background-color", "transparent");
        }
      });

      //xử lý sự kiện khi click nút play
      //handle event when click btn phay
      $(".btn-play").click(function () {
        if (!app.isPlaying) {
          $(audio).trigger("play");
          onPlay();
        } else {
          $(audio).trigger("pause");
          onPause();
        }
      });
      //xử lý sự kiện khi nhạc chạy
      //handle event when song play
      const onPlay = function () {
        $(audio).on("play", () => {
          app.isPlaying = true;
          $(".btn-play i").removeClass("fa-play");
          $(".btn-play i").addClass("fa-pause");
        });
      };
      //xử lý sự kiện khi nhạc dừng
      //handle event when song pause
      const onPause = function () {
        $(audio).on("pause", function () {
          app.isPlaying = false;
          $(".btn-play i").toggleClass("fa-pause fa-play");
        });
      };

      // chạy thanh progress khi nhạc phát

      $(audio).on("timeupdate", function () {
        if ($(this).prop("duration")) {
          const progress = Math.floor(
            ($(this).prop("currentTime") / $(audio).prop("duration")) * 100
          );
          if ($(".progress").on("input")) {
            $(".progress").val();
          } else $(".progress").val(progress);
        }
      });
      // tua thanh progress

      $(".progress").on("mouseup", function () {
        const seekTime =
          ($(".progress").val() / 100) * $(audio).prop("duration");

        $(audio).prop("currentTime", seekTime);
      });

      //xử lý sự kiện khi bài nhạc kết thúc
      //handle event when song end
      $(audio).on("ended", function () {
        if (app.isRandom) {
          app.randomSong();
        } else {
          app.nextSong();
        }
        $(audio).trigger("play");
        onPlay();
      });

      //xử lý sự kiện khi bấm nút bài tiếp theo
      //handle event when click button song next
      $(".btn-next").click(function () {
        if (app.isRandom) {
          app.randomSong();
        } else {
          app.nextSong();
        }

        $(audio).trigger("play");
        onPlay();
      });

      //xử lý sự kiện khi bấm nút lùi về 1 bài
      //handle event when click button song prev
      $(".btn-prev").click(function () {
        if (app.isRandom) {
          app.randomSong();
        } else {
          app.prevSong();
        }

        $(audio).trigger("play");
        onPlay();
      });

      //xử lý sự kiện khi bấm nút phát lại bài hát
      //handle event when click button repeat
      $(".btn-repeat").click(function () {
        if (!app.isRepeat) {
          $(audio).prop("loop", true);
          app.isRepeat = true;
        } else {
          $(audio).prop("loop", false);
          app.isRepeat = false;
        }
        app.setConfig("isRepeat", app.isRepeat);
        $(this).toggleClass("repeat-active");
      });
      //xử lý sự kiện khi bấm nút ramdom
      //handle event when click button ramdom
      $(".btn-random").click(function () {
        if (!app.isRandom) {
          app.isRandom = true;
        } else {
          app.isRandom = false;
        }
        app.setConfig("isRandom", app.isRandom);
        $(this).toggleClass("random-active");
      });
      $.each(btnplayBoxs, function (index, btnplayBox) {
        $(btnplayBox).click(() => {
          if (index !== app.currentIndex) {
            app.currentIndex = index;
            app.loadCurrentSong();
            $(audio).trigger("play");
            onPlay();
          }
        });
      });
    },

    currentSong: function () {
      return this.songs[this.currentIndex];
    },
    loadConfig: function () {
      this.isRandom = this.config.isRandom;
      this.isRepeat = this.config.isRepeat;
      $(".btn-random").toggleClass("random-active", app.isRandom);
      $(".btn-repeat").toggleClass("repeat-active", app.isRepeat);
    },
    loadCurrentSong: function () {
      $(".control-play__song-thumb").attr("src", this.currentSong().img);
      $(".control-play__song-title").text(this.currentSong().name);
      $("#myAudio").attr("src", this.currentSong().path);
    },
    nextSong: function () {
      app.currentIndex =
        app.currentIndex + 1 >= app.songs.length ? 0 : app.currentIndex + 1;
      app.loadCurrentSong();
    },
    prevSong: function () {
      app.currentIndex =
        app.currentIndex - 1 < 0 ? app.songs.length - 1 : app.currentIndex - 1;
      app.loadCurrentSong();
    },
    randomSong: function () {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * app.songs.length);
      } while (newIndex === app.currentIndex);
      app.currentIndex = newIndex;
      this.loadCurrentSong();
    },

    start: function () {
      this.loadConfig();
      this.render();
      this.currentSong();
      this.loadCurrentSong();
      this.handleEvent();
    },
  };

  app.start();
});
