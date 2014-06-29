window.visualCaptchaBot = (function () {
    'use strict';

    return {
        list: Array.prototype.slice.call.bind(Array.prototype.slice),

        map: {
            '9d0f04ddc7e5f13b33a7c842152df633': 'key',
            '0249cdb3d986e3f6e83d700735395b72': 'car',
            'a66c3fc1783a53b4ec7842aa9551b230': 'house',
            'd999a8082dad6d789217032b91fd9837': 'scissors',
            '3e0df2f6a8c474c5b4d6912b555c2427': 'tree',
            '934c9b4d47f269c3321157a8ff3d7418': 'eye',
            'a5b9ab84239ff32516fddc541bcfab9f': 'flag',
            'bf7bfdb0d7a19a839e5ec0cec92436e8': 'printer',
            '19d01c942629f02e99fcccf43e6df1ca': 'envelope',
            '2e753476327e7724caefca10809a8688': 'woman',
            '2a964044d3a4721a78f9bb69b74d7293': 'foot',
            '1387e57a1fd5b95d08aa094071c2efb7': 'truck',
            '8bfbd9d83e6188c6e52dc9947fc57ae7': 'balloons',
            'f256b202ccced9e4fe4710b32e3f2564': 'pencil',
            'da6adf05ba5c9e780fbe758919b5ddf2': 'sunglasses',
            '3bd397780b02633a9ef75fbe3345d2a4': 'robot',
            '50eaacf6d5d5b4abb52f48ec49a45df5': 'clip',
            '7f0f7a9256dea8919f1457c8c3604f9e': 'leaf',
            '0829abda42ff9b07259845330fe7fabd': 'tag',
            '71a62101af1f3deddac74ac67d4a6604': 'umbrella',
            '46077052d458f52ac68e8619a79b1bb1': 'computer',
            '03b7fa44ac54f4576fecc1678adfe82f': 'pants',
            '5269a94036a186cb6cf645c4a74a8409': 'cat',
            '35253b8d9856b440bab5847f9f06e53c': 't-shirt',
            '67f1600301d69beadbfd7ec33561f920': 'airplane',
            '00e6858a2ef4f9cc830566cbb6f39427': 'cloud',
            '4bdc566bb22b2ae4f779f10a1057a2c3': 'graph',
            '6f5956815eeee09bc685a9595136bf14': 'camera',
            '6ac72f669e2bdfea376faeada2d83256': 'folder',
            '1eec62832a74e76450468ec433e49483': 'lock',
            '33f0d9d73d41e4043110d40a17584d09': 'chair',
            '2893e30756614b45faa0a5b8ed294873': 'music-note',
            '939863103ce0a2f1c91bee2edd483cf0': 'magnifying-glass',
            '1a0430fd472982e6eb95abf507dae9b9': 'light-bulb',
            'f0a1db8765fa482300f6e154e2871830': 'world',
            'e23c551e6d5c1ffebb87c46818ca20d7': 'man',
            '827064475b6d8e3a143c1fafa220b88d': 'clock',
        },

        getName: function (sum) {
            if (sum in this.map) {
                return this.map[sum];
            }
        },

        getTarget: function (captcha) {
            return captcha
                .getElementsByClassName('visualCaptcha-explanation')[0]
                .getElementsByTagName('strong')[0]
                .firstChild.nodeValue
                .toLowerCase()
                .replace(' ', '-')
            ;
        },

        getImages: function (captcha) {
            return this.list(
                captcha
                    .getElementsByClassName('visualCaptcha-possibilities')[0]
                    .getElementsByClassName('img')
            )
                .map(function (elem) {
                    return elem.getElementsByTagName('img')[0];
                })
            ;
        },

        getImageBlob: function (url, cb) {
            var xhr = new XMLHttpRequest();

            xhr.open('GET', url);
            xhr.responseType = 'blob';

            xhr.onload = function () {
                cb(xhr.response);
            };

            xhr.send();
        },

        getImageSum: function (url, cb) {
            this.getImageBlob(url, function (blob) {
                var reader = new FileReader;

                reader.onload = function () {
                    cb(md5(reader.result));
                };

                reader.readAsBinaryString(blob);
            });
        },

        fill: function (captcha) {
            var target = this.getTarget(captcha);

            this.getImages(captcha).forEach(function (img) {
                this.getImageSum(img.src, function (sum) {
                    if (this.getName(sum) === target) {
                        img.parentNode.click();
                    }
                }.bind(this));
            }.bind(this));
        },

        main: function () {
            var captchas = document.getElementsByClassName('visualCaptcha');

            if (captchas.length > 0) {
                this.list(captchas).forEach(this.fill.bind(this));
            }
        },
    };
}());
