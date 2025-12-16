$(function () {
    $('.questions__expand').on('click', function () {
        $(this).next('.questions__answer').slideToggle(200);
        let $expand = $(this).find('.questions__arrow');

        if ($expand.text() === '+') {
            $expand.text('-');
        } else {
            $expand.text('+');
        }
    });
});
