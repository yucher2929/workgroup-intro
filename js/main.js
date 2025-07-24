
//  ----------------------------------------------------
//  headerの表示タイミング設定
//  ----------------------------------------------------
let pagetop = $("header");
pagetop.hide();                        // 最初に画面が表示された時は、ボタンを非表示に設定
// スクロールイベント
$(window).scroll(function () {
    if ($(this).scrollTop() > 750) {   //スクロール位置が750pxを超えた場合
        pagetop.fadeIn();              //ボタンを表示する
    } else {                           //スクロール位置が750px未満の場合
        pagetop.fadeOut();             //トップに戻るボタンを非表示にする
    }
});

//  ----------------------------------------------------
//  headerからfooterの切り替え
//  ----------------------------------------------------
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');

    //いずれかの要素が存在しない場合は処理を中断
    if (!header || !footer) return;

    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight - 30) {
        header.style.height ='100px';
        footer.style.opacity ='1';
    } else {
        header.style.height = '80px';
        footer.style.opacity = '0';
    }
});


// window.addEventListener('scroll', function () {
//   const targets = document.querySelectorAll('.sub-title');

//   targets.forEach(target => {
//     const rect = target.getBoundingClientRect();
//     const windowHeight = window.innerHeight;

//     // 要素が画面の下から80%の位置に入ったらアニメーション開始
//     if (rect.top < windowHeight * 0.8) {
//       target.classList.add('active');
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.sub-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.8
    });

    targets.forEach(target => {
        observer.observe(target);
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//   const wrapper = document.querySelector('.about__right');
//   const list = document.querySelector('.scroll-animate');

//   // スクロール用にリストを複製して2つ並べる
//   const clone = list.cloneNode(true);
//   wrapper.appendChild(clone);

//   // 2つを内包するようにラッパーの中のリストをまとめて取得
//   const allLists = wrapper.querySelectorAll('.scroll-animate');

//   // オフセット高さを1つのリストから取得
//   const listHeight = list.offsetHeight;

//   // 親ラッパーの中に2つ並べる
//   allLists[0].style.top = '0px';
//   allLists[1].style.top = `${listHeight}px`;

//   // アニメーション（ループ）
//   gsap.to(allLists, {
//     y: `-=${listHeight}`,
//     duration: 45,
//     ease: "none",
//     repeat: -1,
//     modifiers: {
//       y: gsap.utils.unitize(y => parseFloat(y) % listHeight)
//     }
//   });
// });

window.addEventListener('load', () => {
  const wrapper = document.querySelector('.about__right');
  const list = wrapper.querySelector('.scroll-animate');

  // クローンを作成
  const clone = list.cloneNode(true);
  wrapper.appendChild(clone);

  // 高さを正確に取得（画像読み込み後なのでOK）
  const listHeight = list.offsetHeight;

  // 複製リストの位置調整
  clone.style.top = listHeight + 'px';

  // 2つのリストをまとめて取得
  const lists = wrapper.querySelectorAll('.scroll-animate');

  // アニメーション実行
  gsap.to(lists, {
    y: `-=${listHeight}`,
    duration: 45,
    ease: "none",
    repeat: -1,
    modifiers: {
      y: gsap.utils.unitize(y => parseFloat(y) % listHeight)
    }
  });
});