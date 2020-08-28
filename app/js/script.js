$(function() {
    $('.feedback__inner').slick({
        prevArrow: '<img class="leftArrow" src="../img/feedback(slider)/left.svg">',
        nextArrow: '<img class="rightArrow" src="../img/feedback(slider)/right.svg">',
        infinite: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });


});