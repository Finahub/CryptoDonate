(function() {
    /**
     * Merge two JSON objects
     * @param  {obj} obj1 Object to merge to
     * @param  {obj} obj2 Object to merge
     * @return {obj} Merged object
     */
    var extend = function(obj1, obj2) {
        return Object.assign({}, obj1, obj2);
    }

    var CryptoDonate = {
        config: {
            coin: 'bitcoin',
            address: '3Q2zmZA3LsW5JdxkJEPDRbsXu2YzzMQmBQ',

            qr: true,
            getQrImage: function(data) {
                return 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + data;
            },

            strings: {
                button: 'Donate',
                dialogHeader: 'Donate',
                openInWallet: 'Click here to send this address to your wallet.'
            },

            baseURL: '',
        },

        init: function(config) {
            this.config = extend(this.config, config);
            return this;
        },

        appendTo: function(elem) {
            var donationButton = document.createElement('a');
            donationButton.className = 'cryptodonate-btn';
            donationButton.innerHTML = '<img src="" />' + this.config.strings.button;

            var $this = this;
            donationButton.addEventListener('click', function() {
                $this.showDialog();
            });

            elem.appendChild(donationButton);
            this.makeDialog();
        },

        makeDialog: function() {
            if (document.getElementById('cryptodonate-dialog') === null) {
                dialog = document.createElement('div');
                dialog.id = 'cryptodonate-dialog';
                dialog.innerHTML = '<div id="cryptodonate-action"></div>';
                dialog.innerHTML += '<div id="cryptodonate-addressHolder"><img id="cryptodonate-coin" /><input type="text" id="cryptodonate-address" onclick="this.select();" /><a id="cryptodonate-wallet" target="_blank" href="" title="' + this.config.strings.openInWallet + '"><img src="' + this.config.baseURL + '/img/icon_wallet.png" /></a></div>';
                dialog.innerHTML += '<div id="cryptodonate-qrHolder"><img id="cryptodonate-qr"></img></div>';
                dialog.innerHTML += '<a id="cryptodonate-credit" href="https://subinsb.com/cryptodonate" target="_blank">CryptoDonate</a>';
                dialog.innerHTML += '<a id="cryptodonate-close">x</a>'

                document.body.appendChild(dialog);

                dialogOverlay = document.createElement('div');
                dialogOverlay.id = 'cryptodonate-overlay';

                document.body.appendChild(dialogOverlay);

                $this = this;
                document.addEventListener('keyup', function(e) {
                    if (e.keyCode === 27) {
                        $this.hideDialog();
                    }
                });

                document.getElementById('cryptodonate-close').addEventListener('click', function() {
                    $this.hideDialog();
                })
            }
        },

        showDialog: function($this) {
            document.getElementById('cryptodonate-action').innerHTML = this.config.strings.dialogHeader;
            document.getElementById('cryptodonate-coin').src = this.config.baseURL + '/img/icon_' + this.config.coin + '.png';
            document.getElementById('cryptodonate-coin').title = this.config.coin;
            document.getElementById('cryptodonate-address').value = this.config.address;
            document.getElementById('cryptodonate-wallet').href = this.config.coin + ':' + this.config.address;
            document.getElementById('cryptodonate-qr').src = this.config.getQrImage(this.config.address);

            document.getElementById('cryptodonate-dialog').style.display = 'block';
            document.getElementById('cryptodonate-overlay').style.display = 'block';
        },

        hideDialog: function() {
            document.getElementById('cryptodonate-dialog').style.display = 'none';
            document.getElementById('cryptodonate-overlay').style.display = 'none';
        }
    };

    window.CryptoDonate = function(config) {
        return CryptoDonate.init(config);
    };
})(document);
