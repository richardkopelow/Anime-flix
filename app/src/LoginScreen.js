/*
 * Author: Richard Kopelow
 * Copyright: Copyright 2014 Richard Kopelow
 */

define(function (require, exports, module)
{
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var RenderController = require('famous/views/RenderController');
    var Easing = require('famous/transitions/Easing');
    var Surface = require('RichFamous/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var InputSurface = require('famous/surfaces/InputSurface');

    function createLoginScreen(size)
    {
        var overView = new View();
        var view = new View();
        
        var loginRenderController = new RenderController();
        overView.add(loginRenderController);
        loginRenderController.show(view);

        var loginBackgroundTransform = new StateModifier({
            origin: [0.5, 0.5],
            align:[0.5,0.5]
        });
        var loginBackgroundNode = view.add(loginBackgroundTransform);
        
        //loginTransitionable.set([0.5, 0.5], { duration: 2000, curve: Easing.outBounce }, credentialInfoBounce);

        var loginBackground = Surface({
            properties: {backgroundColor:'black'}
        });
        loginBackgroundNode.add(loginBackground);
        function fakeOut()
        {
            loginTransform.setOpacity(0, { duration: 1000, curve: Easing.outCubic });
            loginTransform.setOpacity(1, { duration: 1000, curve: Easing.inCubic });
        }
        loginBackground.on("deploy", function ()
        {
            //#region Session Relogin

            if (sessionStorage.username != undefined)
            {
                overView.username = sessionStorage.username;
                overView.password = sessionStorage.password;

                if (overView.login(overView.username, overView.password))
                {
                    loginRenderController.hide({ duration: 0 });
                }
            }
            else
            {
                fakeOut();
            }
            //#endregion
        });
        var loginTransform = new StateModifier({
            opacity: 0,
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });
        var loginElementsNode=loginBackgroundNode.add(loginTransform);

        var fontSize = 25;
        var boxWidth = 400;
        var boxHeight = 40;

        var logoHeight = 100;
        var logoTransform = new StateModifier({
            origin: [0.5, 0.5]
        });
        var logo = new ImageSurface({
            content: '/content/images/AnimeflixLogo.png'
        });
        /*
        var betaHeight = 60;
        var betaTransform = new StateModifier({
            origin: [0.5, 0.5]
        });
        var betaRotate = new StateModifier({
            transform:Transform.rotate(0,0,3.14/6)
        });
        var beta = new ImageSurface({
            content:'content/images/Beta.png'
        });
        */
        var textboxProperties = {
            border: '1px solid gray',
            borderRadius: boxHeight / 2 + 'px',
            textAlign: 'center',
            resize: 'none',
            outline: 'none',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        };

        function textBoxEnter(k)
        {
            if (k.keyCode == 13)
            {
                login();
            };
        }

        var usernameBoxTransform = new StateModifier({
            origin: [0.5, 0.5]
        });
        var usernameBox = new InputSurface({
            type: 'text',
            placeholder: 'Username',
            properties: textboxProperties
        }
        );
        usernameBox.on('keypress', textBoxEnter);

        var passwordBoxTransform = new StateModifier({
            origin: [0.5, 0.5]
        });
        var passwordBox = new InputSurface({
            type: 'password',
            placeholder: 'Password',
            properties: textboxProperties
        }
        );
        passwordBox.on('keypress', textBoxEnter);

        var buttonWidth = 200;
        var buttonHeight = 80;
        var buttonTransform = new StateModifier({
            origin: [0.5, 0.5]
        });
        var button = Surface({
            content: 'Login',
            properties: {
                textAlign: 'center',
                verticalAlign: 'middle',
                color:'white',
                //backgroundColor: window.colorScheme.second,//'#4494FD',//'#00fff8',
                borderRadius: boxHeight / 2 + 'px'
            }
        });

        button.on('click', login)

        overView.resize = function ()
        {
            buttonTransform.setTransform(Transform.translate(0, window.formatting.scale*(buttonHeight + boxHeight), 1));
            button.setSize([window.formatting.scale * buttonWidth, window.formatting.scale * buttonHeight]);
            usernameBoxTransform.setTransform(Transform.translate(0, window.formatting.scale * -boxHeight, 1));
            usernameBoxTransform.setSize([window.formatting.scale * boxWidth, window.formatting.scale * boxHeight]);
            passwordBoxTransform.setTransform(Transform.translate(0, window.formatting.scale * boxHeight, 1));
            passwordBoxTransform.setSize([window.formatting.scale * boxWidth, window.formatting.scale * boxHeight]);
            logoTransform.setTransform(Transform.translate(0, window.formatting.scale * (-boxHeight - logoHeight)));
            logo.setSize([true, window.formatting.scale * logoHeight]);
            /*
            betaTransform.setTransform(Transform.translate(window.formatting.scale * 330, window.formatting.scale * (-boxHeight - logoHeight - 20)));
            beta.setSize([true, window.formatting.scale * betaHeight]);
            */
            credentialInfoTransform.setTransform(Transform.translate(0, window.formatting.scale * 3 * buttonHeight, 1));
            credentialInfo.setProperties({ fontSize: window.formatting.scale * 16 + 'px' });
            button.setProperties({ fontSize: window.formatting.scale * fontSize + 'px' });
            usernameBox.setProperties({ fontSize: window.formatting.scale * fontSize + 'px' });
            passwordBox.setProperties({ fontSize: window.formatting.scale * fontSize + 'px' });
        }

        var credentialInfoTransform = new StateModifier({
            origin: [0.5, 0.5],
        });
        var credentialInfo = Surface({
            size:[true,true],
            content: 'Login with your MyAnimeList credentials. Anime-flix uses MyAnimeList to track your viewing progress as you watch.',
            properties: {
                textAlign: 'center',
                vericalAlign: 'middle',
                color:'white'
            }
        });

        function login()
        {
            overView.username = usernameBox.getValue();
            overView.password = passwordBox.getValue();
            return overView.login(overView.username, overView.password);
        }
        overView.login = function (username, password)
        {
            var url = 'http://www.anime-flix.com/requester.php?m=login';
            var request = new XMLHttpRequest();
            request.open("POST", url, false);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send('u=' + username + '&p=' + password);

            var bodyText = request.responseText;
            if (bodyText == 'Invalid credentials' || request.status != 200)
            {
                fakeOut();
                return false;
            }
            else
            {
                overView._eventOutput.emit('loggedIn');
                loginRenderController.hide({ duration: 2000 });
                return true;
            }
        }


        loginElementsNode.add(logoTransform).add(logo);
        //loginElementsNode.add(betaTransform).add(betaRotate).add(beta);
        loginElementsNode.add(usernameBoxTransform).add(usernameBox);
        loginElementsNode.add(passwordBoxTransform).add(passwordBox);
        loginElementsNode.add(buttonTransform).add(button);
        loginElementsNode.add(credentialInfoTransform).add(credentialInfo);
        return overView;
    }
    module.exports = createLoginScreen;
});