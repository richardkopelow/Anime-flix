/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous/src',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        RichFamous: '../lib/RichFamous'
    },
    packages: [

    ]
});
require(['main']);
