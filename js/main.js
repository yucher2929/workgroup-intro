
//  ----------------------------------------------------
//  headerの表示タイミング設定
//  ----------------------------------------------------
let pagetop = $(".header__top");
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

    if (footerTop < windowHeight ) { // フッターが画面の下から100px以内に来たら
        header.style.height ='100px';
        footer.style.opacity ='1';
    } else {
        header.style.height = '80px';
        footer.style.opacity = '0';
    }
});


//  ----------------------------------------------------
//  FAQのQ.をクリックしたら、A.を表示する
//  ----------------------------------------------------
$(document).ready(function() {
  // すべての質問の要素（.faq_item--q）がクリックされたときの処理
  $('.faq_item--q').on('click', function() {
    $(this).next('.faq_item--a').slideToggle();

    // クリックされた質問に 'active' クラスを付け外しして、CSSでアイコンなどを変更できるようにする
    $(this).toggleClass('active');
  });
});

//  ----------------------------------------------------
//  sub-titleのアニメーション
//  ----------------------------------------------------
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

//  ----------------------------------------------------
//  ABOUTページの画像スクロール
//  ----------------------------------------------------
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
//  EVENT iconaアニメーション
//  ----------------------------------------------------
window.addEventListener('load', function() {
    setTimeout(function() {
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
//  EVENT オンライン飲み会 画像切り替え
//  ----------------------------------------------------
$(window).scroll(function () {
    $(".white-monitor").each(function () {
      // スクロールした距離
        let scroll = $(window).scrollTop();
        let target = $(this).offset().top;
      // 画面の高さ
        let windowHeight = $(window).height();
      // .ehite-monitorクラスの要素が画面下にきてから400px通過した
      // したタイミングで要素を表示
        if (scroll > target - windowHeight + 400) {
            $(this).css("display", "none");
        } 
    });
    
});



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

