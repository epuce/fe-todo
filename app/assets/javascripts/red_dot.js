$(function () {
    var $redDot = $('.red-dot'),
        $redDotWrapper = $('.red-dot-wrapper'),
        $saveRedDot = $redDotWrapper.find('.js-save-red-dot');

    // Build data from localStorage
    (function () {
        $redDot.each(function () {
            var $this = $(this);

            if (!localStorage[$this.attr('data-storage-key')]) {
                localStorage[$this.attr('data-storage-key')] = $this.attr('data-fallback-text');
            }

            $this.html(localStorage[$this.attr('data-storage-key')])

            $this.removeAttr('data-fallback-text');
        });
    })();

    // Open window for red dot
    $redDot.on('click', function () {
        var $this = $(this),
            redDotWindow = window.open('/red-dot#'+$(this).attr('data-storage-key'), '', 'width=800, height=400');

        redDotWindow.onload = function() {
            var localStorageVal = localStorage[$this.attr('data-storage-key')];

            redDotWindow.document.getElementsByClassName('js-text-field')[0].value = localStorageVal;
            redDotWindow.document.getElementsByClassName('js-active-text')[0].textContent = localStorageVal;
        }
    });

    // Save data for read dot and close window
    $saveRedDot.on('click', function () {
        if(window.location.hash.length > 1 && window.opener) {
            localStorage[window.location.hash.replace('#', '' )] = $('.js-text-field').val();

            window.opener.location.reload();
            window.close();
        } else {
            alert('Can\'t save data')
        }
    })
});