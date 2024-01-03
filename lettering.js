(function ($) {
    $.fn.lettering = function () {
        return this.each(function () {
            var $this = $(this);
            var text = $this.text();
            var letters = text.split('');
            var result = '';
            for (var i = 0; i < letters.length; i++) {
                result += '<span>' + letters[i] + '</span>';
            }
            $this.html(result);
        });
    };
})(jQuery);
