(function() {
    function SelectText(text) {
        var doc = document,
            range, selection;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    var code = '&lt;script&gt;\n';
    code += '  !function(c){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.onload=c,t.src="//lab.subinsb.com/projects/francium/cryptodonate/cryptodonate.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}(function(){\n';
    code += '    var cd = new Fr.CryptoDonate({\n';
    code += '      coin: "{coin}",\n';
    code += '      address: "{address}",\n';
    code += '      buttonClass: "{theme}",\n';
    code += '      dialogClass: "{theme}",\n';
    code += '    });\n';
    code += '  });\n';
    code += '&lt;/script&gt;';

    function update() {
        var address = $('#address').val();
        var coin = $('#coin').val();
        var theme = $('#theme').val();

        var cd = new Fr.CryptoDonate({
            coin: coin,
            address: address,
            baseURL: '../src/',
            buttonClass: theme,
            dialogClass: theme
        });

        $('#btn-preview').html('');
        cd.appendTo(document.getElementById('btn-preview'));

        var widgetCode = code;
        var substitution = {
            coin: coin,
            address: address,
            theme: theme
        };
        var keys = Object.keys(substitution);

        for (i = 0; i < keys.length; i++) {
            widgetCode = widgetCode.replace(new RegExp('{' + keys[i] + '}', 'g'), substitution[keys[i]]);
        }

        $('#code').html(widgetCode);
    }

    $(document).ready(function() {
        $('#update').on('click', update);
        $('#form input').on('keyup', update);
        $('#form select').on('change', update);

        $('#code').click(function() {
            SelectText(this);
        });

        update();
    });
})(document);
