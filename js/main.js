//  ----------------------------------------------------
//  ファーストビュー
//  ----------------------------------------------------

window.addEventListener("load", () => {
  const wrapper = document.querySelector(".about__right");
  const list = wrapper.querySelector(".scroll-animate");

  // クローンを作成
  const clone = list.cloneNode(true);
  wrapper.appendChild(clone);

  // 高さと幅を取得（画像読み込み後なのでOK）
  const listHeight = list.offsetHeight;
  const listWidth = list.offsetWidth;

  // 複製リストの初期位置調整（縦と横で切り替え）
  const lists = wrapper.querySelectorAll(".scroll-animate");

  function setVertical() {
    lists.forEach((el, i) => {
      el.style.top = i * listHeight + "px";
      el.style.left = "0";
    });

    gsap.killTweensOf(lists); // 前のアニメーションをクリア

    gsap.to(lists, {
      y: `-=${listHeight}`,
      duration: 45,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y) => parseFloat(y) % listHeight),
      },
      x: 0,
    });
  }

  function setHorizontal() {
    lists.forEach((el, i) => {
      el.style.left = i * listWidth + "px";
      el.style.top = "0";
    });

    gsap.killTweensOf(lists); // 前のアニメーションをクリア

    gsap.to(lists, {
      x: `-=${listWidth}`,
      duration: 45,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % listWidth),
      },
      y: 0,
    });
  }

  function updateAnimation() {
    if (window.innerWidth <= 768) {
      list.classList.add("horizontal");
      setHorizontal();
    } else {
      list.classList.remove("horizontal");
      setVertical();
    }
  }

  updateAnimation();

  window.addEventListener("resize", () => {
    updateAnimation();
  });
});





//  ----------------------------------------------------
//  ハンバーガーメニュー
//  ----------------------------------------------------
document.querySelector('.hamburger').addEventListener('click', function () {
  this.classList.toggle('active');
  document.querySelector('.nav-sp').classList.toggle('active');
});



//  ----------------------------------------------------
//  headerの表示タイミング設定
//  ----------------------------------------------------
let pagetop = $(".header__top");
pagetop.hide(); // 最初に画面が表示された時は、ボタンを非表示に設定
// スクロールイベント
$(window).scroll(function () {
  if ($(this).scrollTop() > 750) {
    //スクロール位置が750pxを超えた場合
    pagetop.fadeIn(); //ボタンを表示する
  } else {
    //スクロール位置が750px未満の場合
    pagetop.fadeOut(); //トップに戻るボタンを非表示にする
  }
});

//  ----------------------------------------------------
//  headerからfooterの切り替え
//  ----------------------------------------------------
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  //いずれかの要素が存在しない場合は処理を中断
  if (!header || !footer) return;

  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (footerTop < windowHeight) {
    // フッターが画面の下から100px以内に来たら
    header.style.height = "100px";
    footer.style.opacity = "1";
  } else {
    header.style.height = "80px";
    footer.style.opacity = "0";
  }
});

//  ----------------------------------------------------
//  sub-titleのアニメーション
//  ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".sub-title");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.8,
    }
  );

  targets.forEach((target) => {
    observer.observe(target);
  });
});

//  ----------------------------------------------------
//  ABOUTページの画像スクロール
//  ----------------------------------------------------
window.addEventListener("load", () => {
  const wrapper = document.querySelector(".about__right");
  const list = wrapper.querySelector(".scroll-animate");

  // クローンを作成
  const clone = list.cloneNode(true);
  wrapper.appendChild(clone);

  // 画面幅によって縦 or 横スクロールを切り替え
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // 横スクロールアニメーション（SP）
    const listWidth = list.scrollWidth;
    clone.style.left = listWidth + "px";

    const lists = wrapper.querySelectorAll(".scroll-animate");
    gsap.set(lists, { y: 0, x: 0 });

    gsap.to(lists, {
      x: `-=${listWidth}`,
      duration: 90,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % listWidth)
      }
    });
  } else {
    // 縦スクロールアニメーション（PC）
    const listHeight = list.offsetHeight;
    clone.style.top = listHeight + "px";

    const lists = wrapper.querySelectorAll(".scroll-animate");
    gsap.set(lists, { y: 0, x: 0 });

    gsap.to(lists, {
      y: `-=${listHeight}`,
      duration: 45,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y) => parseFloat(y) % listHeight)
      }
    });
  }
});

// //  ----------------------------------------------------
// //  FAQのQ.をクリックしたら、A.を表示する
// //  ----------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // すべてのQ要素（質問部分）を取得します
  const faqQuestions = document.querySelectorAll(".faq_item--q");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.closest(".faq_item");
      const answer = faqItem.querySelector(".faq_item--a");

      // 現在開いているすべての回答を閉じる処理
      document.querySelectorAll(".faq_item--a.open").forEach((otherAnswer) => {
        const otherQuestion = otherAnswer.previousElementSibling;
        if (otherAnswer !== answer) {
          otherAnswer.style.maxHeight = null;
          otherAnswer.classList.remove("open");
          if (otherQuestion) {
            otherQuestion.classList.remove("active");
          }
        }
      });

      // クリックされた回答を開閉する処理
      if (answer.classList.contains("open")) {
        // すでに開いている場合は閉じる
        answer.style.maxHeight = null;
        answer.classList.remove("open");
        this.classList.remove("active");
      } else {
        // 開いていない場合は開く
        answer.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        this.classList.add("active");
      }
    });
  });
});



//  ----------------------------------------------------
//  EVENT lineアニメーション
//  ----------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll('.boxPath');
  const step = 4;

  boxes.forEach(box => {
    const totalLength = box.getTotalLength();

    box.style.strokeDasharray = totalLength;
    box.style.strokeDashoffset = 0;  // 最初は全部見えてる状態

    let offset = 0;

    function animate() {
      offset += step;
      if (offset > totalLength) offset = totalLength;
      box.style.strokeDashoffset = offset;

      if (offset < totalLength) {
        requestAnimationFrame(animate);
      }
    }
    animate();
  });
});


//  ----------------------------------------------------
//  EVENT iconアニメーション
//  ----------------------------------------------------
window.addEventListener('load', function () {
  setTimeout(function () {
    // 表示したい3つのクラス名を配列にまとめる
    const classNames = ['seminar__img', 'ask-space__img', 'beginner__img'];

    classNames.forEach(className => {
      // それぞれのクラスの要素を全部取得
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach(el => {
        el.style.opacity = '1'; // 表示に変更
      });
    });
  }, 3000);
});

//  ----------------------------------------------------
//  EVENT オンライン飲み会 avatar表示
//  ----------------------------------------------------
$(window).on("scroll load", function () {
  const scroll = $(window).scrollTop();
  const triggerPoint = 1000; // ここは調整してね

  if (scroll > triggerPoint) {
    $(".drink__avatar, .beer").addClass("visible");
  } else {
    $(".drink__avatar, .beer").removeClass("visible");
  }
});

//  ----------------------------------------------------
//  EVENT オンライン飲み会 beer揺れ
//  ----------------------------------------------------


let toggled = false;
setInterval(() => {
  const angle = toggled ? 10 : -10;
  $(".beer").css("transform", `rotate(${angle}deg)`);
  toggled = !toggled;
}, 600); // 300msごとに切り替え → カクカク揺れ


//  ----------------------------------------------------
//  EVENT 一文字ずつ表示
//  ----------------------------------------------------
$(function () {
  let typed = false; // 一度だけ実行させるフラグ

  $(window).on("scroll", function () {
    if (!typed && $(window).scrollTop() > 1400) {
      typed = true; // もう一回はしない

      $(".typewriter").each(function () {
        const text = $(this).text();
        $(this).empty(); // 一度中身を消す

        let i = 0;
        const speed = 50; // 1文字ずつ表示する速度（ミリ秒）

        const interval = setInterval(() => {
          $(this).append(text.charAt(i));
          i++;
          if (i >= text.length) {
            clearInterval(interval);
          }
        }, speed);
      });
    }
  });
});



//  ----------------------------------------------------
//  top animation
//  ----------------------------------------------------
// ローディング後ロゴが出てくる
window.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader__logo");

  setTimeout(() => {
    loader.style.opacity = "1";
  }, 2500);
});