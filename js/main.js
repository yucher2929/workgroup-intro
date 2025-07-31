//  ----------------------------------------------------
//  top animation
//  ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const panel = document.querySelector(".panel");

  // .panelクラスにカードを複製（25枚）
  for (let i = 0; i < 25; i++) {
    const card = document.createElement('div');
    card.className = `card card${i + 1}`;
    card.innerHTML = `
      <div class="card-inner">
        <div class="front"><img src="img/top__front.png" alt="MetaLeaf"></div>
        <div class="back">
          <div class="back-inner">
            <p>一人じゃできない成長を、ここで。</p>
            <img src="img/top__back-img.png" alt="MetaLeafのアバター">
          </div>
        </div>
      </div>
    `;
    panel.appendChild(card);
  }

  // 25タイルを5×5で分割表示
  const cards = document.querySelectorAll(".card");
  const cols = 5;

  cards.forEach((card, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const frontImg = card.querySelector(".front img");
    const backInner = card.querySelector(".back-inner");

    frontImg.style.top = `${-100 * row}%`;
    frontImg.style.left = `${-100 * col}%`;

    backInner.style.top = `${-100 * row}%`;
    backInner.style.left = `${-100 * col}%`;
  });

  // ScrollTriggerアニメーション
  ScrollTrigger.create({
    trigger: ".panel-wrapper",
    start: "top top",
    end: "+=600",
    scrub: true,
    pin: ".panel",
    onUpdate: self => {
      const progress = self.progress;
      const cards = document.querySelectorAll(".card-inner");

      if (progress > 0.1) {
        cards.forEach(cardInner => {
          cardInner.classList.add("flip");
          cardInner.parentElement.classList.add("no-border");
        });
        panel.classList.add("no-hover");
        panel.classList.add("no-gap");
      } else {
        cards.forEach(cardInner => {
          cardInner.classList.remove("flip");
          cardInner.parentElement.classList.remove("no-border");
        });
        panel.classList.remove("no-hover");
        panel.classList.remove("no-gap");
      }
    }
  });
});


//  ----------------------------------------------------
//  aタグのスムーススクロール
//  ----------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});


//  ----------------------------------------------------
//  ハンバーガーメニュー
//  ----------------------------------------------------
document.querySelector(".hamburger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".nav-sp").classList.toggle("active");
});


//  ----------------------------------------------------
//  headerの表示タイミング設定
//  ----------------------------------------------------
let pagetop = $(".header__top");
pagetop.hide(); // 最初に画面が表示された時は、ボタンを非表示に設定
// スクロールイベント
$(window).scroll(function () {
  if ($(this).scrollTop() > 1400) {
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
        } else {
          entry.target.classList.remove("active"); // 画面から出たら外す
        }
      });
    },
    {
      threshold: 0.8, // 80%見えたときに発火
    }
  );

  targets.forEach((target) => {
    observer.observe(target);
  });
});


//  ----------------------------------------------------
//  ABOUTページの画像スクロール
//  ----------------------------------------------------
function setupScrollAnimation() {
  // PC用のリストとSP用のリスト要素を取得
  const pcList = document.querySelector('.scroll-animate');
  const spList = document.querySelector('.scroll-animate-sp');

  // どちらかの要素が存在しない場合は処理しない
  if (!pcList || !spList) return;

  // 画面幅が768px以下（スマートフォン）の場合
  if (window.innerWidth <= 768) {
    // PC用リストは非表示
    pcList.style.display = 'none';
    // SP用リストは表示（横並び用）
    spList.style.display = 'flex';

    // SP用のリストのクローンされていない場合（初回のみ処理）
    if (!spList.dataset.cloned) {
      const items = Array.from(spList.children);
      items.forEach((item) => {
        spList.appendChild(item.cloneNode(true));
      });
      spList.dataset.cloned = 'true';
    }
  } else {
    // SP用リストは非表示
    spList.style.display = 'none';
    // PC用リストは表示
    pcList.style.display = 'flex';

    // PC用のリストのクローンされていない場合
    if (!pcList.dataset.cloned) {
      const items = Array.from(pcList.children);
      items.forEach((item) => {
        pcList.appendChild(item.cloneNode(true));
      });
      pcList.dataset.cloned = 'true';
    }
  }
}

// ページ読み込み時に実行
window.addEventListener('DOMContentLoaded', setupScrollAnimation);
// リサイズ時にも実行
window.addEventListener('resize', setupScrollAnimation);


//  ----------------------------------------------------
//  EVENT iconアニメーション
//  ----------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  const classNames = ['seminar__img', 'ask-space__img', 'beginner__img'];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const isVisible = entry.isIntersecting;
      classNames.forEach(className => {
        const elements = entry.target.querySelectorAll(`.${className}`);
        elements.forEach(el => {
          if (isVisible) {
            el.classList.add('fade-in');
          } else {
            el.classList.remove('fade-in'); // 見えなくなったら戻す
          }
        });
      });
    });
  }, {
    threshold: 0.5 // 50%以上見えたら判定
  });

  const targets = document.querySelectorAll('.work-session-regular__item');
  targets.forEach(target => observer.observe(target));
});


//  ----------------------------------------------------
//  EVENT オンライン飲み会 avatar表示
//  ----------------------------------------------------
$(window).on("scroll load", function () {
  const $target = $(".virtual-drink-meetup__imgs");
  const windowHeight = $(window).height();
  const scrollTop = $(window).scrollTop();

  const triggerPx = 220; // 発火タイミング

  $target.each(function () {
    const offsetTop = $(this).offset().top;
    const elementHeight = $(this).outerHeight();

    const elementBottom = offsetTop + elementHeight;
    const visibleBottom = scrollTop + windowHeight;

    // 画面下が要素の下端 + triggerPx を超えていたら表示
    if (visibleBottom > elementBottom + triggerPx) {
      // 1回だけ addClass（2回目以降はスキップ）
      if (!$(".drink__avatar").hasClass("visible")) {
        $(".drink__avatar, .beer").addClass("visible");
      }
    }
  });
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
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".hackathon__items");
  const typewriters = document.querySelectorAll(".typewriter");
  let intervalId = null;

  // 複数段落タイプライター処理
  function typeWriterEffectMulti(element) {
    const paragraphs = element.querySelectorAll("p");
    let pIndex = 0;

    // 全段落非表示にする
    paragraphs.forEach(p => p.style.visibility = "hidden");

    function typeParagraph() {
      if (pIndex >= paragraphs.length) return;

      const p = paragraphs[pIndex];
      const fullText = p.textContent;
      p.textContent = "";
      p.style.visibility = "visible";

      let i = 0;
      const speed = 50;

      function typeChar() {
        if (i < fullText.length) {
          p.textContent += fullText.charAt(i);
          i++;
          setTimeout(typeChar, speed);
        } else {
          pIndex++;
          setTimeout(typeParagraph, speed * 10);
        }
      }
      typeChar();
    }
    typeParagraph();
  }

  // アニメ開始＆繰り返しセット
  function startLoop() {
    typewriters.forEach((elem) => {
      typeWriterEffectMulti(elem);
    });

    intervalId = setInterval(() => {
      typewriters.forEach((elem) => {
        typeWriterEffectMulti(elem);
      });
    }, 9000); // 7秒ごと繰り返し
  }

  // IntersectionObserver監視
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!intervalId) {
            startLoop();
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  targets.forEach((target) => observer.observe(target));

  // 初期ロード時やスクロール時にトリガー判定
  function checkScrollPosition() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;

    targets.forEach((target) => {
      const targetTop = target.getBoundingClientRect().top + scrollY;
      if (scrollY + windowHeight >= targetTop + target.offsetHeight * 0.5) {
        if (!intervalId) {
          startLoop();
        }
      }
    });
  }

  checkScrollPosition();
  window.addEventListener("scroll", checkScrollPosition);
});


// //  ----------------------------------------------------
// //  FAQのQ.をクリックしたら、A.を表示する
// //  ----------------------------------------------------
$(function () {
  /* クリックイベントを設定 */
  $(".faq__item--question").on("click", function () {
    const $clickedQuestion = $(this);
    const $parentItem = $clickedQuestion.closest(".faq__item");
    const $answer = $parentItem.find(".faq__item--answer");

    // 他の開いているアコーディオンを閉じる
    $(".faq__item")
      .not($parentItem)
      .each(function () {
        $(this).find(".faq__item--answer").slideUp(500);
        $(this).find(".faq__item--question").removeClass("open");
      });

    // クリックされたアコーディオンを開閉
    $answer.slideToggle(500);
    $clickedQuestion.toggleClass("open");
  });
});
