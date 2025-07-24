
//  ----------------------------------------------------
//  headerの表示タイミング設定
//  ----------------------------------------------------
// let pagetop = $("header");
// pagetop.hide();                        // 最初に画面が表示された時は、ボタンを非表示に設定
// // スクロールイベント
// $(window).scroll(function () {
//     if ($(this).scrollTop() > 750) {   //スクロール位置が750pxを超えた場合
//         pagetop.fadeIn();              //ボタンを表示する
//     } else {                           //スクロール位置が750px未満の場合
//         pagetop.fadeOut();             //トップに戻るボタンを非表示にする
//     }
// });

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